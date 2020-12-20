import React from "react";
import logo from "./logo.svg";
import CryptoConverter from "./components/CryptoConverter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CryptoConverter />
      </header>
    </div>
  );
}

export default App;
