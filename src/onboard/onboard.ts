import {createMachine as create_machine} from 'xstate';
import {useMachine} from '@xstate/svelte'; // TODO should be a type import
import type {SvelteComponent} from 'svelte';

import Begin from './Begin.svelte';
import Consentful_Voluntary from './consentful/Voluntary.svelte';
import Consentful_Informed from './consentful/Informed.svelte';
import Consentful_Revertible from './consentful/Revertible.svelte';
import Consentful_Specific from './consentful/Specific.svelte';
import Consentful_Unburdensome from './consentful/Unburdensome.svelte';
import Consentful_End from './consentful/End.svelte';
import Unconsentful_Voluntary from './unconsentful/Voluntary.svelte';
import Unconsentful_Informed from './unconsentful/Informed.svelte';
import Unconsentful_Revertible from './unconsentful/Revertible.svelte';
import Unconsentful_Specific from './unconsentful/Specific.svelte';
import Unconsentful_Unburdensome from './unconsentful/Unburdensome.svelte';
import Unconsentful_End from './unconsentful/End.svelte';
import type {Consent_Type} from 'src/consent/consent';

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

export const onboard_machine = create_machine({
	id: 'onboard',
	initial: 'begin',
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
	component: typeof SvelteComponent;
}

// TODO does this belong in the machine context?
export const onboard_data: Record<Consent_Type, Record<Onboard_State_Name, Onboard_Data>> = {
	consentful: {
		begin: {
			id: 'begin',
			component: Begin,
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
			component: Consentful_End,
		},
	},
	unconsentful: {
		begin: {
			id: 'begin',
			component: Begin,
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
			component: Unconsentful_End,
		},
	},
};
