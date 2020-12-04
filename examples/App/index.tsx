import { StrictMode } from "react";
import { render } from "react-dom";

import { init } from "../../lib/editor";
import { useEditor } from "../../lib/react/hooks";
import Editor from "./Editor";
import Dev from "../DevTools";
import initialValue from "./initialValue";

const editor = init(initialValue);

const App = () => {
  const value = useEditor(editor);

  return (
    <div className="App">
      <Editor editor={editor} doc={value} />
      <Dev editor={editor} doc={value} />
    </div>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")!
);
