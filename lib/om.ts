import { removeAtPath } from "./utils/array";

// const frags = path.split('.');

const removeNode = (arr: Nodes, path: Path) =>
  removeAtPath<Node>(
    arr,
    path,
    (curr) => curr.children,
    (curr, prev) => ({ ...prev, children: curr })
  );

const insertNode = (self: Nodes, parentPath: Path, props: Node) => {};
const updateNode = (self: Nodes, path: Path, props: Node) => {};

export type Path = number[]; // 0.1.0
export type Node = { type: string; children: (Node | NodeFragment)[] };
export type NodeFragment = { text: string };
export type Nodes = Node[];

export const createNode = (n: Node) => ({ type: n.type, children: n.children });
export const createNodeFragment = (n: NodeFragment) => ({ text: n.text });

export const example: Nodes = [
  { type: "p", children: [{ text: "Hello" }] },
  { type: "p", children: [{ text: "Hello" }, { text: "World" }] },
  {
    type: "p",
    children: [{ type: "h1", children: [{ text: "This is" }, { text: "very" }] }],
  },
];

console.log(JSON.stringify(example));
console.log(JSON.stringify(removeNode(example, [2, 0, 0])));

// const calculatePaths = (nodes = [], prev) => {
//   return nodes.map((n, i) => {
//     const path = prev ? `${prev}.${i}` : `${i}`;
//     if (n.children) {
//       return [path, calculatePaths(n.children, path)];
//     }
//     return path;
//   });
// };

// const expected = [
//   ["0", ["0.0"]],
//   ["1", ["1.0", "1.1"]],
//   ["2", [["2.0", ["2.0.0", "2.0.1"]]]]
// ];

// const removeNode = (self, path = []) => {
//   const [i, ...rest] = path;

//   return rest.length
//     ? Utils.Arr.replace(self, i, {
//         ...self[i],
//         children: removeNode(self[i].children, rest)
//       })
//     : Utils.Arr.remove(self, i);
// };
