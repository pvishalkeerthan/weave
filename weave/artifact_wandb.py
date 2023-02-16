import binascii
import contextlib
import dataclasses
import os
import functools
import tempfile
import typing

import wandb
from wandb.apis import public as wb_public
from wandb.util import hex_to_b64_id, b64_to_hex_id

from . import uris
from . import errors
from . import wandb_client_api
from . import memo
from . import file_base
from . import file_util

from . import weave_types as types
from . import artifact_fs
from . import filesystem

from urllib import parse

if typing.TYPE_CHECKING:
    from wandb.sdk.interface import artifacts

quote_slashes = functools.partial(parse.quote, safe="")

# TODO: Get rid of this, we have the new wandb api service! But this
# is still used in a couple places.
@memo.memo
def get_wandb_read_artifact(path: str):
    return wandb_client_api.wandb_public_api().artifact(path)


def wandb_artifact_dir():
    d = os.path.join(filesystem.get_filesystem_dir(), "wandb_artifacts")
    os.makedirs(d, exist_ok=True)
    return d


@dataclasses.dataclass
class ReadClientArtifactURIResult:
    weave_art_uri: "WeaveWBArtifactURI"
    artifact_type_name: str
    is_deleted: bool


def _art_id_is_client_version_id_mapping(art_id: str) -> bool:
    return len(art_id) == 128 and ":" not in art_id


def _art_id_is_client_collection_and_alias_id_mapping(art_id: str) -> bool:
    return ":" in art_id


def _convert_client_id_to_server_id(art_id: str) -> str:
    query = wb_public.gql(
        """
        query ClientIDMapping($clientID: ID!) {
            clientIDMapping(clientID: $clientID) {
                serverID
            }
        }
    """
    )
    res = wandb_client_api.wandb_public_api().client.execute(
        query,
        variable_values={
            "clientID": art_id,
        },
    )
    return b64_to_hex_id(res["clientIDMapping"]["serverID"])


def _collection_and_alias_id_mapping_to_uri(
    client_collection_id: str, alias_name: str
) -> ReadClientArtifactURIResult:
    is_deleted = False
    query = wb_public.gql(
        """	
    query ArtifactVersionFromIdAlias(	
        $id: ID!,	
        $aliasName: String!	
    ) {	
        artifactCollection(id: $id) {	
            id	
            name	
            state
            project {	
                id	
                name	
                entity {	
                    id	
                    name	
                }	
            }	
            artifactMembership(aliasName: $aliasName) {	
                id	
                versionIndex	
            }	
            defaultArtifactType {	
                id	
                name	
            }	
        }	
    }	
    """
    )
    res = wandb_client_api.wandb_public_api().client.execute(
        query,
        variable_values={
            "id": client_collection_id,
            "aliasName": alias_name,
        },
    )
    collection = res["artifactCollection"]

    if collection is None:
        # Note: deleted collections are still returned by the API (with state=DELETED)
        # So a missing collection is a real error.
        raise errors.WeaveArtifactCollectionNotFound(
            f"Could not find artifact collection with client id {client_collection_id}"
        )
    elif collection["state"] != "READY":  # state is either "DELETED" or "READY"
        # This is a deleted artifact, but we still have a record of it.
        is_deleted = True

    artifact_type_name = res["artifactCollection"]["defaultArtifactType"]["name"]
    artifact_membership = res["artifactCollection"]["artifactMembership"]
    if artifact_membership is None:
        is_deleted = True
        version = alias_name
    else:
        version_index = artifact_membership["versionIndex"]
        version = f"v{version_index}"

    entity_name = collection["project"]["entity"]["name"]
    project_name = collection["project"]["name"]
    artifact_name = collection["name"]

    weave_art_uri = WeaveWBArtifactURI(
        artifact_name,
        version,
        entity_name,
        project_name,
    )

    return ReadClientArtifactURIResult(weave_art_uri, artifact_type_name, is_deleted)


