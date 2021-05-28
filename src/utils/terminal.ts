import {red, yellow, green, cyan, blue, magenta} from 'kleur/colors';

export * from 'kleur/colors';

const rainbowColors = [red, yellow, green, cyan, blue, magenta];

export const rainbow = (str: string): string =>
	Array.from(str)
		.map((char, i) => rainbowColors[i % rainbowColors.length](char))
		.join('');
