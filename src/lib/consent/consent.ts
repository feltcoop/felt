/*

The five principles of consent are from https://consentful.systems/
(research by Jane Im and colleagues - https://imjane.net)

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
	{
		type: 'voluntary',
		summary: 'Consent is an agreement that is 1) freely given and 2) enthusiastic.',
	},
	{
		type: 'informed',
		summary:
			'People can only consent to an interaction after being given correct information about it—in an accessible way.',
	},
	{
		type: 'revertible',
		summary: 'Consent is an ongoing negotiation and can be revoked at any time.',
	},
	{
		type: 'specific',
		summary:
			'People should be able to consent to a particular action (or a particular person), and not a series of actions or people.',
	},
	{
		type: 'unburdensome',
		summary:
			'The costs associated with giving consent should not be so high that a person gives in and says "yes" when they would rather say "no."',
	},
];

const [voluntary, informed, revertible, specific, unburdensome] = consent_principles_data;

export const consent_principles: Record<Consent_Principle_Type, Consent_Principle> = {
	voluntary,
	informed,
	revertible,
	specific,
	unburdensome,
};
