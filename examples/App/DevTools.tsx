import JSONTree from "react-json-tree";

export default (props) => {
  return (
    <div className="DevTools">
      <JSONTree shouldExpandNode={() => true} data={props.editor} style={{ padding: "2rem" }} />
    </div>
  );
};
