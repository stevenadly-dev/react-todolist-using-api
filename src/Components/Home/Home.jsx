import React from "react";
import "./Home.scss";
import * as authservices from '../../Services/AuthService';
import { useHistory } from "react-router-dom";


function Home() {


  let history = useHistory();
  let getStarted = () => {
    if (authservices.checkAuthentication()) {
      history.push('/todolist')
    } else {
      history.push('/login')
    }
  };
  return (
    <section className="home">
      <div className="content">
        <h1 className="title">Organize it all with TODO</h1>
        <button onClick={getStarted}>Get Started</button>
      </div>
    </section>
  );
}

export default Home;
