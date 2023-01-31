import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../store/user-context";
import { socket } from "../socket/Socket";
import "./Lobby.css";
import Button from "../shared/components/Button";

const Lobby = () => {
  const {setCodeBlock } = useContext(UserContext);

  const handleClick = (e) => {
    socket.emit('block-picked', e.currentTarget.id);
    setCodeBlock(e.currentTarget.id)
  };

  useEffect(()=>{
    socket.emit('block-picked', '');
    setCodeBlock('')
  },[])

  return (
    <div className="lobby">
      <h1>Choose code block</h1>
      <div className="links-group">
        <Link to="/code-block/if-else" id="if-else" onClick={handleClick}>if else</Link>
        <Link to="/code-block/for" id="for" onClick={handleClick} >for</Link>
        <Link to="/code-block/async" id="async"  onClick={handleClick}>async</Link>
        <Link to="/code-block/function" id="function" onClick={handleClick}>function</Link>
      </div>
    </div>
  );
};

export default Lobby;
