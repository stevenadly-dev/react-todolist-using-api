import "./App.scss";
import { useState, createContext, useEffect } from "react";
// components
import Home from "./Components/Home/Home.jsx";
import HeaderComponent from "../src/Components/Shared/HeaderComponent/HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Shared/Footer/Footer";
import Login from "./Components/Auth/Login/Login";
import Registeration from "./Components/Auth/Registeration/Registeration";
import TodoList from "./Components/TodoList/TodoList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import IsAuthunticatedRoute from "./Components/IsAuthunticatedRoute";
import * as authservice from "./Services/AuthService";

export let userTokenContext = createContext();
function App() {
  const [userToken, setUserToken] = useState("");

  let getTokenFromLocalStorage = () => {
    if (authservice.checkAuthentication())
      setUserToken(JSON.parse(localStorage.getItem("todoToken")));
  };

  useEffect(() => {
    getTokenFromLocalStorage();
  }, []);
  return (
    <div className="">
      <Router>
        <HeaderComponent userToken={userToken} setUserToken={setUserToken} />

        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/login" exact>
            <userTokenContext.Provider value={userToken}>
              <IsAuthunticatedRoute
                component={Login}
                userToken={userToken}
                setUserToken={setUserToken}
              />
            </userTokenContext.Provider>
          </Route>

          <Route exact path="/register" exact component={Registeration} />

          <ProtectedRoute
            exact
            path="/todolist"
            component={TodoList}
            userToken={userToken}
          ></ProtectedRoute>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
