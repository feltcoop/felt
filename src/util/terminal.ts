import {red, yellow, green, cyan, blue, magenta} from 'kleur/colors';

export {
	bold,
	gray,
	black,
	white,
	red,
	yellow,
	green,
	cyan,
	blue,
	magenta,
	bgRed as bg_red,
	bgYellow as bg_yellow,
	bgGreen as bg_green,
	bgCyan as bg_cyan,
	bgBlue as bg_blue,
	bgMagenta as bg_magenta,
	bgBlack as bg_black,
	bgWhite as bg_white,
} from 'kleur/colors';

const rainbowColors = [red, yellow, green, cyan, blue, magenta];

export const rainbow = (str: string): string =>
	Array.from(str)
		.map((char, i) => rainbowColors[i % rainbowColors.length](char))
		.join('');
