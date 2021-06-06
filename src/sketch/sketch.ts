export interface Sketch {
	id: string;
	name: string;
}

export const to_sketch_id = (name: string): string => `/sketch/${name}`;
