import { useState } from "react";

import { Editor } from "../../lib/editor";
import Tabs from "./Tabs";
import "./styles.css";

export default (props: { doc: any; editor: Editor }) => {
  const { doc, editor } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className={open ? `dev open` : `dev`}>
      <i class="material-icons toggle" onClick={() => setOpen(!open)}>
        {open ? "close" : "api"}
      </i>
      {open ? <Tabs state={doc} history={editor.history} /> : null}
    </div>
  );
};
