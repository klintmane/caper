import { JSX, useRef } from "react";
import { Node, NodeFrag } from "../om";
import { useEvent } from "../utils";
import { beforeInputEnabled, beforeInputPolyfill } from "../compat";
import "./styles.css";

const noop = (e: any) => e.preventDefault();

type Props = JSX.HTMLAttributes<HTMLDivElement> & { value: any; onKeyDown: Function; onSelectionChange: Function };
export default (props: Props) => {
  const { value, onKeyDown, onSelectionChange } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEvent("selectionchange", () => {
    const sel = document.getSelection();
    const { anchorNode, anchorOffset, focusNode, focusOffset } = sel || {};
    const anchorPath = anchorNode?.parentElement?.getAttribute("id"); // http://help.dottoro.com/ljkstboe.php (on most cases anchor/focus nodes are text. Other cases they're not - handle those)
    const focusPath = focusNode?.parentElement?.getAttribute("id");
    onSelectionChange({ anchorPath, anchorOffset, focusPath, focusOffset });
  });

  // Check Slate's polyfilling at https://github.com/ianstormtaylor/slate/blob/main/packages/slate-react/src/components/editable.tsx
  useEvent(
    "beforeinput",
    (e: Event & { inputType?: string }) => {
      if (true) {
        // const { selection } = editor
        const { inputType: type } = e;
        // const data = event.dataTransfer || event.data || undefined

        // These two types occur while a user is composing text and can't be
        // cancelled. Let them through and wait for the composition to end.
        if (type === "insertCompositionText" || type === "deleteCompositionText") {
          return;
        }

        e.preventDefault();

        switch (type) {
          case "deleteByComposition":
          case "deleteByCut":
          case "deleteByDrag":
            // Editor.deleteFragment(editor)
            break;

          case "deleteContent":
          case "deleteContentForward":
            // Editor.deleteForward(editor)
            break;

          case "deleteContentBackward":
            // Editor.deleteBackward(editor)
            break;

          case "deleteEntireSoftLine":
            // Editor.deleteBackward(editor, { unit: 'line' })
            // Editor.deleteForward(editor, { unit: 'line' })
            break;

          case "deleteHardLineBackward":
            // Editor.deleteBackward(editor, { unit: 'block' })
            break;

          case "deleteSoftLineBackward":
            // Editor.deleteBackward(editor, { unit: 'line' })
            break;

          case "deleteHardLineForward":
            // Editor.deleteForward(editor, { unit: 'block' })
            break;

          case "deleteSoftLineForward":
            // Editor.deleteForward(editor, { unit: 'line' })
            break;

          case "deleteWordBackward":
            // Editor.deleteBackward(editor, { unit: 'word' })
            break;

          case "deleteWordForward":
            // Editor.deleteForward(editor, { unit: 'word' })
            break;

          case "insertLineBreak":
          case "insertParagraph":
            // Editor.insertBreak(editor)
            break;

          case "insertFromComposition":
          case "insertFromDrop":
          case "insertFromPaste":
          case "insertFromYank":
          case "insertReplacementText":
          case "insertText":
            // if (data instanceof DataTransfer) {
            //   ReactEditor.insertData(editor, data)
            // } else if (typeof data === 'string') {
            //   Editor.insertText(editor, data)
            // }

            break;
        }
      }
    },
    ref.current as EventTarget
  );

  // 'onPaste', 'onDrop', 'onKeyPress',

  const { autoCorrect, autoComplete, spellcheck } = props;

  const wBI = beforeInputEnabled({ autoCorrect, autoComplete, spellcheck }, {});
  const woBI = beforeInputEnabled({}, {}); // {}, {} -> props we want when BI missing

  return (
    <div
      ref={ref}
      className="ContentEditable"
      {...wBI}
      {...woBI}
      // suppressContentEditableWarning
      contentEditable
      onKeyPress={beforeInputPolyfill((e) => e.key)}

      // onBeforeInput={(e) => {
      //   console.log(e.data);
      //   e.preventDefault();
      // }}
      // Imports
      // onPaste={noop}
      // onDragOver={noop}
      // // Exports
      // onCut={noop}
      // onCopy={noop}
      // onDragStart={noop}
      // onDrop={noop}
      // // Focus
      // onBlur={noop}
      // onFocus={noop}
      // onBeforeInput={noop}
      // onKeyDown={(e) => {
      //   e.preventDefault();
      //   console.log(e.key);
      // }}
      // onKeyDown={(e) => {
      //   onSelectionChange(document.getSelection());
      //   e.preventDefault();
      //   onKeyDown(e);
      // }}
    >
      {value.map((n: any, i: number) => renderer(n, i))}
    </div>
  );
};

export const renderer = (node: Node | NodeFrag, i: number, prev: number[] = []) => {
  const path = prev ? prev.concat([i]) : [i];
  const id = path.join(".");

  if (node.hasOwnProperty("type")) {
    const { children = [], type } = node as Node;
    const props = { id, key: id, children: children.map((ch: any, i: number) => renderer(ch, i, path)) };

    switch (type) {
      case "h1":
        return <h1 {...props} />;
      default:
        return <p {...props} />;
    }
  }

  const { text } = node as NodeFrag;
  const props = { id, key: id, children: text };

  return <span {...props} />;
};
