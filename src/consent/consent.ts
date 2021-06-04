/*

copied from: https://consentful.systems/

TODO add descriptions

TODO should "affirmative content" instead of "consent" in some places?

*/

export type Consent_Type = 'consentful' | 'unconsentful';

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
	description: string;
}

export const consent_principles_data: Consent_Principle[] = [
	{type: 'voluntary', description: 'TODO'},
	{type: 'informed', description: 'TODO'},
	{type: 'revertible', description: 'TODO'},
	{type: 'specific', description: 'TODO'},
	{type: 'unburdensome', description: 'TODO'},
];

const [voluntary, informed, revertible, specific, unburdensome] = consent_principles_data;

export const consent_principles: Record<Consent_Principle_Type, Consent_Principle> = {
	voluntary,
	informed,
	revertible,
	specific,
	unburdensome,
};
