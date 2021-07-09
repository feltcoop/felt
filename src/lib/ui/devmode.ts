import {getContext, setContext} from 'svelte';
import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

const KEY = {};

export const get_devmode = (): Writable<boolean> => getContext(KEY);

export const set_devmode = (value: boolean | Writable<boolean> = false): Writable<boolean> => {
	const store = typeof value === 'boolean' ? writable(value) : value;
	setContext(KEY, store);
	return store;
};
