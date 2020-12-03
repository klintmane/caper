import { Doc, Map, Array, UndoManager } from "yjs";
import { Path } from "./om";

import { NodeT, NodesT, ElemT, TextT } from "./crdt";

type Editor = ReturnType<typeof create>;

const create = () => {
  const doc = new Doc();

  const nodes: NodesT = doc.getArray("nodes");
  const history = new UndoManager(nodes);

  return { nodes, history, doc };
};

const createText = (props: { text: string } & { [k: string]: any }) => {
  const m: TextT = new Map();
  for (const k in props) {
    m.set(k, props[k]);
  }
  return m;
};

const createElem = (props: { type: string } & { [k: string]: any }, children: NodeT[]) => {
  const m: ElemT = new Map();
  for (const k in props) {
    m.set(k, props[k]);
  }

  const ch: NodesT = new Array();
  m.set("children", ch);

  ch.push(children);
  return m;
};

const getChildren = (n: NodeT) => {
  const ch = n.get("children");
  return ch && typeof ch !== "string" ? ch : undefined;
};

const getNode = (nodes: NodesT, p: Path): NodeT => {
  const [i, ...rest] = p;
  const n = nodes.get(i);
  const children = n && getChildren(n);
  return !rest.length || !children ? n : getNode(children, rest); // Should we return parent node if no children found or undefined?
};

const insertNode = (nodes: NodesT, p: Path, n: NodeT) => {
  const i = pathIndex(p);
  const parent = getNode(nodes, pathParent(p));

  if (parent) {
    getChildren(parent)?.insert(i, [n]);
  } else {
    nodes.insert(i, [n]);
  }
};

export { create, createText, createElem, getChildren, getNode, insertNode };

// PATH UTILS

const pathParent = (p: Path) => p.slice(0, -1);
const pathIndex = (p: Path) => p[p.length - 1];
