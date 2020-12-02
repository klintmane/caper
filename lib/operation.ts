import { Node, Path } from "./om";

const types = ["insertNode", "insertText", "updateNode", "updateSel", "removeNode", "removeText", "splitNode", "mergeNode"] as const;

type Op<T extends typeof types[number]> = T;
// const typesObj = types.reduce((acc, curr) => ({ ...acc, [curr]: curr }), {}) as { [k: string]: Type };

export type InsertNode = { type: Op<"insertNode">; path: Path; node: Node };
export type InsertText = { type: Op<"insertText">; path: Path; offset: number; text: string };

export type UpdateNode = { type: Op<"updateNode">; path: Path; node: Partial<Node>; updated: Partial<Node> };
// export type UpdateText = { type: Op<"updateText">; node: Node };

export type UpdateSelection = { type: Op<"updateSel">; selection: Partial<[]>; updated: Partial<[]> }; // TODO: Create a range/selection type

export type RemoveNode = { type: Op<"removeNode">; path: Path; node: Node };
export type RemoveText = { type: Op<"removeText">; path: Path; offset: number; text: string };

export type MergeNode = { type: Op<"mergeNode">; path: Path; position: number; node: Partial<Node> };
export type SplitNode = { type: Op<"splitNode">; path: Path; position: number; node: Partial<Node> };

type Operation = InsertText | InsertNode | UpdateNode | /*| UpdateText*/ UpdateSelection | RemoveNode | RemoveText | SplitNode | MergeNode;

const isValid = (op: Operation) => {
  switch (op.type) {
    case "insertNode": {
      const { type } = op as Partial<InsertNode>;
      //   return Path.isPath(value.path) && Node.isNode(value.node)
      return;
    }

    case "insertText": {
      const { type } = op as Partial<InsertText>;
      //   typeof value.offset === 'number' && typeof value.text === 'string' &&  Path.isPath(value.path)
      return;
    }

    case "updateNode": {
      const { type } = op as Partial<UpdateNode>;
      // return (Path.isPath(value.path) && isPlainObject(value.properties) && isPlainObject(value.newProperties))
      return;
    }

    // case "updateText": {
    //   const { type } = op as Partial<UpdateText>;
    //   //   unknown
    //   return;
    // }

    case "removeNode": {
      const { type } = op as Partial<RemoveNode>;
      // return Path.isPath(value.path) && Node.isNode(value.node)
      return;
    }

    case "removeText": {
      const { type } = op as Partial<RemoveText>;
      // return (typeof value.offset === 'number' && typeof value.text === 'string' && Path.isPath(value.path))
      return;
    }

    case "splitNode": {
      const { type } = op as Partial<SplitNode>;
      // return (Path.isPath(value.path) && typeof value.position === 'number' && isPlainObject(value.properties))
      return;
    }

    case "mergeNode": {
      const { type } = op as Partial<MergeNode>;
      //   return typeof value.position === "number" && Path.isPath(value.path) && isPlainObject(value.properties);
      return;
    }

    case "updateSel": {
      const { type } = op as Partial<UpdateSelection>;
      // return ((value.properties === null && Range.isRange(value.newProperties)) || (value.newProperties === null && Range.isRange(value.properties)) || (isPlainObject(value.properties) && isPlainObject(value.newProperties)))
      return;
    }
  }
};

const invert = (op: Operation): Operation | undefined => {
  switch (op.type) {
    case "insertNode": {
      //   return { ...op, type: 'removeNode' }
      return;
    }

    case "insertText": {
      // return { ...op, type: 'removeText' }
      return;
    }

    case "mergeNode": {
      // return { ...op, type: 'splitNode', path: Path.previous(op.path) }
      return;
    }

    case "removeNode": {
      // return { ...op, type: 'insertNode' }
      return;
    }

    case "removeText": {
      // return { ...op, type: 'insertText' }
      return;
    }

    case "updateNode": {
      // return { ...op, properties: op.newProperties, newProperties: op.properties }
      return;
    }

    case "updateSel": {
      //   if (op.properties == null) {
      //     return { ...op, properties: op.newProperties as Range, newProperties: null }
      //   } else if (op.newProperties == null) {
      //     return { ...op, properties: null, newProperties: op.properties as Range }
      //   } else {
      //     return { ...op, properties: op.newProperties, newProperties: op.properties }
      //   }
      return;
    }

    case "splitNode": {
      //   return { ...op, type: 'mergeNode', path: Path.next(op.path) }
      return;
    }
  }
};
