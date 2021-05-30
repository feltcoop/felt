import {createMachine as create_machine} from 'xstate';
import {useMachine} from '@xstate/svelte'; // TODO should be a type import
import type {SvelteComponent} from 'svelte';

import Contentful_Begin from './consentful/Begin.svelte';
import Contentful_Voluntary from './consentful/Voluntary.svelte';
import Contentful_Informed from './consentful/Informed.svelte';
import Contentful_Revertible from './consentful/Revertible.svelte';
import Contentful_Specific from './consentful/Specific.svelte';
import Contentful_Unburdensome from './consentful/Unburdensome.svelte';
import Contentful_End from './consentful/End.svelte';
import Uncontentful_Begin from './unconsentful/Begin.svelte';
import Uncontentful_Voluntary from './unconsentful/Voluntary.svelte';
import Uncontentful_Informed from './unconsentful/Informed.svelte';
import Uncontentful_Revertible from './unconsentful/Revertible.svelte';
import Uncontentful_Specific from './unconsentful/Specific.svelte';
import Uncontentful_Unburdensome from './unconsentful/Unburdensome.svelte';
import Uncontentful_End from './unconsentful/End.svelte';
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
	initial: 'informed', // TODO
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
			component: Contentful_Begin,
		},
		voluntary: {
			id: 'voluntary',
			component: Contentful_Voluntary,
		},
		informed: {
			id: 'informed',
			component: Contentful_Informed,
		},
		revertible: {
			id: 'revertible',
			component: Contentful_Revertible,
		},
		specific: {
			id: 'specific',
			component: Contentful_Specific,
		},
		unburdensome: {
			id: 'unburdensome',
			component: Contentful_Unburdensome,
		},
		end: {
			id: 'end',
			component: Contentful_End,
		},
	},
	unconsentful: {
		begin: {
			id: 'begin',
			component: Uncontentful_Begin,
		},
		voluntary: {
			id: 'voluntary',
			component: Uncontentful_Voluntary,
		},
		informed: {
			id: 'informed',
			component: Uncontentful_Informed,
		},
		revertible: {
			id: 'revertible',
			component: Uncontentful_Revertible,
		},
		specific: {
			id: 'specific',
			component: Uncontentful_Specific,
		},
		unburdensome: {
			id: 'unburdensome',
			component: Uncontentful_Unburdensome,
		},
		end: {
			id: 'end',
			component: Uncontentful_End,
		},
	},
};