def _version_server_id_to_uri(server_id: str) -> ReadClientArtifactURIResult:
    is_deleted = False
    query = wb_public.gql(
        """	
    query ArtifactVersionFromServerId(	
        $id: ID!,	
    ) {	
        artifact(id: $id) {	
            id
            state
            versionIndex
            artifactType {	
                id	
                name	
            }	
            artifactSequence {
                id
                name
                state
                project {
                    id
                    name
                    entity {
                        id
                        name
                    }
                }
            }
        }	
    }	
    """
    )
    res = wandb_client_api.wandb_public_api().client.execute(
        query,
        variable_values={"id": hex_to_b64_id(server_id)},
    )

    artifact = res["artifact"]
    if artifact is None:
        # Note: deleted versions are still returned by the API (with state=DELETED)
        # So a missing artifact is a real error.
        raise errors.WeaveArtifactVersionNotFound(
            f"Could not find artifact version with server id {server_id}"
        )
    elif (
        artifact["state"] != "COMMITTED"
    ):  # state is either "DELETED" or "PENDING" or "COMMITTED"
        # This is a deleted artifact, but we still have a record of it
        is_deleted = True

    collection = artifact["artifactSequence"]

    if collection is None:
        # Note: deleted collections are still returned by the API (with state=DELETED)
        # So a missing collection is a real error.
        raise errors.WeaveArtifactCollectionNotFound(
            f"Could not find artifact sequence for artifact version with server id {server_id}"
        )
    elif collection["state"] != "READY":  # state is either "DELETED" or "READY"
        # This is a deleted artifact, but we still have a record of it
        is_deleted = True

    artifact_type_name = artifact["artifactType"]["name"]
    version_index = artifact["versionIndex"]

    entity_name = collection["project"]["entity"]["name"]
    project_name = collection["project"]["name"]
    artifact_name = collection["name"]
    version = f"v{version_index}"

    weave_art_uri = WeaveWBArtifactURI(
        artifact_name,
        version,
        entity_name,
        project_name,
    )

    return ReadClientArtifactURIResult(weave_art_uri, artifact_type_name, is_deleted)


@memo.memo
def get_wandb_read_client_artifact_uri(art_id: str) -> ReadClientArtifactURIResult:
    """art_id may be client_id, seq:alias, or server_id"""
    if _art_id_is_client_version_id_mapping(art_id):
        server_id = _convert_client_id_to_server_id(art_id)
        return _version_server_id_to_uri(server_id)
    elif _art_id_is_client_collection_and_alias_id_mapping(art_id):
        client_collection_id, alias_name = art_id.split(":")
        return _collection_and_alias_id_mapping_to_uri(client_collection_id, alias_name)
    else:
        return _version_server_id_to_uri(art_id)


def get_wandb_read_client_artifact(art_id: str) -> typing.Optional["WandbArtifact"]:
    """art_id may be client_id, seq:alias, or server_id"""
    res = get_wandb_read_client_artifact_uri(art_id)
    if res.is_deleted:
        return None
    return WandbArtifact(
        res.weave_art_uri.name, res.artifact_type_name, res.weave_art_uri
    )


class WandbArtifactType(artifact_fs.FilesystemArtifactType):
    def save_instance(self, obj, artifact, name) -> "WandbArtifactRef":
        return WandbArtifactRef(obj, None)


