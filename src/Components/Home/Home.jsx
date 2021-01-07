import React from "react";
import "./Home.scss";

let getStarted = () => {};
function Home() {
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
