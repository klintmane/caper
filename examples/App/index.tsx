import * as Caper from "../../lib/editor";
import { useEditor } from "../../lib/react/hooks";

import Editor from "./Editor";
import DevTools from "./DevTools";

const editor = Caper.create();
Caper.insertNode(editor.nodes, [0], Caper.example);

window.Caper = Caper;
window.editor = editor;

export default () => {
  const value = useEditor(editor);

  return (
    <div className="App">
      <Editor editor={value} />
      <DevTools editor={value} />
    </div>
  );
};
