const login = localStorage.getItem("consumerusername") || "";

export const getTableData = async (key: string) => {
  const resp = await fetch(`http://localhost:3000/${key}`, {
    headers: {
      consumerusername: login,
    },
  });
  return resp
};

export const updateTableData = async (key: string, data: any, id: string) => {
  console.log(key, data)
  const resp = await fetch(`http://localhost:3000/${key}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      consumerusername: login,
    },
    body: JSON.stringify(data),
  });
  return resp
};
