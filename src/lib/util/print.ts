import {gray, white, green, yellow} from '$lib/util/terminal.js';
import {round} from '$lib/util/math.js';
import {truncate} from '$lib/util/string.js';
import type {Timings} from '$lib/util/timings.js';
import type {Logger} from '$lib/util/log.js';
import {arrow_left} from '$lib/ui/icons.js';

export const print_key_value = (key: string, val: string | number): string =>
	gray(`${key}(`) + val + gray(')');

export const print_ms = (ms: number, decimals?: number | undefined): string => {
	if (decimals === undefined) {
		decimals = ms >= 10 ? 0 : ms < 0.1 ? 2 : 1;
	}
	return white(round(ms, decimals).toFixed(decimals)) + gray('ms');
};
export const print_causes = (solutions: string[]): string =>
	'\n	Possible causes:' + solutions.map((s) => `\n		• ${s}`).join('');
export const print_str = (s: string): string => green(`'${s}'`);

export const print_value = (value: unknown): unknown => {
	switch (typeof value) {
		case 'string':
			return print_str(value);
		default:
			return value;
	}
};

const MAX_ERROR_LOG_LENGTH = 1000;

// Because throwing errors and rejecting promises isn't typesafe,
// don't assume the arg is an `Error` and try to return something useful.
export const print_error = (err: Error): string =>
	truncate(
		yellow(
			(err && (err.stack || (err.message && `Error: ${err.message}`))) || `Unknown error: ${err}`,
		),
		MAX_ERROR_LOG_LENGTH,
	);

export const print_timing = (key: string | number, timing: number): string =>
	`${print_ms(timing)} ${gray(arrow_left)} ${gray(key)}`;

export const print_timings = (timings: Timings, log: Logger): void => {
	for (const [key, timing] of timings.get_all()) {
		log.trace(print_timing(key, timing));
	}
};
