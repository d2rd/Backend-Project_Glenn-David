import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './assets/D2rdroid2.png';  //move to ./assets folder
import './App.css';
import Notes from './components/notes/Notes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         <h1 className="App-title">d2rd Notes</h1>
        </header>
        <Notes />
      </div>
    );
  }
}

export default App;
