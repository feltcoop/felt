import type {Lazy} from './function.js';
import {lazy} from './function.js';

// TODO validation?

interface To_Env_String {
	(key: string): string | undefined;
	(key: string, fallback: string | Lazy<string>): string;
}

export const to_env_string: To_Env_String = (key: string, fallback?: string | Lazy<string>) => {
	const value = process.env[key];
	return typeof value === 'string' ? value : lazy(fallback)!;
};

interface To_Env_Number {
	(key: string): number | undefined;
	(key: string, fallback: number | Lazy<number>): number;
}

export const to_env_number: To_Env_Number = (key: string, fallback?: number | Lazy<number>) => {
	const value = parseInt(process.env[key] || '', 10);
	return Number.isNaN(value) ? lazy(fallback)! : value;
};
