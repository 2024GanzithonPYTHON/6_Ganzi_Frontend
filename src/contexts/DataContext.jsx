import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [firstData, setFirstData] = useState(null); // 처음 생성된 데이터
  const [backendResponse, setBackendResponse] = useState(null); // 백엔드 응답 데이터

  return (
    <DataContext.Provider
      value={{
        firstData,
        setFirstData,
        backendResponse,
        setBackendResponse,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
