import React from "react";
import { Redirect } from "react-router-dom";

const IsAuthunticatedRoute = (props) => {
  const Component = props.component;
  let isAuthenticated = false;
  if (
    localStorage.getItem("todoToken") === null ||
    localStorage.getItem("todoToken") === ""
  ) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }

  return isAuthenticated ? (
    <Redirect to={{ pathname: "/todolist" }} />
  ) : (
    <Component {...props} />
  );
};

export default IsAuthunticatedRoute;
