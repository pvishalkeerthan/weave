import _ from 'lodash';

import {parseRef, refUri, WeaveObjectRef} from './react';

describe('parseRef', () => {
  describe('parsing weave ref', () => {
    it('parses a ref without slashes in name', () => {
      const parsed = parseRef(
        'weave:///entity/project/object/artifact-name:artifactversion'
      );
      expect(parsed).toEqual({
        artifactName: 'artifact-name',
        artifactRefExtra: '',
        artifactVersion: 'artifactversion',
        entityName: 'entity',
        projectName: 'project',
        scheme: 'weave',
        weaveKind: 'object',
      });
    });
    // Entities are not supposed to have uppercase letters, spaces, etc.
    // But in the wild they do, so the ref parser shouldn't throw an error.
    it('parses a ref with capital letters in entity', () => {
      const parsed = parseRef(
        'weave:///Entity/project/object/artifact-name:artifactversion'
      );
      expect(parsed).toEqual({
        artifactName: 'artifact-name',
        artifactRefExtra: '',
        artifactVersion: 'artifactversion',
        entityName: 'Entity',
        projectName: 'project',
        scheme: 'weave',
        weaveKind: 'object',
      });
    });
    it('parses a ref with spaces in entity', () => {
      const parsed = parseRef(
        'weave:///Entity%20Name/project/object/artifact-name:artifactversion'
      );
      expect(parsed).toEqual({
        artifactName: 'artifact-name',
        artifactRefExtra: '',
        artifactVersion: 'artifactversion',
        entityName: 'Entity Name',
        projectName: 'project',
        scheme: 'weave',
        weaveKind: 'object',
      });
    });
    it('parses a ref without slashes in name and with extra', () => {
      const parsed = parseRef(
        'weave:///entity/project/object/artifact-name:artifactversion/attr/rows/id/rowversion'
      );
      expect(parsed).toEqual({
        artifactName: 'artifact-name',
        artifactRefExtra: 'attr/rows/id/rowversion',
        artifactVersion: 'artifactversion',
        entityName: 'entity',
        projectName: 'project',
        scheme: 'weave',
        weaveKind: 'object',
      });
    });
    it('parses a ref with slashes in name', () => {
      const parsed = parseRef(
        'weave:///entity/project/object/a/b/c:artifactversion'
      );
      expect(parsed).toEqual({
        artifactName: 'a/b/c',
        artifactRefExtra: '',
        artifactVersion: 'artifactversion',
        entityName: 'entity',
        projectName: 'project',
        scheme: 'weave',
        weaveKind: 'object',
      });
    });
    it('parses a ref with slashes in name and with extra', () => {
      const parsed = parseRef(
        'weave:///entity/project/object/a/b/c:artifactversion/attr/rows/id/rowversion'
      );
      expect(parsed).toEqual({
        scheme: 'weave',
        artifactName: 'a/b/c',
        artifactRefExtra: 'attr/rows/id/rowversion',
        artifactVersion: 'artifactversion',
        entityName: 'entity',
        projectName: 'project',
        weaveKind: 'object',
      });
    });
    it('parses a ref with spaces in name and projectName', () => {
      const parsed = parseRef(
        'weave:///entity/project with spaces/object/artifact name with spaces:artifactversion'
      );
      expect(parsed).toEqual({
        artifactName: 'artifact name with spaces',
        artifactRefExtra: '',
        artifactVersion: 'artifactversion',
        entityName: 'entity',
        projectName: 'project with spaces',
        scheme: 'weave',
        weaveKind: 'object',
      });
    });
    it('parses a ref with escaped spaces in name and projectName', () => {
      const parsed = parseRef(
        'weave:///entity/project%20with%20spaces/object/artifact%20name%20with%20spaces:artifactversion'
      );
      expect(parsed).toEqual({
        artifactName: 'artifact name with spaces',
        artifactRefExtra: '',
        artifactVersion: 'artifactversion',
        entityName: 'entity',
        projectName: 'project with spaces',
        scheme: 'weave',
        weaveKind: 'object',
      });
    });
  });
  it('parses a specific hard ref from python tests', () => {
    const parsed = parseRef(
      'weave:///timssweeney/dev_testing_images_3/object/name%3A %2F!@#$%25^&*()_+:rUA8vNX3RqX6rPAVmdeNyJrMtmx3h8qOPxnlulaeB78/key/name%3A %2F!@#$%25^&*()_+'
    );
    expect(parsed).toEqual({
      artifactName: 'name: /!@#$%^&*()_+',
      // Unless we make `artifactRefExtra` a list, we have to keep this encoded
      artifactRefExtra: 'key/name%3A %2F!@#$%25^&*()_+',
      artifactVersion: 'rUA8vNX3RqX6rPAVmdeNyJrMtmx3h8qOPxnlulaeB78',
      entityName: 'timssweeney',
      projectName: 'dev_testing_images_3',
      scheme: 'weave',
      weaveKind: 'object',
    });
  });
});
  it('handles any character in user-defined fields', () => {
    const allChars = [];

    for (let i = 0; i < 256; i++) {
      allChars.push(String.fromCharCode(i));
    }

    const allCharsNoSlashOrColon = allChars.filter(c => c !== '/' && c !== ':');

    const ref: WeaveObjectRef = {
      scheme: 'weave',
      entityName: _.shuffle(allCharsNoSlashOrColon).join(''),
      projectName: _.shuffle(allCharsNoSlashOrColon).join(''),
      weaveKind: 'object',
      artifactName: _.shuffle(allChars).join(''),
      artifactVersion: '1234567890',
      artifactRefExtra: ['key', _.shuffle(allChars).join('')].join('/'),
    };

    const checkUrl = [
      'weave://',
      ref.entityName,
      ref.projectName,
      ref.weaveKind,
      encodeURIComponent(ref.artifactName) + ':' + ref.artifactVersion,
      ref.artifactRefExtra?.split('/').map(encodeURIComponent).join('/'),
    ].join('/');
    const genUrl = refUri(ref);
    expect(genUrl).toEqual(checkUrl);
    const parsed = parseRef(genUrl);
    expect(parsed).toEqual(ref);
  });
  it('parses a weave table ref', () => {
    const parsed = parseRef(
      'weave:///entity/project/table/b8dfcb84974c481fd98fd9878e56be02ebef3e2da44becb59d1863cd643b83fe'
    );
    expect(parsed).toEqual({
      scheme: 'weave',
      artifactName: '',
      artifactRefExtra: '',
      artifactVersion:
        'b8dfcb84974c481fd98fd9878e56be02ebef3e2da44becb59d1863cd643b83fe',
      entityName: 'entity',
      projectName: 'project',
      weaveKind: 'table',
    });
  });
  it('parses a weave call ref', () => {
    const parsed = parseRef(
      'weave:///entity/project/call/178a32ca-1c00-486d-bd55-6207a7a25ff7'
    );
    expect(parsed).toEqual({
      scheme: 'weave',
      artifactName: '178a32ca-1c00-486d-bd55-6207a7a25ff7',
      artifactRefExtra: '',
      artifactVersion: '',
      entityName: 'entity',
      projectName: 'project',
      weaveKind: 'call',
    });
  });
  it('parses an op ref with * as version', () => {
    const parsed = parseRef('weave:///entity/project/op/op-name:*');
    expect(parsed).toEqual({
      artifactName: 'op-name',
      artifactRefExtra: '',
      artifactVersion: '*',
      entityName: 'entity',
      projectName: 'project',
      scheme: 'weave',
      weaveKind: 'op',
    });
  });
});
