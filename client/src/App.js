import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { socket } from "./socket/Socket";
import "./App.css";
import Lobby from "./components/Lobby";
import Header from "./components/Header";
import Main from "./components/Main";
import Mode from "./components/Mode";
import WordPick from "./components/WordPick";
import CodeBlock from "./components/CodeBlock";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/lobby" element={<Lobby />} />
          {/* <Route path="/choose-word" element={() => <WordChoose />} /> */}
          <Route path="/code-block/:block" element={<CodeBlock/>} /> 
          <Route path="*" element={<Navigate to="/lobby" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
