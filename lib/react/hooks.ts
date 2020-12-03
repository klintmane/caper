import { useState, useEffect } from "react";
import { Editor } from "../editor";

export const useEditor = (e: Editor) => {
  console.log("EDITOR", e);

  const [value, setValue] = useState(e.doc.toJSON());

  useEffect(() => {
    const update = () => setValue(e.doc.toJSON());

    e.doc.on("update", update);
    return () => {
      e.doc.off("update", update);
    };
  }, []);

  return value;
};
