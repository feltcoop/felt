/*

copied from: https://consentful.systems/

TODO add summarys

TODO should "affirmative consent" instead of "consent" in some places?

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
	summary: string;
}

export const consent_principles_data: Consent_Principle[] = [
	{type: 'voluntary', summary: 'TODO'},
	{type: 'informed', summary: 'TODO'},
	{type: 'revertible', summary: 'TODO'},
	{type: 'specific', summary: 'TODO'},
	{type: 'unburdensome', summary: 'TODO'},
];

const [voluntary, informed, revertible, specific, unburdensome] = consent_principles_data;

export const consent_principles: Record<Consent_Principle_Type, Consent_Principle> = {
	voluntary,
	informed,
	revertible,
	specific,
	unburdensome,
};
