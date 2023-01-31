import React, { useContext, useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "./CodeBlock.css";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../store/user-context";
import { socket } from "../socket/Socket";
import Smiley from "../shared/components/Smiley";

const CodeBlock = () => {
  const { role, codeBlock, currentCode, setCurrentCode } =
    useContext(UserContext);
  const [title, setTitle] = useState();
  const [code, setCode] = useState();
  const [codeSolution, setCodeSolution] = useState();
  const [correctCode, setCorrectCode] = useState(false);
  const codeRef = useRef();
  const codeSolRef = useRef();
  const blockType = useParams().block;
  const navigation = useNavigate();

  const codeChangeHandler = (e) => {
    //updating the code block and emit through socket
    const currentCode = e.target.value;
    let blockCode = {
      defaultCode: currentCode,
      title: title,
      solution: codeSolution,
    };
    setCurrentCode(blockCode);
    socket.emit("coding", blockCode);
  };

  useEffect(() => {
    //fetching code block from server side
    const fetchData = async () => {
      try {
        let res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/code-block/${blockType}`
        );
        let data = await res.json();
        setCurrentCode(data);
        socket.emit("coding", data);
      } catch (error) {
        throw error;
      }
    };
    if (!currentCode) fetchData();

    return () => {
      socket.emit("clear");
    };
  }, [blockType]);

  useEffect(() => {
    //if there is new context coding data(currentCode) it will update the states
    if (currentCode) {
      setTitle(currentCode.title);
      setCode(currentCode.defaultCode);
      setCodeSolution(currentCode.solution);
    }
  }, [currentCode]);

  useEffect(() => {
    code &&
      setCorrectCode(
        //update state by checking if the code equal to solution code
        code.replace(/\s+/g, "") === codeSolution.replace(/\s+/g, "")
      );
    hljs.highlightBlock(codeRef.current); //highlight the code block
  }, [code]);

  useEffect(() => {
    hljs.highlightBlock(codeSolRef.current); //highlight the solution code block
  }, [codeSolution]);

  useEffect(() => {
    if (!codeBlock) navigation(`/waiting`, { replace: true }); //when mentor go back to lobby,set student in waiting room
  }, [codeBlock]);

  return (
    <div className="code-block">
      <h4 className="title">{title}</h4>
      <div className="editable-codeContainer">
        <textarea
          disabled={role === "mentor" ? true : false}
          className="textArea-code"
          rows="10"
          cols="100"
          value={code}
          onChange={codeChangeHandler}
        />
        <pre>
          <code ref={codeRef} className="language-javascript">
            {code}
          </code>
        </pre>
      </div>
      <div className="second-container">
        <div className="solution-container">
          <h4 className="title">Code Solution</h4>
          <pre>
            <code ref={codeSolRef} className="language-javascript">
              {codeSolution}
            </code>
          </pre>
        </div>
        <div className="smiley-container">{correctCode && <Smiley />}</div>
      </div>
    </div>
  );
};

export default CodeBlock;
