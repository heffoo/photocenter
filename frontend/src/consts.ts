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

export const columnsType = (key: string) => {
  switch (key) {
    case "employees":
      return [
        {
          title: "Имя",
          dataIndex: "firstname",
          key: "firstname",
          editable: true,
        },
        {
          title: "Фамилия",
          dataIndex: "lastname",
          key: "lastname",
          editable: true,
        },
        {
          title: "Имя пользователя",
          dataIndex: "username",
          key: "username",
          editable: true,
        },
        {
          title: "Должность",
          dataIndex: ["position", "title"],
          key: "positionTitle",
          editable: true,
        },
      ];
    case "tasks":
      return [
        {
          title: "Задача",
          dataIndex: "title",
          key: "title",
          editable: true,
        },
        {
          title: "Статус",
          dataIndex: "status",
          key: "status",
          editable: true,
        },
        {
          title: "Пользователь",
          dataIndex: ["executor", "username"],
          key: "executorUserName",
          editable: true,
        },
      ];
    case "positions":
      return [
        {
          title: "Название",
          dataIndex: "title",
          key: "title",
          editable: true,
        },
        {
          title: "Описание",
          dataIndex: "description",
          key: "description",
          editable: true,
        },
      ];
    case "equipment":
      return [
        {
          title: "Название",
          dataIndex: "title",
          key: "title",
          editable: true,
        },
        {
          title: "Описание",
          dataIndex: "description",
          key: "description",
          editable: true,
        },
      ];
    default:
      return [];
  }
};
