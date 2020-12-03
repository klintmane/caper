import { Map, Array } from "yjs";

export type Path = number[];

export type NodeT = ElemT | TextT;
export type NodesT = Array<NodeT>;

export type TextT = Map<string>;
export type ElemT = Map<string | NodesT>;
