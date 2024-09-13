import os
import tempfile
from pathlib import Path

import requests
from PIL import Image

import weave
from weave.trace.weave_client import WeaveClient, get_ref

"""When testing types, it is important to test:
Objects:
1. Publishing Directly
2. Publishing as a property
3. Using as a cell in a table

Calls:
4. Using as inputs, output, and output component (raw)
5. Using as inputs, output, and output component (refs)

"""


def test_image_publish(client: WeaveClient) -> None:
    img = Image.new("RGB", (512, 512), "purple")
    weave.publish(img)

    ref = get_ref(img)

    assert ref is not None
    gotten_img = weave.ref(ref.uri()).get()
    assert img.tobytes() == gotten_img.tobytes()


class ImageWrapper(weave.Object):
    img: Image.Image


def test_image_as_property(client: WeaveClient) -> None:
    img = Image.new("RGB", (512, 512), "purple")
    img_wrapper = ImageWrapper(img=img)
    assert img_wrapper.img == img

    weave.publish(img_wrapper)

    ref = get_ref(img_wrapper)
    assert ref is not None

    gotten_img_wrapper = weave.ref(ref.uri()).get()
    assert gotten_img_wrapper.img.tobytes() == img.tobytes()


def test_image_as_dataset_cell(client: WeaveClient) -> None:
    img = Image.new("RGB", (512, 512), "purple")
    dataset = weave.Dataset(rows=[{"img": img}])
    assert dataset.rows[0]["img"] == img

    weave.publish(dataset)

    ref = get_ref(dataset)
    assert ref is not None

    gotten_dataset = weave.ref(ref.uri()).get()
    assert gotten_dataset.rows[0]["img"].tobytes() == img.tobytes()


@weave.op
def image_as_solo_output(publish_first: bool) -> Image.Image:
    img = Image.new("RGB", (512, 512), "purple")
    if publish_first:
        weave.publish(img)
    return img


@weave.op
def image_as_input_and_output_part(in_img: Image.Image) -> dict:
    return {"out_img": in_img}


def test_image_as_call_io(client: WeaveClient) -> None:
    non_published_img = image_as_solo_output(publish_first=False)
    img_dict = image_as_input_and_output_part(non_published_img)

    exp_bytes = non_published_img.tobytes()
    assert img_dict["out_img"].tobytes() == exp_bytes

    image_as_solo_output_call = image_as_solo_output.calls()[0]
    image_as_input_and_output_part_call = image_as_input_and_output_part.calls()[0]

    assert image_as_solo_output_call.output.tobytes() == exp_bytes
    assert image_as_input_and_output_part_call.inputs["in_img"].tobytes() == exp_bytes
    assert image_as_input_and_output_part_call.output["out_img"].tobytes() == exp_bytes


def test_image_as_call_io_refs(client: WeaveClient) -> None:
    non_published_img = image_as_solo_output(publish_first=True)
    img_dict = image_as_input_and_output_part(non_published_img)

    exp_bytes = non_published_img.tobytes()
    assert img_dict["out_img"].tobytes() == exp_bytes

    image_as_solo_output_call = image_as_solo_output.calls()[0]
    image_as_input_and_output_part_call = image_as_input_and_output_part.calls()[0]

    assert image_as_solo_output_call.output.tobytes() == exp_bytes
    assert image_as_input_and_output_part_call.inputs["in_img"].tobytes() == exp_bytes
    assert image_as_input_and_output_part_call.output["out_img"].tobytes() == exp_bytes


def test_image_from_path(client: WeaveClient) -> None:
    with tempfile.TemporaryDirectory() as temp_dir:
        path_str = os.path.join(temp_dir, "img.png")
        img = Image.new("RGB", (512, 512), "purple")
        img.save(path_str)
        exp_bytes = img.tobytes()

        @weave.op
        def save_image(path: Path) -> dict:
            return {"out-img-path": path}

        save_image(Path(path_str))

        call = save_image.calls()[0]
        assert call.output["out-img-path"].tobytes() == exp_bytes

        @weave.op
        def save_stuff_with_image_embedded(path: Path) -> dict:
            return {"out": f"Some random text + a path: {path}"}

        save_stuff_with_image_embedded(Path(path_str))
        call = save_stuff_with_image_embedded.calls()[0]
        assert call.output["out"] == f"Some random text + a path: {path_str}"


def test_image_from_remote_path() -> None:
    remote_path = "https://www.gstatic.com/webp/gallery/1.jpg"
    img = Image.open(requests.get(remote_path, stream=True).raw)

    @weave.op
    def log_image(path: str) -> dict:
        return {"img": path}

    log_image(remote_path)
    call = log_image.calls()[0]
    assert call.output["img"].path == remote_path
    assert call.output["img"].img.tobytes() == img.tobytes()
