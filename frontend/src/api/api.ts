const login = localStorage.getItem("consumerusername") || "";

export const getTableData = async (key: string) => {
  const resp = await fetch(`http://localhost:3000/${key}`, {
    headers: {
      consumerusername: login,
    },
  });
  return resp;
};

export const createTableRow = async (key: string) => {
  const resp = await fetch(`http://localhost:3000/${key}`, {
    method: "POST",
    headers: {
      consumerusername: login,
    },
  });

  return resp;
};

export const updateTableData = async ( key: string, data: any, id: string) => {
  const resp = await fetch(`http://localhost:3000/${key}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      consumerusername: login,
    },
    body: JSON.stringify(data),
  });
  return resp;
};

export const removeTableRow = async (key: string, id: string) => {
  const resp = await fetch(`http://localhost:3000/${key}/${id}`, {
    method: "DELETE",
    headers: {
      consumerusername: login,
    },
  });
  return resp;
};
