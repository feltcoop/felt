export interface BaseMarkupNode<TChildren extends BaseMarkupNode = BaseMarkupNode<any>> {
	type: string;
	id?: string;
	// optional properties that any node type can have - trying to stick close to Activity Streams
	children?: TChildren[];
	content?: string;
}

export type MarkupNode = MarkupBlockNode | MarkupTextNode | MarkupFrameNode;

export interface MarkupBlockNode extends BaseMarkupNode<MarkupNode> {
	type: 'Block';
}

export interface MarkupTextNode extends BaseMarkupNode<MarkupNode> {
	type: 'Text';
	content: string;
}

export interface MarkupFrameNode extends BaseMarkupNode<MarkupNode> {
	type: 'Frame';
	model: string; // TODO id type
	view: string; // TODO id type
	// so are `children` mounted inside the view? or does a frame have no children?
	// so wait are the children in the model? yeah im confused
}

// TODO "traverse"?
export const forEachNode = (node: MarkupNode, cb: (node: MarkupNode) => void): void => {
	cb(node);
	if (node.children) {
		for (const child of node.children) forEachNode(child, cb);
	}
};

export const assignNodeIds = <T extends MarkupNode>(node: T): T => {
	let id = 0;
	forEachNode(node, (node) => {
		node.id = `node${id++}`; // TODO ? path? what if we passed in the parent so we could do /1/3/2/2?
	});
	return node;
};
