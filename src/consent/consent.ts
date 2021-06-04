/*

copied from: https://consentful.systems/

TODO add or rewrite descriptions

*/

export type Consent_Type = 'consentful' | 'unconsentful'; // TODO expand?

export type Consent_Principle_Type =
	| 'voluntary'
	| 'informed'
	| 'revertible'
	| 'specific'
	| 'unburdensome';

export const consent_principle_types: Consent_Principle_Type[] = [
	'voluntary',
	'informed',
	'revertible',
	'specific',
	'unburdensome',
];

export interface Consent_Principle {
	type: Consent_Principle_Type;
	name: string;
	description: string; // TODO licensing/copyright/etc
}

export const principles_data: Consent_Principle[] = [
	{type: 'voluntary', name: 'Affirmative consent is voluntary.', description: 'TODO'},
	{type: 'informed', name: 'Affirmative consent is informed.', description: 'TODO'},
	{type: 'revertible', name: 'Affirmative consent is revertible.', description: 'TODO'},
	{type: 'specific', name: 'Affirmative consent is specific.', description: 'TODO'},
	{type: 'unburdensome', name: 'Affirmative consent is unburdensome.', description: 'TODO'},
];

export const principles: Record<Consent_Principle_Type, Consent_Principle> = {
	voluntary: principles_data[0],
	informed: principles_data[1],
	revertible: principles_data[2],
	specific: principles_data[3],
	unburdensome: principles_data[4],
};
