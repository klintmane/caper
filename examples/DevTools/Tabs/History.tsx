import { Editor } from "../../../lib/editor";

export default (props: { history: Editor["history"] }) => {
  const { history } = props;

  const { undoStack, redoStack } = history;

  const entries = undoStack.concat([], redoStack);

  console.log(undoStack, redoStack);
  return (
    <div>
      <i class="material-icons" onClick={() => history.undo()}>
        undo
      </i>
      <i class="material-icons" onClick={() => history.redo()}>
        redo
      </i>
      {entries.map((e, i) => (
        <div>{i}</div>
      ))}
    </div>
  );
};
