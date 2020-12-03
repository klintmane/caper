import { Map, Array } from "yjs";

export type Text = { text: string };
export type Elem = { type: string; children: Nodes };
export type Node = Elem | Text;
export type Nodes = Node[];

export type TextT = Map<string>;
export type ElemT = Map<string | NodesT>;
export type NodeT = ElemT | TextT;
export type NodesT = Array<NodeT>;
