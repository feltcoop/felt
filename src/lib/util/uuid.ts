import {v4} from '@lukeed/uuid';

import type {Flavored} from '$lib/util/types.js';

export type Uuid = Flavored<string, 'Uuid'>;

export const uuid: () => Uuid = v4;

export const is_uuid = (s: string): s is Uuid => uuid_matcher.test(s);

// Postgres doesn't support the namespace prefix, so neither does Felt.
// For more see the UUID RFC - https://tools.ietf.org/html/rfc4122
// The Ajv validator does support the namespace, hence this custom implementation.
export const uuid_matcher = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
