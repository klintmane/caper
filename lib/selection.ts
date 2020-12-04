import { Pos } from "./types";
import * as putils from "./path";

export const collapsed = (p1: Pos, p2: Pos) => putils.equal(p1.path, p2.path) && p1.offset == p2.offset;
// export const collapse = (p1: Pos, p2: Pos) =>
