import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../shared/components/Button";
import { socket } from "../socket/Socket";
import UserContext from "../store/user-context";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import WarningIcon from "@mui/icons-material/Warning";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import "./Mode.css";
import WordPick from "./WordPick";

const Mode = () => {
  const navigation = useNavigate();
  const { mode, setModePicked, setWords, score, setMode } =
    useContext(UserContext);

  useEffect(() => {
    mode &&
      (async () => {
        try {
          let res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/words/${mode}`
          );
          let data = await res.json();
          socket.emit("mode picked", score);
          setModePicked(true);
          setWords(data);
          navigation(`${mode}`);
        } catch (error) {
          throw error;
        }
      })();
  }, [mode]);

  return (
    <div className="mode-pick">
      <p className="title">Pick Your Game Level :</p>

      <p className="info">
        Easy Mode Win - 1 Point <br />
        Medium Mode Win - 3 Points <br />
        Hard Mode Win - 5 Points
      </p>
      <div className="level-buttons">
        <Button
          className="easy"
          style={{ marginTop: "10px" }}
          size="large"
          startIcon={<ChildFriendlyIcon />}
          variant="contained"
          color="primary"
          onClick={(e) => {
            setMode("easy");
          }}
        >
          Easy
        </Button>
        <Button
          className="medium"
          style={{ marginTop: "10px" }}
          size="large"
          variant="contained"
          startIcon={<SentimentSatisfiedOutlinedIcon />}
          color="primary"
          onClick={(e) => {
            setMode("medium");
          }}
        >
          Medium
        </Button>
        <Button
          className="hard"
          style={{ marginTop: "10px" }}
          size="large"
          startIcon={<WarningIcon />}
          variant="contained"
          color="primary"
          onClick={(e) => {
            setMode("hard");
          }}
        >
          Hard
        </Button>
      </div>

      <Outlet />
    </div>
  );
};

export default Mode;