class WandbArtifact(artifact_fs.FilesystemArtifact):
    def __init__(
        self,
        name,
        type=None,
        uri: typing.Optional[
            typing.Union["WeaveWBArtifactURI", "WeaveWBLoggedArtifactURI"]
        ] = None,
    ):
        from . import io_service

        self.io_service = io_service.get_sync_client()
        self.name = name
        self._read_artifact_uri_or_client_uri = None
        self._read_artifact = None
        if not uri:
            self._writeable_artifact = wandb.Artifact(
                name, type="op_def" if type is None else type
            )
        else:
            # load an existing artifact, this should be read only,
            # TODO: we could technically support writable artifacts by creating a new version?
            self._read_artifact_uri_or_client_uri = uri
        self._local_path: dict[str, str] = {}

    @property
    def _read_artifact_uri(self) -> typing.Optional["WeaveWBArtifactURI"]:
        if isinstance(self._read_artifact_uri_or_client_uri, WeaveWBLoggedArtifactURI):
            self._read_artifact_uri_or_client_uri = (
                self._read_artifact_uri_or_client_uri.wb_artifact_uri
            )
        return self._read_artifact_uri_or_client_uri

    @property
    def _ref(self) -> "WandbArtifactRef":
        # existing_ref = ref_base.get_ref(obj)
        # if isinstance(existing_ref, artifact_base.ArtifactRef):
        #     return existing_ref
        if not self.is_saved:
            raise errors.WeaveInternalError("cannot get ref of an unsaved artifact")
        return WandbArtifactRef(self, None, None)

    def _set_read_artifact_uri(self, uri):
        self._read_artifact = None
        self._read_artifact_uri_or_client_uri = uri

    # TODO: still using wandb lib for this, but we should switch to the new
    # wandb api service
    @property
    def _saved_artifact(self):
        if self._read_artifact is None:
            uri = self._read_artifact_uri
            path = f"{uri.entity_name}/{uri.project_name}/{uri.name}:{uri.version}"
            self._read_artifact = get_wandb_read_artifact(path)
        return self._read_artifact

    def __repr__(self):
        return "<WandbArtifact %s>" % self.name

    @property
    def is_saved(self) -> bool:
        return (
            self._read_artifact_uri_or_client_uri is not None
            or self._read_artifact is not None
        )

    @property
    def version(self):
        if not self.is_saved:
            raise errors.WeaveInternalError("cannot get version of an unsaved artifact")
        return self._saved_artifact.version

    @property
    def created_at(self):
        raise NotImplementedError()

    def get_other_version(self, version):
        raise NotImplementedError()

    def direct_url(self, path: str) -> typing.Optional[str]:
        if self._read_artifact_uri is None:
            raise errors.WeaveInternalError(
                'cannot get direct url for unsaved artifact"'
            )
        uri = self._read_artifact_uri.with_path(path)
        return self.io_service.direct_url(uri)

    def path(self, name: str) -> str:
        if not self.is_saved or not self._read_artifact_uri:
            raise errors.WeaveInternalError("cannot download of an unsaved artifact")

        uri = self._read_artifact_uri.with_path(name)
        fs_path = self.io_service.ensure_file(uri)
        if fs_path is None:
            # Important to raise FileNotFoundError here, FileSystemArtifactRef.type
            # relies on this.
            raise FileNotFoundError("Path not in artifact")
        return self.io_service.fs.path(fs_path)

    def size(self, path: str) -> int:
        if path in self._saved_artifact.manifest.entries:
            return self._saved_artifact.manifest.entries[path].size
        return super().size(path)

    @property
    def uri_obj(self) -> typing.Union["WeaveWBArtifactURI", "WeaveWBLoggedArtifactURI"]:
        if not self.is_saved or not self._read_artifact_uri_or_client_uri:
            raise errors.WeaveInternalError("cannot get uri of an unsaved artifact")
        return self._read_artifact_uri_or_client_uri

    @contextlib.contextmanager
    def new_file(self, path, binary=False):
        if not self._writeable_artifact:
            raise errors.WeaveInternalError("cannot add new file to readonly artifact")
        mode = "w"
        if binary:
            mode = "wb"
        with self._writeable_artifact.new_file(path, mode) as f:
            yield f

    @contextlib.contextmanager
    def new_dir(self, path):
        if not self._writeable_artifact:
            raise errors.WeaveInternalError("cannot add new file to readonly artifact")
        with tempfile.TemporaryDirectory() as tmpdir:
            yield os.path.abspath(tmpdir)
            self._writeable_artifact.add_dir(tmpdir, path)

    @contextlib.contextmanager
    def open(self, path, binary=False):
        if not self.is_saved:
            raise errors.WeaveInternalError("cannot load data from an unsaved artifact")
        mode = "r"
        if binary:
            mode = "rb"
        p = self.path(path)
        with file_util.safe_open(p, mode) as f:
            yield f

    def get_path_handler(self, path, handler_constructor):
        raise NotImplementedError()

    def read_metadata(self):
        raise NotImplementedError()

    def write_metadata(self, dirname):
        raise NotImplementedError()

    def save(self, project: str = "weave_ops"):
        # TODO: technically save should be sufficient but we need the run to grab the entity name and project name
        # TODO: what project should we put weave ops in???
        os.environ["WANDB_SILENT"] = "true"
        wandb.require("service")  # speeds things up
        run = wandb.init(project=project)
        if run is None:
            raise errors.WeaveInternalError("unexpected, run is None")
        self._writeable_artifact.save()
        self._writeable_artifact.wait()
        run.finish()

        a_name, a_version = self._writeable_artifact.name.split(":")
        uri = WeaveWBArtifactURI(a_name, a_version, run.entity, project)
        self._set_read_artifact_uri(uri)

    def _manifest(self) -> typing.Optional["artifacts.ArtifactManifest"]:
        if self._read_artifact_uri is None:
            raise errors.WeaveInternalError(
                'cannot get path info for unsaved artifact"'
            )
        return self.io_service.manifest(self._read_artifact_uri)

    def digest(self, path: str) -> typing.Optional[str]:
        manifest = self._manifest()
        if manifest is not None:
            manifest_entry = manifest.get_entry_by_path(path)
            if manifest_entry is not None:
                return manifest_entry.digest
        return None

    def _path_info(
        self, path: str
    ) -> typing.Optional[
        typing.Union[
            "artifact_fs.FilesystemArtifactFile",
            "artifact_fs.FilesystemArtifactDir",
            "artifact_fs.FilesystemArtifactRef",
        ]
    ]:
        manifest = self._manifest()
        if manifest is None:
            return None
        manifest_entry = manifest.get_entry_by_path(path)
        if manifest_entry is not None:
            # This is not a WeaveURI! Its the artifact reference style used
            # by the W&B Artifacts/media layer.
            ref_prefix = "wandb-artifact://"
            if manifest_entry.ref and manifest_entry.ref.startswith(ref_prefix):
                # This is a reference to another artifact
                art_id, target_path = manifest_entry.ref[len(ref_prefix) :].split(
                    "/", 1
                )
                art = get_wandb_read_client_artifact(art_id)
                # this should be None when the requested artifact is deleted from the server.
                # we want to return None in this case so that the caller can handle it.
                if art is None:
                    return None
                return artifact_fs.FilesystemArtifactFile(art, target_path)
            # This is a file
            return artifact_fs.FilesystemArtifactFile(self, path)

        # This is not a file, assume its a directory. If not, we'll return an empty result.
        cur_dir = (
            path  # give better name so the rest of this code block is more readable
        )
        if cur_dir == "":
            dir_ents = manifest.entries.values()
        else:
            dir_ents = manifest.get_entries_in_directory(cur_dir)
        sub_dirs: dict[str, file_base.SubDir] = {}
        files = {}
        for entry in dir_ents:
            entry_path = entry.path
            rel_path = os.path.relpath(entry_path, path)
            rel_path_parts = rel_path.split("/")
            if len(rel_path_parts) == 1:
                files[rel_path_parts[0]] = artifact_fs.FilesystemArtifactFile(
                    self,
                    entry_path,
                )
            else:
                dir_name = rel_path_parts[0]
                if dir_name not in sub_dirs:
                    dir_ = file_base.SubDir(entry_path, 1111, {}, {})
                    sub_dirs[dir_name] = dir_
                dir_ = sub_dirs[dir_name]
                if len(rel_path_parts) == 2:
                    dir_files = typing.cast(dict, dir_.files)
                    dir_files[rel_path_parts[1]] = artifact_fs.FilesystemArtifactFile(
                        self,
                        entry_path,
                    )
                else:
                    dir_.dirs[rel_path_parts[1]] = 1
        if not sub_dirs and not files:
            return None
        return artifact_fs.FilesystemArtifactDir(self, path, 1591, sub_dirs, files)


