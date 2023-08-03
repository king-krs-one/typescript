import React, { useEffect, useState, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import PanelMouseTrackerJSX from './Components/MouseTrackerJSX';
import PanelMouseTrackerTSX from './Components/MouseTrackerTSX';
import MyComponentWithLoadingJSX from './Components/LoadingJSX';
import MyComponentWithLoadingTSX from './Components/LoadingTSX';
import LoginComponent from './Components/LoginJSX';
import Calculator, { examples } from './Components/Calculator';
import { GlobalProvider, GlobalContext } from './GlobalContext';


function App() {
  
  const { language, user, token, message, setLanguage } = useContext(GlobalContext)
  
  function toggleLanguage () {
    setLanguage(language === "en" ? "de" : "en")
  }

  return (
    <div className="App">
      {message && <div className={`message alert alert-${message.type}`}>{message.text}</div>}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <section className="section">
          <p>My Language: {language}</p>
          <p>My User: {user?.name}</p>
          <p>My token: {token}</p>
        </section>
        <LoginComponent />
        <MyComponentWithLoadingJSX data="Some data" />
        <MyComponentWithLoadingTSX data="Some data" />
        <PanelMouseTrackerTSX />
        <PanelMouseTrackerJSX />
        <Calculator left={20} right={10} operator='+' />
        <>{examples}</>
        <button onClick={toggleLanguage}>
          Switch Language (Current: {language})
        </button>
      </header>
    </div>
  );
}


export default App;

