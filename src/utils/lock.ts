export interface Lock<T_Key = any> {
	has(key: T_Key): boolean;
	peek(): T_Key | null;
	lock(key: T_Key): boolean;
	unlock(key: T_Key): boolean;
}

// TODO look at `Obtainable`
// TODO maybe this is a good usecase for xstate? or is that a little much?
export const create_lock = <T_Key>(initial_key: T_Key | null = null): Lock<T_Key> => {
	let locked_key: T_Key | null = initial_key;
	const has = (key: T_Key): boolean => key === locked_key;
	const peek = (): T_Key | null => locked_key;
	const lock = (key: T_Key): boolean => {
		if (Object.is(locked_key, key)) return true;
		if (locked_key === null) {
			locked_key = key;
			return true;
		}
		return false;
	};
	const unlock = (key: T_Key): boolean => {
		if (locked_key === key) {
			locked_key = null;
			return true;
		}
		return false;
	};
	return {has, peek, lock, unlock};
};
