import React, { useState, useCallback } from "react";
import {  Tabs } from "antd";
import "./App.css";
import { tabsItems } from "./consts";
import { Authorization } from "./Authorization";
import Table from "./Table";

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem("consumerusername") || ""
  );
  const [activeTab, setActiveTab] = useState<string>("tasks");

  const saveUser = useCallback(() => {
    localStorage.setItem("consumerusername", login);
    window.location.reload();
  }, [login]);

  return (
    <div className="App">
      {login ? (
        <>
          <Tabs
            defaultActiveKey="1"
            items={tabsItems}
            onChange={setActiveTab}
          />
          <Table activeTab={activeTab}/>
        </>
      ) : (
        <Authorization setLogin={setLogin} saveUser={saveUser} />
      )}
    </div>
  );
}

export default App;
