import React, { Component } from 'react';
import './Notes.css';
// import logo from '../src/assets/D2rdroid2.png';  //move to ./assets folder
const url = 'http://localhost:5501/notes'
// const notes = 'http://localhost:5501/notes'

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    fetch(url) // Call the fetch function passing the url of the API as a parameter
      .then(res => res.json())
      .then(notes => this.setState({notes}, () => console.log('Notes fetched...', notes)
        ))
        .catch(error => {
          console.error('Error fetching notes from mLab:', error);
        })
  }
  render() {
    return (
      <div>
        <h1>Notes Found</h1>
        <ul>
        {this.state.notes.map(note =>
            <li key={note.id}>
            <div className="Title">
            <h3>{ note.title }</h3><div className="Priority">Priority: {note.priority}</div> 
            </div>
            { note.body }
            <p></p> 
            <a href={ note.urlAddress }>View product</a>  |    
              <a href={ note.reviewURL }> Read review</a>  |    
              <a href={ note.audioFileURL }>  Play audio</a>
            
            </li>  
          )}
        </ul>
      </div>
    );
  }
}

export default Notes;