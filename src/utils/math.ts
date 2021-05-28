// aka lerp
export const mix = (a: number, b: number, amount: number): number => {
	return (1 - amount) * a + amount * b;
};

// golden ratio: 1.618033988749894...
export const GR = (1 + Math.sqrt(5)) / 2;
export const GRi = 1 / GR;
export const GR2 = GR ** 2;
export const GR2i = 1 / GR2;
export const GR3 = GR ** 3;
export const GR3i = 1 / GR3;
export const GR4 = GR ** 4;
export const GR4i = 1 / GR4;
export const GR5 = GR ** 5;
export const GR5i = 1 / GR5;
export const GR6 = GR ** 6;
export const GR6i = 1 / GR6;
export const GR7 = GR ** 7;
export const GR7i = 1 / GR7;

export const round = (n: number, decimals: number): number => {
	const mult = 10 ** decimals;
	return Math.round(n * mult) / mult;
};
