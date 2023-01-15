import React from "react";
import { Table, Tabs } from "antd";
import "./App.css";
import { tabsItems } from "./consts";

function App() {
  const getTable = (key: string) => {
    // const resp = fetch(`localhost:3000/${key}`);
    // console.log(resp);
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <Tabs defaultActiveKey="1" items={tabsItems} onChange={getTable} />
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </header>
    </div>
  );
}

export default App;
