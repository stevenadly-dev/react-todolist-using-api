import React from "react";
import "./HeaderComponent.scss";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import * as authservice from "../../../Services/AuthService";
import { useHistory, Link } from "react-router-dom";

function HeaderComponent({ userToken, setUserToken }) {
  const history = useHistory();

  const onLogoutHandler = (e) => {
    e.preventDefault();
    authservice.logout(userToken).then((res) => {
      console.log("logout res", res);
      localStorage.removeItem("todoToken");
      setUserToken('');
      history.push("/login");
    });
  };
  return (
    <>
      <Navbar expand="lg">
        <div className="container">
          <Navbar.Brand className="navbar-brand" href="#home">
            TODO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-ul-margin">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                {!authservice.checkAuthentication() ||
                  (!userToken && (
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                  ))}
                {!authservice.checkAuthentication() ||
                  (!userToken && (
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">
                        Registeration
                      </Link>
                    </li>
                  ))}
                {authservice.checkAuthentication() && userToken && (
                  <li className="nav-item">
                    <Link to="/todolist" className="nav-link">
                      todolist
                    </Link>
                  </li>
                )}
                {authservice.checkAuthentication() && userToken && (
                  <li className="nav-item">
                    <a className="nav-link" onClick={onLogoutHandler}>
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}

export default HeaderComponent;
