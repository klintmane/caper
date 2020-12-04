import { Path, NodesT, TextT, NodeT } from "./types";
import * as nutils from "./nodes";
import * as putils from "./path";

export const insertText = (nodes: NodesT, p: Path, o: number, t: string) => {
  const node = nutils.getNode(nodes, p);
  if (!nutils.getChildren(node)) {
    let n = node as TextT;

    const prev = n.get("text") || "";
    const text = prev.substring(0, o) + t + prev.substring(o);

    n.set("text", text);
  }
};

export const insertNode = (nodes: NodesT, p: Path, n: NodeT | NodeT[]) => {
  const i = putils.index(p);
  const parent = nutils.getNode(nodes, putils.parent(p));

  const entries = window.Array.isArray(n) ? n : [n];

  if (parent) {
    nutils.getChildren(parent)?.insert(i, entries);
  } else {
    nodes.insert(i, entries);
  }
};
