import React, { useState, useContext } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import * as authservices from "../../../Services/AuthService";
import { userTokenContext } from "../../../App";
import { useHistory } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const Login = ({ userToken, setUserToken }) => {
  let newUser = useContext(userTokenContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const history = useHistory();

  let onchangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    console.log(newUser);
    // console.log("userToken", userToken);
  };

  let onSubmitForm = (e) => {
    e.preventDefault();
    setisLoading(true);
    authservices.login(user).then((res) => {
      setisLoading(false);
      localStorage.setItem("todoToken", JSON.stringify(res.token));
      setUserToken(res.token);

      setUser({
        email: "",
        password: "",
      });
      history.push("/todolist");

      // console.log(res);
    });
  };
  return (
    <>
      <section className="login-section">
        <div className="container main-form-container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="form-contianer">
                {isLoading && <Loader />}
                <h3 className="title">login</h3>

                <form className="form" onSubmit={onSubmitForm}>
                  <div className="form-group">
                    <label>E-mail</label>

                    <input
                      type="text"
                      name="email"
                      id=""
                      className="form-control"
                      placeholder="example : demo@demo.com"
                      value={user.email}
                      onChange={onchangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      id=""
                      className="form-control"
                      placeholder="example : demodemo"
                      value={user.password}
                      onChange={onchangeInput}
                    />
                  </div>

                  <Link to="/register" className="reg-link">
                    register new account
                  </Link>

                  <button
                    className="submit"
                    value="submit"
                    className="submit-btn"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
