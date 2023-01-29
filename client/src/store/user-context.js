import React, { useState, useEffect } from "react";
import { socket } from "../socket/Socket";

const UserContext = React.createContext({
  fullName: "",
  setFullName: (text) => {},
  nickName: "",
  setNickName: (text) => {},
  role: "",
  words: [],
  setWords: ([]) => {},
  word: [],
  setWord: ([]) => {},
  mode: "",
  setMode: (text) => {},
  modePicked: false,
  setModePicked: (boolean) => {},
  gameStatus: false,
  score: 0,
  setScore: (number) => {},
});

export const UserContextProvider = (props) => {
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [role, setRole] = useState("");
  const [words, setWords] = useState([]);
  const [word, setWord] = useState([]);
  const [mode, setMode] = useState("");
  const [modePicked, setModePicked] = useState(false);
  const [gameStatus, setGameStatus] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    socket.on("role", (data) => {
      setRole(data.role);
    });
    socket.on("game full", () => {
      setGameStatus(true);
    });
    socket.on("mode picked", () => {
      setModePicked(true);
    });
  }, []);

  const contextValue = {
    fullName,
    setFullName,
    nickName,
    setNickName,
    role,
    words,
    setWords,
    word,
    setWord,
    mode,
    setMode,
    modePicked,
    setModePicked,
    gameStatus,
    score,
    setScore,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
