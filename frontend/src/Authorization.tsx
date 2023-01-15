import React from "react";

export const Authorization = ({setLogin, saveUser}: any) => {

  return (
    <div>
      Authorization screen
      <div>
        <label>Enter your name: </label>
        <input
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div>
        <button onClick={saveUser}>Войти</button>
      </div>
    </div>
  );
};
