export interface Lock<TKey = any> {
	has(key: TKey): boolean;
	peek(): TKey | null;
	lock(key: TKey): boolean;
	unlock(key: TKey): boolean;
}

// TODO look at `Obtainable`
// TODO maybe this is a good usecase for xstate? or is that a little much?
export const createLock = <TKey>(initialKey: TKey | null = null): Lock<TKey> => {
	let lockedKey: TKey | null = initialKey;
	const has = (key: TKey): boolean => key === lockedKey;
	const peek = (): TKey | null => lockedKey;
	const lock = (key: TKey): boolean => {
		if (Object.is(lockedKey, key)) return true;
		if (lockedKey === null) {
			lockedKey = key;
			return true;
		}
		return false;
	};
	const unlock = (key: TKey): boolean => {
		if (lockedKey === key) {
			lockedKey = null;
			return true;
		}
		return false;
	};
	return {has, peek, lock, unlock};
};
