import C from "./crdt";
import { Path, NodeT, NodesT, TextT, ElemT } from "./types";

const createText = (props: { text: string } & { [k: string]: any }) => {
  const m: TextT = new C.Map();
  for (const k in props) {
    m.set(k, props[k]);
  }
  return m;
};

const createElem = (props: { type: string } & { [k: string]: any }, ...children: NodeT[]) => {
  const m: ElemT = new C.Map();
  for (const k in props) {
    m.set(k, props[k]);
  }

  const ch: NodesT = new C.Array();
  m.set("children", ch);

  ch.push(children);
  return m;
};

export const create = { text: createText, elem: createElem };

export const getChildren = (n: NodeT) => {
  const ch = n.get("children");
  return ch && typeof ch !== "string" ? ch : undefined;
};

export const getNode = (nodes: NodesT, p: Path): NodeT => {
  const [i, ...rest] = p;
  const n = nodes.get(i);
  const children = n && getChildren(n);
  return !rest.length || !children ? n : getNode(children, rest); // Should we return parent node if no children found or undefined?
};
