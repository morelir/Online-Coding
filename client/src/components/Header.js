import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../store/user-context";
import "./Header.css";

const Header = () => {
  const { role } = useContext(UserContext);
  return (
    <header className="main-header">
      <div className="title">
        <Link to="/">
          <h4>Online Coding</h4>
        </Link>
      </div>
      {role && (
        <div className="user">
          <span>Hello {role.charAt(0).toUpperCase() + role.slice(1)}</span>
        </div>
      )}
    </header>
  );
};

export default Header;