WandbArtifactType.instance_classes = WandbArtifact


class WandbArtifactRef(artifact_fs.FilesystemArtifactRef):
    artifact: WandbArtifact

    def versions(self) -> list[artifact_fs.FilesystemArtifactRef]:
        # TODO: implement versions on wandb artifact
        return [self]

    @classmethod
    def from_uri(cls, uri: uris.WeaveURI) -> "WandbArtifactRef":
        if not isinstance(uri, (WeaveWBArtifactURI, WeaveWBLoggedArtifactURI)):
            raise errors.WeaveInternalError(
                f"Invalid URI class passed to WandbArtifactRef.from_uri: {type(uri)}"
            )
        # TODO: potentially need to pass full entity/project/name instead
        return cls(
            WandbArtifact(uri.name, uri=uri),
            path=uri.path,
        )


types.WandbArtifactRefType.instance_class = WandbArtifactRef
types.WandbArtifactRefType.instance_classes = WandbArtifactRef

WandbArtifact.RefClass = WandbArtifactRef

# Used to refer to objects stored in WB Artifacts. This URI must not change and
# matches the existing artifact schemes
@dataclasses.dataclass
class WeaveWBArtifactURI(uris.WeaveURI):
    SCHEME = "wandb-artifact"
    entity_name: str
    project_name: str
    netloc: typing.Optional[str] = None
    path: typing.Optional[str] = None
    extra: typing.Optional[list[str]] = None

    @classmethod
    def from_parsed_uri(
        cls,
        uri: str,
        schema: str,
        netloc: str,
        path: str,
        params: str,
        query: dict[str, list[str]],
        fragment: str,
    ):
        parts = path.strip("/").split("/")
        parts = [parse.unquote(part) for part in parts]
        if len(parts) < 3:
            raise errors.WeaveInvalidURIError(f"Invalid WB Artifact URI: {uri}")
        entity_name = parts[0]
        project_name = parts[1]
        name, version = parts[2].split(":", 1)

        file_path: typing.Optional[str] = None
        if len(parts) > 3:
            file_path = "/".join(parts[3:])
        extra: typing.Optional[list[str]] = None
        if fragment:
            extra = fragment.split("/")
        return cls(name, version, entity_name, project_name, netloc, file_path, extra)

    @classmethod
    def parse(cls: typing.Type["WeaveWBArtifactURI"], uri: str) -> "WeaveWBArtifactURI":
        return super().parse(uri)  # type: ignore

    def __str__(self) -> str:
        netloc = self.netloc or ""
        uri = (
            f"{self.SCHEME}://"
            f"{quote_slashes(netloc)}/"
            f"{quote_slashes(self.entity_name)}/"
            f"{quote_slashes(self.project_name)}/"
            f"{quote_slashes(self.name)}:{quote_slashes(self.version) if self.version else ''}"
        )
        if self.path:
            uri += f"/{quote_slashes(self.path)}"
        if self.extra:
            uri += f"#{'/'.join([quote_slashes(e) for e in self.extra])}"
        return uri

    def with_path(self, path: str) -> "WeaveWBArtifactURI":
        return WeaveWBArtifactURI(
            self.name,
            self.version,
            self.entity_name,
            self.project_name,
            self.netloc,
            path,
            self.extra,
        )

    def to_ref(self) -> WandbArtifactRef:
        return WandbArtifactRef.from_uri(self)


