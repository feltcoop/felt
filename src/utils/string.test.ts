import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {
	plural,
	truncate,
	stripStart,
	stripEnd,
	stripAfter,
	stripBefore,
	ensureStart,
	ensureEnd,
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

/* test_stripStart */
const test_stripStart = suite('stripStart');

test_stripStart('basic behavior', () => {
	t.is(stripStart('foobar', 'foo'), 'bar');
});

test_stripStart('single character', () => {
	t.is(stripStart('foobar', 'f'), 'oobar');
});

test_stripStart('single character of multiple', () => {
	t.is(stripStart('ffoobar', 'f'), 'foobar');
});

test_stripStart('noop for partial match', () => {
	t.is(stripStart('foobar', 'fob'), 'foobar');
});

test_stripStart('noop for matching end but not start', () => {
	t.is(stripStart('foobar', 'bar'), 'foobar');
});

test_stripStart('noop for empty string', () => {
	t.is(stripStart('foobar', ''), 'foobar');
});

test_stripStart.run();
/* /test_stripStart */

/* test_stripEnd */
const test_stripEnd = suite('stripEnd');

test_stripEnd('basic behavior', () => {
	t.is(stripEnd('foobar', 'bar'), 'foo');
});

test_stripEnd('single character', () => {
	t.is(stripEnd('foobar', 'r'), 'fooba');
});

test_stripEnd('single character of multiple', () => {
	t.is(stripEnd('foobarr', 'r'), 'foobar');
});

test_stripEnd('noop for partial match', () => {
	t.is(stripEnd('foobar', 'oar'), 'foobar');
});

test_stripEnd('noop for matching start but not end', () => {
	t.is(stripEnd('foobar', 'foo'), 'foobar');
});

test_stripEnd('noop for empty string', () => {
	t.is(stripEnd('foobar', ''), 'foobar');
});

test_stripEnd.run();
/* /test_stripEnd */

/* test_stripAfter */
const test_stripAfter = suite('stripAfter');

test_stripAfter('basic behavior', () => {
	t.is(stripAfter('foobar', 'oo'), 'f');
});

test_stripAfter('starting characters', () => {
	t.is(stripAfter('foobar', 'foo'), '');
});

test_stripAfter('ending characters', () => {
	t.is(stripAfter('foobar', 'bar'), 'foo');
});

test_stripAfter('single character', () => {
	t.is(stripAfter('foobar', 'b'), 'foo');
});

test_stripAfter('first of many characters', () => {
	t.is(stripAfter('foobar', 'o'), 'f');
});

test_stripAfter('strips after first character', () => {
	t.is(stripAfter('foobar', 'f'), '');
});

test_stripAfter('strips last character', () => {
	t.is(stripAfter('foobar', 'r'), 'fooba');
});

test_stripAfter('noop for missing character', () => {
	t.is(stripAfter('foobar', 'x'), 'foobar');
});

test_stripAfter('noop for partial match', () => {
	t.is(stripAfter('foobar', 'bo'), 'foobar');
});

test_stripAfter('empty string', () => {
	t.is(stripAfter('foobar', ''), 'foobar');
});

test_stripAfter.run();
/* /test_stripAfter */

/* test_stripBefore */
const test_stripBefore = suite('stripBefore');

test_stripBefore('basic behavior', () => {
	t.is(stripBefore('foobar', 'oo'), 'bar');
});

test_stripBefore('starting characters', () => {
	t.is(stripBefore('foobar', 'foo'), 'bar');
});

test_stripBefore('ending characters', () => {
	t.is(stripBefore('foobar', 'bar'), '');
});

test_stripBefore('single character', () => {
	t.is(stripBefore('foobar', 'b'), 'ar');
});

test_stripBefore('first of many characters', () => {
	t.is(stripBefore('foobar', 'o'), 'obar');
});

test_stripBefore('strips after first character', () => {
	t.is(stripBefore('foobar', 'f'), 'oobar');
});

test_stripBefore('strips last character', () => {
	t.is(stripBefore('foobar', 'r'), '');
});

test_stripBefore('noop for missing character', () => {
	t.is(stripBefore('foobar', 'x'), 'foobar');
});

test_stripBefore('noop for partial match', () => {
	t.is(stripBefore('foobar', 'bo'), 'foobar');
});

test_stripBefore('empty string', () => {
	t.is(stripBefore('foobar', ''), 'foobar');
});

test_stripBefore.run();
/* /test_stripBefore */

/* test_ensureStart */
const test_ensureStart = suite('ensureStart');

test_ensureStart('basic behavior', () => {
	t.is(ensureStart('foobar', 'food'), 'foodfoobar');
});

test_ensureStart('existing text', () => {
	t.is(ensureStart('foobar', 'foo'), 'foobar');
});

test_ensureStart('existing character', () => {
	t.is(ensureStart('foobar', 'f'), 'foobar');
});

test_ensureStart('second character', () => {
	t.is(ensureStart('foobar', 'o'), 'ofoobar');
});

test_ensureStart('empty string', () => {
	t.is(ensureStart('foobar', ''), 'foobar');
});

test_ensureStart('whole string', () => {
	t.is(ensureStart('foobar', 'foobar'), 'foobar');
});

test_ensureStart('whole string plus a start character', () => {
	t.is(ensureStart('foobar', 'xfoobar'), 'xfoobarfoobar');
});

test_ensureStart('whole string plus an end character', () => {
	t.is(ensureStart('foobar', 'foobarx'), 'foobarxfoobar');
});

test_ensureStart('empty strings', () => {
	t.is(ensureStart('', ''), '');
});

test_ensureStart('empty source string', () => {
	t.is(ensureStart('', 'foo'), 'foo');
});

test_ensureStart.run();
/* /test_ensureStart */

/* test_ensureEnd */
const test_ensureEnd = suite('ensureEnd');

test_ensureEnd('basic behavior', () => {
	t.is(ensureEnd('foobar', 'abar'), 'foobarabar');
});

test_ensureEnd('existing text', () => {
	t.is(ensureEnd('foobar', 'bar'), 'foobar');
});

test_ensureEnd('existing character', () => {
	t.is(ensureEnd('foobar', 'r'), 'foobar');
});

test_ensureEnd('second to last character', () => {
	t.is(ensureEnd('foobar', 'a'), 'foobara');
});

test_ensureEnd('empty string', () => {
	t.is(ensureEnd('foobar', ''), 'foobar');
});

test_ensureEnd('whole string', () => {
	t.is(ensureEnd('foobar', 'foobar'), 'foobar');
});

test_ensureEnd('whole string plus a start character', () => {
	t.is(ensureEnd('foobar', 'xfoobar'), 'foobarxfoobar');
});

test_ensureEnd('whole string plus an end character', () => {
	t.is(ensureEnd('foobar', 'foobarx'), 'foobarfoobarx');
});

test_ensureEnd('empty strings', () => {
	t.is(ensureEnd('', ''), '');
});

test_ensureEnd('empty source string', () => {
	t.is(ensureEnd('', 'foo'), 'foo');
});

test_ensureEnd.run();
/* /test_ensureEnd */

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
