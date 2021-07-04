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
	bgBlack as black_bg,
	bgRed as red_bg,
	bgGreen as green_bg,
	bgYellow as yellow_bg,
	bgBlue as blue_bg,
	bgMagenta as magenta_bg,
	bgCyan as cyan_bg,
	bgWhite as white_bg,
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
