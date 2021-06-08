import {red, yellow, green, cyan, blue, magenta} from 'kleur/colors';

export * from 'kleur/colors';
export {
	bgRed as bg_red,
	bgYellow as bg_yellow,
	bgGreen as bg_green,
	bgCyan as bg_cyan,
	bgBlue as bg_blue,
	bgMagenta as bg_magenta,
	bgBlack as bg_black,
	bgWhite as bg_white,
} from 'kleur/colors';

const rainbow_colors = [red, yellow, green, cyan, blue, magenta];

export const rainbow = (str: string): string =>
	Array.from(str)
		.map((char, i) => rainbow_colors[i % rainbow_colors.length](char))
		.join('');
