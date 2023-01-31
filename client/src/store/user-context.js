import React, { useState, useEffect } from "react";
import { socket } from "../socket/Socket";

const UserContext = React.createContext({
  role: "",
  setRole: (text) => {},
  codeBlock: "",
  setCodeBlock: (text) => {},
  currentCode: null,
  setCurrentCode: ({}) => {},
});

export const UserContextProvider = (props) => {
  const [role, setRole] = useState("");//client type: mentor or student
  const [codeBlock, setCodeBlock] = useState(""); // type of the code block (e.g., if-else, for)
  const [currentCode, setCurrentCode] = useState(null);// type of the code block (e.g., if-else, for)

  useEffect(() => {
    socket.on("role", (data) => {
      setRole(data.role);
    });
    socket.on("block-picked", (block) => {
      setCodeBlock(block);
    });
    socket.on("coding", (code) => {
      setCurrentCode(code);
    });

  }, []);

  const contextValue = {
    role,
    setRole,
    codeBlock,
    setCodeBlock,
    currentCode,
    setCurrentCode,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
