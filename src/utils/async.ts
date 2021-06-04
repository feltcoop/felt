export type Async_Status = 'initial' | 'pending' | 'success' | 'failure';

export const wait = (duration = 0) => new Promise<void>((resolve) => setTimeout(resolve, duration));

interface Wrap_After {
	(cb: Wrap_After_Callback): void;
}
interface Wrap_After_Callback {
	(): unknown | Promise<unknown>;
}

// TODO consider adding the value/err to the callback params?
export const wrap = <T>(fn: (after: Wrap_After) => Promise<T>): Promise<T> => {
	let cbs: Wrap_After_Callback[] | null = null;
	const after: Wrap_After = (cb) => {
		(cbs || (cbs = [])).push(cb);
	};
	const call_cbs = async () => {
		if (cbs === null) return;
		for (const cb of cbs) {
			await cb();
		}
	};
	return fn(after).then(
		async (value) => {
			await call_cbs();
			return value;
		},
		async (err) => {
			await call_cbs();
			throw err;
		},
	);
};
