import { useState } from "react";

import ContentEditable from "../../lib/react/Editable";

import "./styles.css";

export default (props) => {
  const [selection, setSelection] = useState<Selection>();

  // const input = (ch) => ch.length === 1 && setContent(content + ch);
  // const backspace = () => setContent(content.slice(0, -1));

  const onSelectionChange = (sel: Selection) => {
    // console.log("Selection changed", sel);
    setSelection(sel);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (selection) {
      const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
      selection.setBaseAndExtent(anchorNode!, anchorOffset, focusNode!, focusOffset);
    }

    switch (e.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown": // Do something for "down arrow" key press.
        break;

      case "Up": // IE/Edge specific value
      case "ArrowUp": // Do something for "up arrow" key press.
        break;

      case "Left": // IE/Edge specific value
      case "ArrowLeft": // Do something for "left arrow" key press.
        break;

      case "Right": // IE/Edge specific value
      case "ArrowRight": // Do something for "right arrow" key press.
        break;

      case "Enter": // Do something for "enter" or "return" key press.
        break;

      case "Esc": // IE/Edge specific value
      case "Escape": // Do something for "esc" key press.
        break;

      default:
      // input(e.key);
    }
  };

  return (
    <div className="Editor">
      <ContentEditable onKeyDown={() => {}} onSelectionChange={onSelectionChange} editor={props.editor} value={props.doc.nodes} />
    </div>
  );
};
