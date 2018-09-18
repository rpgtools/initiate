import 'babel-polyfill'; //https://github.com/babel/babel/issues/5085#issuecomment-343375381
import React, { Component } from "react";
import Initiative from "./components/Initiative";
import "./styles/index.scss";
import ReactModal from 'react-modal';
import ModalManager from './components/reusable/Modals/ModalManager';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <ModalManager />
        <main className="main">
          <Initiative />
        </main>
      </div>
    );
  }
}

ReactModal.setAppElement('#root');

export default App;
