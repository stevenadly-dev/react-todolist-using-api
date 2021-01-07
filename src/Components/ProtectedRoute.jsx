import React from "react";
import { Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
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
      <Component {...this.props} />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}

export default ProtectedRoute;
