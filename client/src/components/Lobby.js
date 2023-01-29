import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../store/user-context";
import { socket } from "../socket/Socket";
import "./Lobby.css";
import Button from "../shared/components/Button";

const Lobby = () => {
  const navigate = useNavigate();
  const { setFullName, setNickName, role } = useContext(UserContext);
  const [nick, setNick] = useState("");
  const [name, setName] = useState("");
  const handleClick = () => {
    setNickName(nick);
    setFullName(name);
    socket.emit("signed");
    console.log("asdasd");
    if (role === "draw") {
      navigate("/mode", { replace: true });
    } else {
      navigate("/main", { replace: true });
    }
  };
  return (
    <div className="lobby">
      <h1>Choose code block</h1>
      <div className="links-group">
        <Link to="/code-block/if-else">if else</Link>
        <Link to="/code-block/for">for</Link>
        <Link to="/code-block/async">async</Link>
        <Link to="/code-block/function">function</Link>
      </div>

      {/* <Button disabled={!(nick && name)}>Lets Play!</Button> */}
    </div>
  );
};

export default Lobby;
