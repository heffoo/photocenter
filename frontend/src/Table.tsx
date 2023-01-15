import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { columnsType } from "./consts";
import { TableType } from "./types";
import { createTableRow, getTableData, updateTableData } from "./api/api";
import { refresh } from "./utils/refresh";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: TableType;
  index: number;
  children: React.ReactNode;
}

interface TableProps {
  activeTab: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Введите ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App = ({ activeTab }: TableProps) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<TableType[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [currentTableData, setCurrentTableData] = useState([]);

  const getTable = useCallback(async () => {
    const resp = await getTableData(activeTab);
    setCurrentTableData(await resp.json());
  }, [activeTab]);

  useEffect(() => {
    getTable();
  }, [activeTab, getTable]);

  const isEditing = (record: TableType) => record.id === editingKey;

  const edit = (record: TableType) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const create = () => {
    createTableRow(activeTab);
    refresh();
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TableType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        updateTableData(activeTab, row, item.id);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.warn("Validate Failed:", errInfo);
    }
  };

  useEffect(() => {
    setData(currentTableData);
  }, [currentTableData]);

  const columns = [
    ...columnsType(activeTab),
    {
      title: "Операции",
      dataIndex: "operation",
      render: (_: string, record: TableType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Сохранить
            </Typography.Link>
            <Popconfirm title="Вы точно хотите отменить?" onConfirm={cancel}>
              <Typography.Link>Отменить</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Редактировать
            </Typography.Link>
            {/* <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Удалить
          </Typography.Link> */}
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    //@ts-ignore
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TableType) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        locale={{
          emptyText: "Нет данных",
        }}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
      <Button onClick={create}>Создать</Button>
    </Form>
  );
};

export default App;
