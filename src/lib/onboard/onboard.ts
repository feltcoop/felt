import {createMachine as create_machine} from 'xstate';
import {useMachine} from '@xstate/svelte'; // TODO should be a type import
import type {SvelteComponent} from 'svelte';

import Consentful_Voluntary from './consentful/Voluntary.svelte';
import Consentful_Informed from './consentful/Informed.svelte';
import Consentful_Revertible from './consentful/Revertible.svelte';
import Consentful_Specific from './consentful/Specific.svelte';
import Consentful_Unburdensome from './consentful/Unburdensome.svelte';
import Unconsentful_Voluntary from './unconsentful/Voluntary.svelte';
import Unconsentful_Informed from './unconsentful/Informed.svelte';
import Unconsentful_Revertible from './unconsentful/Revertible.svelte';
import Unconsentful_Specific from './unconsentful/Specific.svelte';
import Unconsentful_Unburdensome from './unconsentful/Unburdensome.svelte';
import type {Consent_Type} from '$lib/consent/consent';

// TODO we're currently using only a fraction of the xstate functionality that we want to

// TODO copypasta with src/xstate/machine.ts

// TODO types
export interface Onboard_Context {}
export type Onboard_Event = any;
export type Onboard_Typestate = any;

export type Onboard_State = ReturnType<Use_Onboard_Machine>['state'];
export type Onboard_Send = ReturnType<Use_Onboard_Machine>['send'];
type Use_Onboard_Machine = typeof to_use_onboard_machine; // TODO this is a hack to get generics working
const to_use_onboard_machine = () =>
	useMachine<Onboard_Context, Onboard_Event, Onboard_Typestate>(null!);

export const ONBOARD_STATE_KEY = 'felt_onboard_state';
const load_initial_value = (): string =>
	(typeof localStorage !== 'undefined' && localStorage.getItem(ONBOARD_STATE_KEY)) || 'begin';
export const save_state = (value: string): void => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(ONBOARD_STATE_KEY, value);
	}
};

export const onboard_machine = create_machine({
	id: 'onboard',
	initial: load_initial_value(),
	states: {
		begin: {
			on: {NEXT: 'voluntary'},
		},
		voluntary: {
			on: {NEXT: 'informed', PREVIOUS: 'begin'},
		},
		informed: {
			on: {NEXT: 'revertible', PREVIOUS: 'voluntary'},
		},
		revertible: {
			on: {NEXT: 'specific', PREVIOUS: 'informed'},
		},
		specific: {
			on: {NEXT: 'unburdensome', PREVIOUS: 'revertible'},
		},
		unburdensome: {
			on: {NEXT: 'end', PREVIOUS: 'specific'},
		},
		end: {
			on: {PREVIOUS: 'unburdensome'},
		},
	},
});

// console.log('onboard_machine', onboard_machine);

// TODO derive?
export type Onboard_State_Name =
	| 'begin'
	| 'voluntary'
	| 'informed'
	| 'revertible'
	| 'specific'
	| 'unburdensome'
	| 'end';
export interface Onboard_Data {
	id: string;
	component: typeof SvelteComponent | null;
}

// TODO does this belong in the machine context?
export const onboard_data: Record<Consent_Type, Record<Onboard_State_Name, Onboard_Data>> = {
	consentful: {
		begin: {
			id: 'begin',
			component: null,
		},
		voluntary: {
			id: 'voluntary',
			component: Consentful_Voluntary,
		},
		informed: {
			id: 'informed',
			component: Consentful_Informed,
		},
		revertible: {
			id: 'revertible',
			component: Consentful_Revertible,
		},
		specific: {
			id: 'specific',
			component: Consentful_Specific,
		},
		unburdensome: {
			id: 'unburdensome',
			component: Consentful_Unburdensome,
		},
		end: {
			id: 'end',
			component: null,
		},
	},
	unconsentful: {
		begin: {
			id: 'begin',
			component: null,
		},
		voluntary: {
			id: 'voluntary',
			component: Unconsentful_Voluntary,
		},
		informed: {
			id: 'informed',
			component: Unconsentful_Informed,
		},
		revertible: {
			id: 'revertible',
			component: Unconsentful_Revertible,
		},
		specific: {
			id: 'specific',
			component: Unconsentful_Specific,
		},
		unburdensome: {
			id: 'unburdensome',
			component: Unconsentful_Unburdensome,
		},
		end: {
			id: 'end',
			component: null,
		},
	},
};
