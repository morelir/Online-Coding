import React,{ Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Lobby from "./components/Lobby";
import Header from "./components/Header";
import CodeBlock from "./components/CodeBlock";
import UserContext from "./store/user-context";
import Waiting from "./components/Waiting";
import LoadingSpinner from "./shared/components/LoadingSpinner";


function App() {
  const { role } = useContext(UserContext);

  let routes;
  if (role === "student") {
    routes = (
      <Routes>
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/code-block/:block" element={<CodeBlock />} />
        <Route path="*" element={<Navigate to="/waiting" replace />} />
      </Routes>
    );
  } else if (role === "mentor") {
    routes = (
      <Routes>
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/code-block/:block" element={<CodeBlock />} />
        <Route path="*" element={<Navigate to="/lobby" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="*" element={<LoadingSpinner asOverlay />} />
      </Routes>
    );
  }

  return (
    <Router>
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner asOverlay/>
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
