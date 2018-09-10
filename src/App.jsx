import React, { Component } from "react";
import Initiative from "./components/Initiative";
import "./styles/index.scss";

class App extends Component {
  render() {
    return (
      <main className="main">
        <Initiative />
      </main>
    );
  }
}

export default App;
