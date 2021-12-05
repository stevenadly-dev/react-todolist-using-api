import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

let mapStateToProps = (state) => {
  return {
    authToken: state.auth.authToken,
  };
};

const ProtectedRoute = (props) => {
  let { component, authToken } = props;
  const Component = component;

  return authToken ? (
    <Component {...props} />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default connect(mapStateToProps)(ProtectedRoute);
