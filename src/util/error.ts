export class Unreachable_Error extends Error {
	constructor(value: never, message = `Unreachable case: ${value}`) {
		super(message);
	}
}
