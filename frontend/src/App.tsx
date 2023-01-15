import React, { useState, useCallback } from "react";
import { Tabs } from "antd";
import "./App.css";
import { tabsItems } from "./consts";
import { Authorization } from "./Authorization";
import Table from "./Table";
import { refresh } from "./utils/refresh";

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem("consumerusername") || ""
  );
  const [activeTab, setActiveTab] = useState<string>(
    localStorage.getItem("activeTab") || "tasks"
  );

  const saveUser = useCallback(() => {
    localStorage.setItem("consumerusername", login);
    refresh();
  }, [login]);

  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div className="App">
      {login ? (
        <>
          <Tabs
            defaultActiveKey={activeTab}
            items={tabsItems}
            onChange={changeActiveTab}
          />
          <Table activeTab={activeTab} />
        </>
      ) : (
        <Authorization setLogin={setLogin} saveUser={saveUser} />
      )}
    </div>
  );
}

export default App;
