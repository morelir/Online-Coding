import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/components/Button";
import { socket } from "../socket/Socket";
import UserContext from "../store/user-context";
import "./Main.css";

const Main = () => {
  const {
    role,
    nickName,
    word,
    setWord,
    words,
    gameStatus,
    modePicked,
    mode,
    score,
    setScore,
  } = useContext(UserContext);
  const [changeWord, setChangeWord] = useState(false);
  const [guess, setGuess] = useState("");
  const [secondUser, setSecondUser] = useState("");
  const navigation = useNavigate();
  const scoreMap = {
    easy: 1,
    normal: 3,
    hard: 5,
  };

  useEffect(() => {
    // Generate random word
    if (role === "draw" && changeWord) {
      const numberIndex = words.findIndex((currWord) => currWord === word);
      const ind = numberIndex + 1 >= words.length ? 0 : numberIndex + 1;
      const nextWord = words[ind];
      setWord(nextWord);
      socket.emit("clear");
    }
  }, [changeWord]);

  useEffect(() => {
    socket.on("check answer", (data) => {
      if (data.guess === word.toLocaleLowerCase()) {
        socket.emit("right answer", score + scoreMap[mode]);
        setScore(score + scoreMap[mode]);
        setChangeWord((prevState) => !prevState);
        setSecondUser(data.nickName);
      }
    });
    socket.on("end game", () => navigation("/end", { replace: true }));
    return () => {
      socket.off("check answer");
      socket.off("end game");
    };
  }, [word]);

  useEffect(() => {
    socket.on("right answer", (score) => {
      setChangeWord((prevState) => !prevState);
      setScore(score);
    });
    socket.on("mode picked", () => setScore(0));
    return () => {
      socket.off("right answer");
    };
  }, []);

  const handleGuess = () => {
    socket.emit("check answer", { guess: guess.toLocaleLowerCase(), nickName });
  };
  return (
    <div className="main-content">
      {gameStatus && modePicked ? (
        <>
          {role === "draw" ? <h2>Draw - {word}</h2> : ""}
          <h3 style={{ marginBottom: "10px" }}>Score : {score}</h3>
          {/* <Canvas
            user2={secondUser}
            score={score}
            changeWord={changeWord}
            setChangeWord={setChangeWord}
          /> */}
        </>
      ) : (
        <div className="waiting">
          {/* <AccessTimeIcon fontSize="large" /> */}
          <p>Waiting For 2nd Player...</p>
          {/* <AccessTimeIcon fontSize="large" /> */}
        </div>
      )}
      {role === "guess" && gameStatus && modePicked ? (
        <>
          {/* <TextField
            onChange={(e) => setGuess(e.target.value)}
            value={guess}
            id="standard-basic"
            label="Place Your Guess Here !"
          /> */}
          <Button
            onClick={handleGuess}
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
          >
            Submit Your Answer
          </Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