@dataclasses.dataclass
class WeaveWBLoggedArtifactURI(uris.WeaveURI):
    SCHEME = "wandb-logged-artifact"
    # wandb-logged-artifact://afdsjaksdjflkasjdf12341234hv12h3v4k12j3hv41kh4v1423k14v1k2j3hv1k2j3h4v1k23h4v:[version|latest]/path
    #  scheme                                 name                                                              version      path
    path: typing.Optional[str] = None

    # private attrs
    _weave_wb_artifact_uri: typing.Optional[WeaveWBArtifactURI] = None

    @classmethod
    def from_parsed_uri(
        cls,
        uri: str,
        schema: str,
        netloc: str,
        path: str,
        params: str,
        query: dict[str, list[str]],
        fragment: str,
    ):
        path = path.strip("/")
        spl_netloc = netloc.split(":")
        if len(spl_netloc) == 1:
            name = spl_netloc[0]
            version = None
        elif len(spl_netloc) == 2:
            name, version = spl_netloc
        else:
            raise errors.WeaveInvalidURIError(f"Invalid WB Client Artifact URI: {uri}")

        return WeaveWBLoggedArtifactURI(name=name, version=version, path=path)

    def __str__(self) -> str:
        netloc = self.name
        if self.version:
            netloc += f":{self.version}"
        path = self.path or ""
        if path != "":
            path = f"/{path}"
        return f"{self.SCHEME}://{netloc}{path}"

    @property
    def wb_artifact_uri(self) -> WeaveWBArtifactURI:
        if self._weave_wb_artifact_uri is None:
            art_id = self.name
            if self.version:
                art_id += f":{self.version}"
            res = get_wandb_read_client_artifact_uri(art_id)
            self._weave_wb_artifact_uri = res.weave_art_uri
        return self._weave_wb_artifact_uri.with_path(self.path or "")

    @property
    def entity_name(self) -> str:
        return self.wb_artifact_uri.entity_name

    @property
    def project_name(self) -> str:
        return self.wb_artifact_uri.project_name

    def with_path(self, path: str) -> "WeaveWBLoggedArtifactURI":
        return WeaveWBLoggedArtifactURI(
            self.name,
            self.version,
            path,
        )

    @classmethod
    def parse(cls, uri: str) -> "WeaveWBLoggedArtifactURI":
        scheme, netloc, path, params, query_s, fragment = parse.urlparse(uri)
        return cls.from_parsed_uri(
            uri, scheme, netloc, path, params, parse.parse_qs(query_s), fragment
        )

    def to_ref(self) -> WandbArtifactRef:
        return WandbArtifactRef.from_uri(self)
