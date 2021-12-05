import "./App.scss";
import { useState, createContext, useEffect, Suspense, lazy } from "react";
// components
import Home from "./Components/Home/Home.jsx";
import HeaderComponent from "../src/Components/Shared/HeaderComponent/HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Shared/Footer/Footer";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import IsAuthunticatedRoute from "./Components/IsAuthunticatedRoute";
import * as authservice from "./Services/AuthService";
import { createMemorySource, createHistory } from "@reach/router";
import { PersistGate } from "redux-persist/integration/react";

// ==========================Redux
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import Loader from "./Components/Shared/Loader/Loader";

let history = createHistory(window);

// ===================pages
const Login = lazy(() => import("./Components/Auth/Login/Login"));
const Registeration = lazy(() =>
  import("./Components/Auth/Registeration/Registeration")
);
const TodoList = lazy(() => import("./Components/TodoList/TodoList"));
const TodoPage = lazy(() => import("./Components/TodoList/TodoPage/TodoPage"));

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="">
          <BrowserRouter forceRefresh={true}>
            <Suspense fallback={<div>Loading...</div>}>
              <HeaderComponent
              // userToken={userToken}
              // setUserToken={setUserToken}
              />

              <Switch>
                <Route exact path="/" exact component={Home} />
                <Route exact path="/login" exact>
                  <Login></Login>
                  {/* <userTokenContext.Provider value={userToken}>
                  <IsAuthunticatedRoute
                    component={Login}
                    userToken={userToken}
                    setUserToken={setUserToken}
                  />
                </userTokenContext.Provider> */}
                </Route>

                <Route exact path="/register" exact component={Registeration} />

                <ProtectedRoute
                  exact
                  path="/todolist"
                  component={TodoList}
                  userToken={userToken}
                ></ProtectedRoute>

                <ProtectedRoute
                  exact
                  path="/todolist/:todoId"
                  component={TodoPage}
                  userToken={userToken}
                ></ProtectedRoute>
              </Switch>

              <Footer />
            </Suspense>
          </BrowserRouter>
        </div>
        {/* <Loader></Loader> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
