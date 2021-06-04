import {getContext, setContext} from 'svelte';
import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

const KEY = {};

export const use_devmode = (): Writable<boolean> => getContext(KEY);

export const provide_devmode = (value: boolean = false): Writable<boolean> => {
	const store = writable(value);
	setContext(KEY, store);
	return store;
};
