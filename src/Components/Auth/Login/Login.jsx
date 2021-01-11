import React, { useState, useContext } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import * as authservices from "../../../Services/AuthService";
import { userTokenContext } from "../../../App";
import { useHistory } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";
import Field from '../../Shared/Field/Field';
import { useFormik, withFormik, Formik } from 'formik';
// import { Formik } from 'formik';




const Login = (props) => {

  const [isLoading, setisLoading] = useState(false);
  const history = useHistory();
  let fields = [
    { type: 'text', label: 'E-mail', name: "email", id: "", className: "form-control", placeholder: "example : demo@demo.com" },
    { type: 'password', label: 'Password', name: "password", id: "", className: "form-control", placeholder: "enter your password" },
  ]

  // ================================================================================


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },

    validate: values => {
      const errors = {};
      Object.keys(values).map(v => {
        if (!values[v]) {
          errors[v] = 'required'
        }
      })


      if (values.email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
      }

      if (values.password) {
        if (values.password.length < 8) {
          errors.password = 'should be at least 8 charcters';
        }
      }
      return errors;
    },

    onSubmit: values => {
      setisLoading(true);
      authservices.login(values).then((res) => {
        setisLoading(false);
        localStorage.setItem("todoToken", JSON.stringify(res.token));
        props.setUserToken(res.token);
        history.push("/todolist");

      });
    },
    handleSubmit: (values, { resetForm, setErrors, setStatus, setSubmitting, setisLoading, setUser, history }) => {
      debugger
    }
  });

  // ================================================================================



  return (
    <>
      <section className="login-section">
        <div className="container main-form-container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="form-contianer">
                {isLoading && <Loader />}
                <h3 className="title">login</h3>

                <form className="form"
                  // onSubmit={onSubmitForm}
                  onSubmit={formik.handleSubmit}
                >

                  {fields && fields.map((field, fieldIndex) => {
                    return (
                      <Field {...field}
                        key={fieldIndex}
                        // field name (email , password)
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched[field.name]}
                        errors={formik.errors[field.name]}

                      />
                    )
                  })}


                  {/* <div className="form-group">
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
                  </div> */}

                  <Link to="/register" className="reg-link">
                    register new account
                  </Link>

                  <button
                    className="submit"
                    value="submit"
                    type="submit"
                    className="submit-btn"
                    disabled={!(formik.isValid && formik.dirty)}
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

export default (Login);
