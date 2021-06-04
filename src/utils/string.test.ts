import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {
	plural,
	truncate,
	strip_start,
	strip_end,
	strip_after,
	strip_before,
	ensure_start,
	ensure_end,
	deindent,
} from './string.js';

/* test_truncate */
const test_truncate = suite('truncate');

test_truncate('basic behavior', () => {
	t.is(truncate('foobarbaz', 5), 'fo...');
});

test_truncate('no truncation needed', () => {
	t.is(truncate('foobarbaz', 9), 'foobarbaz');
});

test_truncate('custom suffix', () => {
	t.is(truncate('foobarbaz', 5, '-'), 'foob-');
});

test_truncate('no suffix', () => {
	t.is(truncate('foobarbaz', 5, ''), 'fooba');
});

test_truncate('zero length', () => {
	t.is(truncate('foobarbaz', 0), '');
});

test_truncate('zero length and no suffix', () => {
	t.is(truncate('foobarbaz', 0, ''), '');
});

test_truncate('negative length', () => {
	t.is(truncate('foobarbaz', -5), '');
});

test_truncate('length equal to suffix', () => {
	t.is(truncate('foobarbaz', 2, '..'), '..');
});

test_truncate('length shorter than suffix returns empty string', () => {
	t.is(truncate('foobarbaz', 2, '...'), '');
});

test_truncate.run();
/* /test_truncate */

/* test_strip_start */
const test_strip_start = suite('strip_start');

test_strip_start('basic behavior', () => {
	t.is(strip_start('foobar', 'foo'), 'bar');
});

test_strip_start('single character', () => {
	t.is(strip_start('foobar', 'f'), 'oobar');
});

test_strip_start('single character of multiple', () => {
	t.is(strip_start('ffoobar', 'f'), 'foobar');
});

test_strip_start('noop for partial match', () => {
	t.is(strip_start('foobar', 'fob'), 'foobar');
});

test_strip_start('noop for matching end but not start', () => {
	t.is(strip_start('foobar', 'bar'), 'foobar');
});

test_strip_start('noop for empty string', () => {
	t.is(strip_start('foobar', ''), 'foobar');
});

test_strip_start.run();
/* /test_strip_start */

/* test_strip_end */
const test_strip_end = suite('strip_end');

test_strip_end('basic behavior', () => {
	t.is(strip_end('foobar', 'bar'), 'foo');
});

test_strip_end('single character', () => {
	t.is(strip_end('foobar', 'r'), 'fooba');
});

test_strip_end('single character of multiple', () => {
	t.is(strip_end('foobarr', 'r'), 'foobar');
});

test_strip_end('noop for partial match', () => {
	t.is(strip_end('foobar', 'oar'), 'foobar');
});

test_strip_end('noop for matching start but not end', () => {
	t.is(strip_end('foobar', 'foo'), 'foobar');
});

test_strip_end('noop for empty string', () => {
	t.is(strip_end('foobar', ''), 'foobar');
});

test_strip_end.run();
/* /test_strip_end */

/* test_strip_after */
const test_strip_after = suite('strip_after');

test_strip_after('basic behavior', () => {
	t.is(strip_after('foobar', 'oo'), 'f');
});

test_strip_after('starting characters', () => {
	t.is(strip_after('foobar', 'foo'), '');
});

test_strip_after('ending characters', () => {
	t.is(strip_after('foobar', 'bar'), 'foo');
});

test_strip_after('single character', () => {
	t.is(strip_after('foobar', 'b'), 'foo');
});

test_strip_after('first of many characters', () => {
	t.is(strip_after('foobar', 'o'), 'f');
});

test_strip_after('strips after first character', () => {
	t.is(strip_after('foobar', 'f'), '');
});

test_strip_after('strips last character', () => {
	t.is(strip_after('foobar', 'r'), 'fooba');
});

test_strip_after('noop for missing character', () => {
	t.is(strip_after('foobar', 'x'), 'foobar');
});

test_strip_after('noop for partial match', () => {
	t.is(strip_after('foobar', 'bo'), 'foobar');
});

test_strip_after('empty string', () => {
	t.is(strip_after('foobar', ''), 'foobar');
});

test_strip_after.run();
/* /test_strip_after */

/* test_strip_before */
const test_strip_before = suite('strip_before');

test_strip_before('basic behavior', () => {
	t.is(strip_before('foobar', 'oo'), 'bar');
});

test_strip_before('starting characters', () => {
	t.is(strip_before('foobar', 'foo'), 'bar');
});

