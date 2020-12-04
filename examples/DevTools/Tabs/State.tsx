import JSONTree from "react-json-tree";

export default (props: { state: any }) => {
  const { state } = props;

  return <JSONTree shouldExpandNode={() => true} data={state} />;
};
