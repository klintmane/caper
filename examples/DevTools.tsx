import { useEffect, useReducer } from "react";

import JSONTree from "react-json-tree";

import * as Caper from "../lib/editor";

const editor = Caper.create();
window.Caper = Caper;
window.editor = editor;

export default () => {
  const [current, setCurrent] = useReducer((x, _) => x + 1, 0);

  useEffect(() => {
    const render = () => {
      setCurrent(null);
    };

    editor.doc.on("update", render);
    return () => {
      editor.doc.off("update", render);
    };
  }, []);

  return (
    <div className="DevTools">
      <JSONTree shouldExpandNode={() => true} data={editor.doc.toJSON()} style={{ padding: "2rem" }} />
    </div>
  );
};
