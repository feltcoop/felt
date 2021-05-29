import {createMachine} from 'xstate';
import {useMachine} from '@xstate/svelte'; // TODO should be a type import
import type {SvelteComponent} from 'svelte';

import ContentfulBegin from './consentful/Begin.svelte';
import ContentfulVoluntary from './consentful/Voluntary.svelte';
import ContentfulInformed from './consentful/Informed.svelte';
import ContentfulRevertible from './consentful/Revertible.svelte';
import ContentfulSpecific from './consentful/Specific.svelte';
import ContentfulUnburdensome from './consentful/Unburdensome.svelte';
import ContentfulEnd from './consentful/End.svelte';
import UncontentfulBegin from './unconsentful/Begin.svelte';
import UncontentfulVoluntary from './unconsentful/Voluntary.svelte';
import UncontentfulInformed from './unconsentful/Informed.svelte';
import UncontentfulRevertible from './unconsentful/Revertible.svelte';
import UncontentfulSpecific from './unconsentful/Specific.svelte';
import UncontentfulUnburdensome from './unconsentful/Unburdensome.svelte';
import UncontentfulEnd from './unconsentful/End.svelte';

// TODO copypasta with src/xstate/machine.ts

// TODO types
export interface OnboardContext {}
export type OnboardEvent = any;
export type OnboardTypestate = any;

export type OnboardState = ReturnType<UseOnboardMachine>['state'];
export type OnboardSend = ReturnType<UseOnboardMachine>['send'];
type UseOnboardMachine = typeof typeWrapper;
const typeWrapper = () => useMachine<OnboardContext, OnboardEvent, OnboardTypestate>(null as any);

export const onboardMachine = createMachine({
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

console.log('onboardMachine', onboardMachine);

// TODO derive?
export type OnboardStateName =
	| 'begin'
	| 'voluntary'
	| 'informed'
	| 'revertible'
	| 'specific'
	| 'unburdensome'
	| 'end';
export type ConsentType = 'consentful' | 'unconsentful';
export interface OnboardData {
	id: string;
	component: typeof SvelteComponent;
}

// TODO does this belong in the machine context?
export const onboardData: Record<ConsentType, Record<OnboardStateName, OnboardData>> = {
	consentful: {
		begin: {
			id: 'begin',
			component: ContentfulBegin,
		},
		voluntary: {
			id: 'voluntary',
			component: ContentfulVoluntary,
		},
		informed: {
			id: 'informed',
			component: ContentfulInformed,
		},
		revertible: {
			id: 'revertible',
			component: ContentfulRevertible,
		},
		specific: {
			id: 'specific',
			component: ContentfulSpecific,
		},
		unburdensome: {
			id: 'unburdensome',
			component: ContentfulUnburdensome,
		},
		end: {
			id: 'end',
			component: ContentfulEnd,
		},
	},
	unconsentful: {
		begin: {
			id: 'begin',
			component: UncontentfulBegin,
		},
		voluntary: {
			id: 'voluntary',
			component: UncontentfulVoluntary,
		},
		informed: {
			id: 'informed',
			component: UncontentfulInformed,
		},
		revertible: {
			id: 'revertible',
			component: UncontentfulRevertible,
		},
		specific: {
			id: 'specific',
			component: UncontentfulSpecific,
		},
		unburdensome: {
			id: 'unburdensome',
			component: UncontentfulUnburdensome,
		},
		end: {
			id: 'end',
			component: UncontentfulEnd,
		},
	},
};
