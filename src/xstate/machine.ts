import {useMachine} from '@xstate/svelte'; // TODO should be a type import

// TODO copypasta with src/onboard/onboard.ts

// TODO types
export interface Context {}
export type Event = any;
export type Typestate = any;

export type State = ReturnType<UseMachine>['state'];
export type Send = ReturnType<UseMachine>['send'];
type UseMachine = typeof typeWrapper;
const typeWrapper = () => useMachine<Context, Event, Typestate>(null as any);