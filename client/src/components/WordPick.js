import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../shared/components/Button";
import UserContext from "../store/user-context";

const WordPick = () => {
  const { words, setWord } = useContext(UserContext);
  const mode = useParams().mode;
  const navigation = useNavigate();

  const handleClick = (word) => {
    setWord(word);
    navigation("/main", { replace: true });
  };

  return (
    <>
      <p className="title">Choose a Word to Draw :</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        {words.map((word) => (
          <Button
            className={mode}
            key={word}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => handleClick(word)}
          >
            {word}
          </Button>
        ))}
      </div>
    </>
  );
};

export default WordPick;
