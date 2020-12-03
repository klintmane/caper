import { Doc, Map, Array, UndoManager } from "yjs";
import { Path } from "./om";

// ytext.insert(0, 'bold text', { bold: true })

type Node = NodeElem | NodeFrag;
type NodeFrag = { text: string };
type NodeElem = { type: string; children: string[] };

type Editor = ReturnType<typeof create>;

const create = () => {
  const doc = new Doc();

  const nodes: Map<Node> = doc.getMap("nodes");
  const history = new UndoManager(nodes);

  return { nodes, history };
};

const insertNode = (e: Editor, p: Path, n: Node) => {
  e.nodes.set(p.join("."), n);
};

const getNode = (e: Editor, p: Path) => {
  e.nodes.get(p.join("."));
};

const setNode = (e: Editor, p: Path, n: Node) => {
  e.nodes.set(p.join("."), n);
};

const toArray = (e: Editor) => {
  // const split = [...e.nodes.keys()].map((x) => x.split(".")); // [[0], [0,0], [0,1], [1], [1,0], [1,1], [1,1,0], [2]]
  // const keys = split.sort((a, b) => a.length - b.length); // ['0', '0.0', '0.1', '1', '1.0', '1.1', '1.1.0', '2']

  const paths = nestPaths([...e.nodes.keys()]);
};

const getAt = (a: any[], p: number[]): any => {
  const [i, ...rest] = p;
  return !rest.length ? a[i] : getAt(a[i], rest);
};

const setAt = (a: any[], p: number[], v: any, set: Function = (x: any) => x): any => {
  const [i, ...rest] = p;
  if (!rest.length) {
    a[i] = set(v);
  } else {
    a[i] = window.Array.isArray(a[i]) ? a[i] : [];
    setAt(a[i], rest, v);
  }
};

const nestPaths = (paths: string[], get: Function = (x: any) => x) =>
  paths.reduce((arr, p) => {
    const split = (p.split(".") as any) as number[];
    setAt(arr, split, get(p));
    return arr;
  }, []);
