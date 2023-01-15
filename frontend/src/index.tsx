import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import ru_RU from 'antd/es/locale/ru_RU';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider locale={ru_RU}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
