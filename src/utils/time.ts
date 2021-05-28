import {round} from './math.js';

export interface Stopwatch {
	(reset?: boolean): number;
}

// tracks elapsed time in milliseconds
export const createStopwatch = (decimals = 2): Stopwatch => {
	let start = process.hrtime.bigint();
	return (reset = false) => {
		const end = process.hrtime.bigint();
		const elapsed = round(Number(end - start) / 1_000_000, decimals);
		if (reset) start = end;
		return elapsed;
	};
};

export class Timings<T extends string | number = string | number> {
	private readonly timings = new Map<T, number>();
	private readonly stopwatches = new Map<T, Stopwatch>();

	constructor(public readonly decimals?: number) {}

	start(key: T, replace = false, decimals = this.decimals): () => number {
		if (!replace && this.stopwatches.has(key)) {
			throw Error(`Timing key is already in use: ${key}`);
		}
		this.stopwatches.set(key, createStopwatch(decimals));
		this.timings.set(key, undefined!); // initializing to preserve order
		return () => this._stop(key);
	}
	_stop(key: T): number {
		const stopwatch = this.stopwatches.get(key);
		if (!stopwatch) {
			throw Error(`Unknown timing key cannot be stopped: ${key}`);
		}
		this.stopwatches.delete(key);
		const timing = stopwatch();
		this.timings.set(key, timing);
		return timing;
	}
	get(key: T): number {
		const timing = this.timings.get(key);
		if (timing === undefined) {
			throw new Error(`Timing key not found: ${key}`);
		}
		return timing;
	}
	getAll(): IterableIterator<[T, number]> {
		return this.timings.entries();
	}

	// Merges other timings into this one,
	// adding together values with identical keys.
	merge(timings: Timings<T>): void {
		for (const [key, timing] of timings.getAll()) {
			this.timings.set(key, (this.timings.get(key) || 0) + timing);
		}
	}

	// clear(): void {
	// 	this.stopwatches.clear();
	// 	this.timings.clear();
	// }
	// toJSON() {} ?????
}
