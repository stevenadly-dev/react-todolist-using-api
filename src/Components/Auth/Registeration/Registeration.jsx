import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Registeration.scss";
import * as authservices from "../../../Services/AuthService";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import Field from '../../Shared/Field/Field';
import Loader from '../../Shared/Loader/Loader';
import * as Yup from 'yup';
function Registeration() {


  const [isLoading, setisLoading] = useState(false);
  const history = useHistory();



  let fields = [
    { type: 'text', label: 'Name', name: "name", id: "", className: "form-control", placeholder: "your name :" },
    { type: 'email', label: 'E-mail', name: "email", id: "", className: "form-control", placeholder: "example : demo@demo.com" },
    { type: 'password', label: 'password', name: "password", id: "", className: "form-control", placeholder: "enter your password" },
    { type: 'text', label: 'Age', name: "age", id: "", className: "form-control", placeholder: "enter your age :" },
  ]


  // ================================================================================


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: 0

    },


    validationSchema: Yup.object({
      name: Yup.string().required('required from Yup').min(3, 'minimum length 3 '),
      email: Yup.string().email('Invalid email format').required('required'),
      password: Yup.string().min(8, "Minimum 8 characters").required("Required!")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      age: Yup.number().required('age is required').positive('age must be greater than zero')

    }),
    onSubmit: (values, { resetForm }) => {
      setisLoading(true);
      authservices.registeration(values).then((res) => {
        resetForm();
        console.log(res);
        history.push("/login");
      });
    },
    handleSubmit: (values, { resetForm, setErrors, setStatus, setSubmitting, setisLoading, setUser, history }) => {
      debugger
    }
  });

  return (
    <section className="login-section">
      <div className="container main-form-container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="form-contianer">
              {isLoading && <Loader />}
              <h3 className="title">registeration</h3>
              <form action="" className="form" onSubmit={formik.handleSubmit}>



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

                <Link to="/login" className="reg-link">
                  I already have account
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
  );
}

export default Registeration;