test_strip_before('ending characters', () => {
	t.is(strip_before('foobar', 'bar'), '');
});

test_strip_before('single character', () => {
	t.is(strip_before('foobar', 'b'), 'ar');
});

test_strip_before('first of many characters', () => {
	t.is(strip_before('foobar', 'o'), 'obar');
});

test_strip_before('strips after first character', () => {
	t.is(strip_before('foobar', 'f'), 'oobar');
});

test_strip_before('strips last character', () => {
	t.is(strip_before('foobar', 'r'), '');
});

test_strip_before('noop for missing character', () => {
	t.is(strip_before('foobar', 'x'), 'foobar');
});

test_strip_before('noop for partial match', () => {
	t.is(strip_before('foobar', 'bo'), 'foobar');
});

test_strip_before('empty string', () => {
	t.is(strip_before('foobar', ''), 'foobar');
});

test_strip_before.run();
/* /test_strip_before */

/* test_ensure_start */
const test_ensure_start = suite('ensure_start');

test_ensure_start('basic behavior', () => {
	t.is(ensure_start('foobar', 'food'), 'foodfoobar');
});

test_ensure_start('existing text', () => {
	t.is(ensure_start('foobar', 'foo'), 'foobar');
});

test_ensure_start('existing character', () => {
	t.is(ensure_start('foobar', 'f'), 'foobar');
});

test_ensure_start('second character', () => {
	t.is(ensure_start('foobar', 'o'), 'ofoobar');
});

test_ensure_start('empty string', () => {
	t.is(ensure_start('foobar', ''), 'foobar');
});

test_ensure_start('whole string', () => {
	t.is(ensure_start('foobar', 'foobar'), 'foobar');
});

test_ensure_start('whole string plus a start character', () => {
	t.is(ensure_start('foobar', 'xfoobar'), 'xfoobarfoobar');
});

test_ensure_start('whole string plus an end character', () => {
	t.is(ensure_start('foobar', 'foobarx'), 'foobarxfoobar');
});

test_ensure_start('empty strings', () => {
	t.is(ensure_start('', ''), '');
});

test_ensure_start('empty source string', () => {
	t.is(ensure_start('', 'foo'), 'foo');
});

test_ensure_start.run();
/* /test_ensure_start */

/* test_ensure_end */
const test_ensure_end = suite('ensure_end');

test_ensure_end('basic behavior', () => {
	t.is(ensure_end('foobar', 'abar'), 'foobarabar');
});

test_ensure_end('existing text', () => {
	t.is(ensure_end('foobar', 'bar'), 'foobar');
});

test_ensure_end('existing character', () => {
	t.is(ensure_end('foobar', 'r'), 'foobar');
});

test_ensure_end('second to last character', () => {
	t.is(ensure_end('foobar', 'a'), 'foobara');
});

test_ensure_end('empty string', () => {
	t.is(ensure_end('foobar', ''), 'foobar');
});

test_ensure_end('whole string', () => {
	t.is(ensure_end('foobar', 'foobar'), 'foobar');
});

test_ensure_end('whole string plus a start character', () => {
	t.is(ensure_end('foobar', 'xfoobar'), 'foobarxfoobar');
});

test_ensure_end('whole string plus an end character', () => {
	t.is(ensure_end('foobar', 'foobarx'), 'foobarfoobarx');
});

test_ensure_end('empty strings', () => {
	t.is(ensure_end('', ''), '');
});

test_ensure_end('empty source string', () => {
	t.is(ensure_end('', 'foo'), 'foo');
});

test_ensure_end.run();
/* /test_ensure_end */

/* test_deindent */
const test_deindent = suite('deindent');

test_deindent('basic behavior', () => {
	t.is(
		deindent(`
			hello
			world
				- nested
					- more
				- less
	`),
		`hello
world
- nested
- more
- less
`,
	);
});

test_deindent('single line', () => {
	t.is(deindent('  hey'), 'hey');
});

test_deindent('strips trailing spaces', () => {
	t.is(deindent('  hey  '), 'hey');
});

test_deindent.run();
/* /test_deindent */

/* test_plural */
const test_plural = suite('plural');

test_plural('pluralizes 0', () => {
	t.is(plural(0), 's');
});

test_plural('pluralizes a positive float', () => {
	t.is(plural(45.8), 's');
});

test_plural('pluralizes a negative number', () => {
	t.is(plural(-3), 's');
});

test_plural('does not pluralize 1', () => {
	t.is(plural(1), '');
});

test_plural.run();
/* /test_plural */
