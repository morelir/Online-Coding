import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/user-context";
import "./Waiting.css";

const Waiting = () => { // this component used for student waiting room
  const { codeBlock } = useContext(UserContext);
  const navigation=useNavigate();

  useEffect(()=>{
    if(codeBlock) navigation(`/code-block/${codeBlock}`,{replace:true})
  },[codeBlock])

  return (
    <div className="waiting">
      <p>Waiting For Mentor Pick...</p>
    </div>
  );
};

export default Waiting;
