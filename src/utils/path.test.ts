import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {
	replaceExtension,
	toPathStem,
	toPathParts,
	toPathSegments,
	toCommonBaseDir,
} from './path.js';

/* test_replaceExtension */
const test_replaceExtension = suite('replaceExtension');

test_replaceExtension('basic behavior', () => {
	t.is(replaceExtension('foo.ts', '.js'), 'foo.js');
	t.is(replaceExtension('foo.ts', ''), 'foo');
	t.is(replaceExtension('foo.ts', 'js'), 'foojs');
	t.is(replaceExtension('foo', '.js'), 'foo.js');
});

test_replaceExtension.run();
/* /test_replaceExtension */

/* test_toPathStem */
const test_toPathStem = suite('toPathStem');

test_toPathStem('basic behavior', () => {
	t.is(toPathStem('foo.ts'), 'foo');
	t.is(toPathStem('foo'), 'foo');
	t.is(toPathStem('/absolute/bar/foo.ts'), 'foo');
	t.is(toPathStem('./relative/bar/foo.ts'), 'foo');
	t.is(toPathStem('relative/bar/foo.ts'), 'foo');
});

test_toPathStem.run();
/* /test_toPathStem */

/* test_toPathSegments */
const test_toPathSegments = suite('toPathSegments');

test_toPathSegments('basic behavior', () => {
	t.equal(toPathSegments('foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
});

test_toPathSegments('leading dot', () => {
	t.equal(toPathSegments('./foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
});

test_toPathSegments('leading two dots', () => {
	t.equal(toPathSegments('../../foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
});

test_toPathSegments('leading slash', () => {
	t.equal(toPathSegments('/foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
});

test_toPathSegments('trailing slash', () => {
	t.equal(toPathSegments('foo/bar/baz/'), ['foo', 'bar', 'baz']);
});

test_toPathSegments.run();
/* /test_toPathSegments */

/* test_toPathParts */
const test_toPathParts = suite('toPathParts');

test_toPathParts('basic behavior', () => {
	t.equal(toPathParts('foo/bar/baz.ts'), ['foo', 'foo/bar', 'foo/bar/baz.ts']);
});

test_toPathParts('leading dot', () => {
	t.equal(toPathParts('./foo/bar/baz.ts'), ['foo', 'foo/bar', 'foo/bar/baz.ts']);
});

test_toPathParts('leading slash', () => {
	t.equal(toPathParts('/foo/bar/baz.ts'), ['/foo', '/foo/bar', '/foo/bar/baz.ts']);
});

test_toPathParts('trailing slash', () => {
	t.equal(toPathParts('foo/bar/baz/'), ['foo', 'foo/bar', 'foo/bar/baz']);
});

test_toPathParts.run();
/* /test_toPathParts */

/* test_toCommonBaseDir */
const test_toCommonBaseDir = suite('toCommonBaseDir');

test_toCommonBaseDir('basic behavior', () => {
	t.is(toCommonBaseDir(['a/b/c.ts', 'a/b/c/d.ts', 'a/b/c/e.ts', 'a/b/c/e/f']), 'a/b');
});

test_toCommonBaseDir.run();
/* /test_toCommonBaseDir */
