import {assignNodeIds} from './markup';
import type {MarkupNode} from './markup';

export const sampleMarkupNode1: MarkupNode = assignNodeIds({
	type: 'Block',
	children: [
		{type: 'Text', content: 'hey~!'},
		{
			type: 'Block',
			children: [
				{type: 'Text', content: 'check it out, a language!'},
				{type: 'Text', content: 'wow'},
			],
		},
		{
			type: 'Frame',
			model: '/example/1/model',
			view: '/example/1/view',
			children: [
				{
					type: 'Frame',
					model: '/example/1/model',
					view: '/example/1/view',
				},
				{
					type: 'Frame',
					model: '/example/1/model',
					view: '/example/1/view',
				},
				{
					type: 'Frame',
					model: '/example/1/model',
					view: '/example/1/view',
				},
			],
		},
		{
			type: 'Frame',
			model: '/example/1/model',
			view: '/example/1/view',
			children: [
				{
					type: 'Frame',
					model: '/example/1/model',
					view: '/example/1/view',
					children: [
						{
							type: 'Frame',
							model: '/example/1/model',
							view: '/example/1/view',
							children: [
								{
									type: 'Frame',
									model: '/example/1/model',
									view: '/example/1/view',
								},
							],
						},
					],
				},
			],
		},
	],
});
