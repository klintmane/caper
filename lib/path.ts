import { Path } from "./types";

export const parent = (p: Path) => p.slice(0, -1);
export const index = (p: Path) => p[p.length - 1];

export const parse = (p: string) => p.split(".");
export const serialize = (p: Path) => p.join(".");
export const equal = (p1: Path, p2: Path) => serialize(p1) == serialize(p2);
