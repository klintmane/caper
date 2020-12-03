import C from "./crdt";
import { Path, NodeT, NodesT, ElemT, TextT } from "./types";

export type Editor = ReturnType<typeof create>;

const create = () => {
  const doc = new C.Doc();

  const nodes: NodesT = doc.getArray("nodes");
  const history = new C.History(nodes);

  return { nodes, history, doc };
};

const createText = (props: { text: string } & { [k: string]: any }) => {
  const m: TextT = new C.Map();
  for (const k in props) {
    m.set(k, props[k]);
  }
  return m;
};

const createElem = (props: { type: string } & { [k: string]: any }, children: NodeT[]) => {
  const m: ElemT = new C.Map();
  for (const k in props) {
    m.set(k, props[k]);
  }

  const ch: NodesT = new C.Array();
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

const insertNode = (nodes: NodesT, p: Path, n: NodeT | NodeT[]) => {
  const i = pathIndex(p);
  const parent = getNode(nodes, pathParent(p));

  const entries = window.Array.isArray(n) ? n : [n];

  if (parent) {
    getChildren(parent)?.insert(i, entries);
  } else {
    nodes.insert(i, entries);
  }
};

export { create, createText, createElem, getChildren, getNode, insertNode };

// PATH UTILS

const pathParent = (p: Path) => p.slice(0, -1);
const pathIndex = (p: Path) => p[p.length - 1];

export const example = [
  createElem({ type: "p" }, [createText({ text: "Hello" })]),
  createElem({ type: "p" }, [createText({ text: "Hello" }), createText({ text: "World" })]),
  createElem({ type: "p" }, [createElem({ type: "h1" }, [createText({ text: "This is" }), createText({ text: "very" })])]),
];
