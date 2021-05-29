import {createMachine} from 'xstate';
import {useMachine} from '@xstate/svelte'; // TODO should be a type import

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
