import React from "react";
import "./HeaderComponent.scss";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import * as authservice from "../../../Services/AuthService";
import { useHistory, Link } from "react-router-dom";
import { logoutAction } from "../../../Redux/auth/authActions";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    authToken: state.auth.authToken,
  };
};
let mapDispatchToProps = (dispatch) => {
  return { logoutFn: (uToken) => dispatch(logoutAction(uToken)) };
};

function HeaderComponent({ authToken, logoutFn }) {
  // console.log("props of Header ", props);

  const history = useHistory();

  const onLogoutHandler = (e) => {
    e.preventDefault();
    // console.log("props of Header ", props);

    // authservice.logout(userToken).then((res) => {
    //   console.log("logout res", res);
    //   localStorage.removeItem("todoToken");
    //   setUserToken("");
    //   history.push("/login");
    // });
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

                {!authToken && (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                )}
                {!authToken && (
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Registeration
                    </Link>
                  </li>
                )}
                {authToken && (
                  <li className="nav-item">
                    <Link to="/todolist" className="nav-link">
                      todolist
                    </Link>
                  </li>
                )}

                {authToken && (
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => logoutFn(authToken)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
