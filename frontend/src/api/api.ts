const login = localStorage.getItem("consumerusername") || "";

export const getTableData = async (key: string) => {
  const resp = await fetch(`http://localhost:3000/${key}`, {
    headers: {
      consumerusername: login,
    },
  });
  return resp
};

export const updateTableData = async (key: string, data: any) => {
  console.log(key, data)
  const resp = await fetch(`http://localhost:3000/${key}/${data.id}`, {
    method: "PATCH",
    headers: {
      consumerusername: login,
    },
    body: data,
  });
  return resp
};
