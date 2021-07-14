// Escapes a string for literal matching in a RegExp.
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
export const escape_regexp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
