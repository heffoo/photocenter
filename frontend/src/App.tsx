import React, { useState, useEffect, useCallback } from "react";
import {  Tabs } from "antd";
import "./App.css";
import { columnsType, tabsItems } from "./consts";
import { Authorization } from "./Authorization";
import { getTableData } from "./api/api";
import Table from "./Table";

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem("consumerusername") || ""
  );
  const [activeTab, setActiveTab] = useState("tasks");
  const [currentTableData, setCurrentTableData] = useState([]);

  const saveUser = useCallback(() => {
    localStorage.setItem("consumerusername", login);
    window.location.reload();
  }, [login]);

  const getTable = async () => {
    const resp = await getTableData(activeTab);
    setCurrentTableData(await resp.json());
  };

  useEffect(() => {
    getTable();
  }, [activeTab]);

  const dataForRender = () => {
    const arr = columnsType(activeTab);

    return [
      ...arr,
      {
        title: "Редактировать",
        key: "actions",
        render: () => <div></div>,
      },
    ];
  };

  return (
    <div className="App">
      {login ? (
        <>
          <Tabs
            defaultActiveKey="1"
            items={tabsItems}
            onChange={setActiveTab}
          />
          {/* <Table
            columns={dataForRender()}
            dataSource={currentTableData}
            pagination={false}
          /> */}
          {/* @ts-ignore */}
          <Table currentTableData={currentTableData} activeTab={activeTab} />
        </>
      ) : (
        <Authorization setLogin={setLogin} saveUser={saveUser} />
      )}
    </div>
  );
}

export default App;
