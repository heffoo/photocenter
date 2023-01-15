import type { TabsProps } from "antd";

export const tabsItems: TabsProps["items"] = [
    {
      key: "tasks",
      label: `Задачи`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: "employees",
      label: `Сотрудники`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "positions",
      label: `Роли`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: "equipment",
      label: `Оборудование`,
      children: `Content of Tab Pane 3`,
    },
  ];