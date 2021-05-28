import {v4} from '@lukeed/uuid';

import type {Flavored} from './types.js';

export type Uuid = Flavored<string, 'Uuid'>;

export const uuid: () => Uuid = v4;

export const isUuid = (s: string): s is Uuid => uuidMatcher.test(s);

// Postgres doesn't support the namespace prefix, so neither does Gro.
// For more see the UUID RFC - https://tools.ietf.org/html/rfc4122
// The Ajv validator does support the namespace, hence this custom implementation.
export const uuidMatcher = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
