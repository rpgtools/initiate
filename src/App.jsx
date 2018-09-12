import React, { Component } from "react";
import Initiative from "./components/Initiative";
import "./styles/index.scss";
import ReactModal from 'react-modal';

class App extends Component {
  render() {
    return (
      <main className="main">
        <Initiative />
      </main>
    );
  }
}

ReactModal.setAppElement('#root');

export default App;
