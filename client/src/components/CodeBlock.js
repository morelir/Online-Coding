import React, { useEffect, useRef, useState } from "react";
// import Highlight from "react-highlight";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import hljs from "highlight.js";
// import 'highlight.js/styles/github.css';

import "./CodeBlock.css";
import { useParams } from "react-router-dom";

const html = hljs.highlightAuto("<h1>Hello World!</h1>").value;

const CodeBlock = () => {

  const [code, setCode] = useState();
  const [codeSolution, setCodeSolution] = useState();
  const codeRef = useRef();
  const codeSolRef = useRef();
  const blockType = useParams().block;

  const codeChangeHandler = (e) => {
    const currentCode = e.target.value;
    setCode(currentCode);
    console.log(currentCode === codeSolution ? true : false);
  };

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/code-block/${blockType}`
        );
        let data = await res.json();
        console.log(data)
        setCode(data.defaultCode)
        setCodeSolution(data.solution)
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, [code]);

  useEffect(() => {
    hljs.highlightBlock(codeSolRef.current);
  }, []);

  return (
    <div className="code-block">
      <h4>IF ELSE</h4>
      <div className="editable-codeContainer">
        <textarea
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
      <h4>Code Solution</h4>
      <pre>
        <code ref={codeSolRef} className="language-javascript">
          {codeSolution}
        </code>
      </pre>
    </div>
  );
};

{
  /* <SyntaxHighlighter  style={docco} language="javascript">
        {code}
        <textarea
          className="code"
          rows="5"
          cols="100"
          value={code}
          onChange={codeChangeHandler}
        />
      </SyntaxHighlighter> */
}
{
  /* 
   <div
        className="code"
        suppressContentEditableWarning
        contentEditable
        onKeyDown={handleKeyDown}
      >
      <pre>
          <code ref={code} >{string}</code>
      </pre> 
</div>*/
}

export default CodeBlock;
