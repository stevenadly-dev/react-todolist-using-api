import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Registeration.scss";
import * as authservices from "../../../Services/AuthService";
import { useHistory } from "react-router-dom";
function Registeration() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
  });
  const history = useHistory();

  let inputOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  let onSubmit = (e) => {
    e.preventDefault();
    authservices.registeration(user).then((res) => {
      setUser({
        name: "",
        email: "",
        password: "",
        age: 0,
      });
      console.log(res);
      history.push("/login");
    });
  };
  return (
    <section className="login-section">
      <div className="container main-form-container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="form-contianer">
              <h3 className="title">registeration</h3>
              <form action="" className="form" onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Name</label>

                  <input
                    type="text"
                    name="name"
                    id=""
                    className="form-control"
                    placeholder=""
                    value={user.name}
                    onChange={inputOnChange}
                  />
                </div>

                <div className="form-group">
                  <label>E-mail</label>
                  <input
                    type="text"
                    name="email"
                    id=""
                    className="form-control"
                    placeholder=""
                    value={user.email}
                    onChange={inputOnChange}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    id=""
                    className="form-control"
                    placeholder=""
                    value={user.password}
                    onChange={inputOnChange}
                  />
                </div>

                {/* <!-- age --> */}
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    id=""
                    className="form-control"
                    placeholder=""
                    value={user.age}
                    onChange={inputOnChange}
                  />
                </div>

                <Link to="/login" className="reg-link">
                  I already have account
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
  );
}

export default Registeration;
