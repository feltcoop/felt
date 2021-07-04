import {red, yellow, green, cyan, blue, magenta} from 'kleur/colors';

export {
	black,
	red,
	green,
	yellow,
	blue,
	magenta,
	cyan,
	white,
	gray,
	bgBlack as bg_black,
	bgRed as bg_red,
	bgGreen as bg_green,
	bgYellow as bg_yellow,
	bgBlue as bg_blue,
	bgMagenta as bg_magenta,
	bgCyan as bg_cyan,
	bgWhite as bg_white,
	reset,
	bold,
	dim,
	italic,
	underline,
	inverse,
	hidden,
	strikethrough,
} from 'kleur/colors';

const rainbow_colors = [red, yellow, green, cyan, blue, magenta];

export const rainbow = (str: string): string =>
	Array.from(str)
		.map((char, i) => rainbow_colors[i % rainbow_colors.length](char))
		.join('');
