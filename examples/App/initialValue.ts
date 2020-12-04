import { create } from "../../lib/editor";

export default [
  create.elem({ type: "p" }, create.text({ text: "Hello" })),
  create.elem({ type: "p" }, create.text({ text: "Hello" }), create.text({ text: "World" })),
  create.elem({ type: "p" }, create.elem({ type: "h1" }, create.text({ text: "This is" }), create.text({ text: "very" }))),
];
