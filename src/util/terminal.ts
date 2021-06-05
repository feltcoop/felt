import {red, yellow, green, cyan, blue, magenta} from 'kleur/colors';

export * from 'kleur/colors';

const rainbow_colors = [red, yellow, green, cyan, blue, magenta];

export const rainbow = (str: string): string =>
	Array.from(str)
		.map((char, i) => rainbow_colors[i % rainbow_colors.length](char))
		.join('');
