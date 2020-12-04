import { NodesT, NodeT } from "./types";
import C from "./crdt";
import { insertNode } from "./operations";

export { create } from "./nodes";
export { insertNode, insertText } from "./operations";

export const init = (initialValue?: NodeT[]) => {
  const doc = new C.Doc();

  const nodes: NodesT = doc.getArray("nodes");
  const history = new C.History(nodes);

  initialValue && insertNode(nodes, [0], initialValue);

  return { nodes, history, doc };
};

export type Editor = ReturnType<typeof init>;
