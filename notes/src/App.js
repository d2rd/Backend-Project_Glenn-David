import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import logo from './assets/D2rdroid2.png';  //move to ./assets folder
import './App.css';
import Notes from './components/notes/Notes'
import NoteForm from './components/notes/NOT-USED/NoteForm';

// from Reactstrap - 06-Buttons and onClick

class App extends Component {
  constructor(props) {  //constructor initializes the default state.
    super(props);
    this.state = {
      notes: []
    }
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         <h1 className="App-title">d2rd Notes</h1>
        </header>
        <Notes  />
      </div>
    );
  }
}

export default App;
