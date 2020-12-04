import { useState } from "react";

import State from "./State";
import History from "./History";

const Switcher = (props: { tabs: string[]; children: any }) => {
  const { children, tabs = [] } = props;
  const [active, setActive] = useState(0);
  const _tabs = [...Array(children.length)].map((_, i) => tabs[i] || i);

  return (
    <>
      <ul className="dev-nav">
        {_tabs.map((t, i) => (
          <li className={active == i ? "active" : ""} onClick={() => setActive(i)}>
            {t}
          </li>
        ))}
      </ul>
      <div className="dev-content">{children[active]}</div>
    </>
  );
};

export default (props: any) => {
  return (
    <Switcher tabs={["State", "History"]}>
      <State {...props} />
      <History {...props} />
    </Switcher>
  );
};
