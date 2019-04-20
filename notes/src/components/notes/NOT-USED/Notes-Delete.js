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
  }//find how to load everything to props ala Frank Faustino video

  removeNote(id) {
    this.setState({notes: this.state.notes.filter(note => note.id !== id)})
  }  //adapted from video https://youtu.be/KItsR6pM5lY

  render() {
    let {id, title, priority, urlAddress,reviewURL,audioFileURL} = this.props.note;
    return (
      <div>
        <div className="View-header">
        <h1>Notes found about Electric Uprights</h1>
        </div>
        <div className="PanelContainer">
          <div className="Nav-panel">
          <div>
              <button className="btn-NavButton" onClick={() => this.props.getNotes}>View All Notes</button>
              {/* <button className="btn-NavButton" onClick={() => { alert("hey david this button works!")}}>View Your Notes</button> */}
            </div>
          <div>
              <button className="btn-NavButton" onClick={() => this.props.showSelectedNote}>View Selected Note</button>
              {/* <button className="btn-NavButton" onClick={() => { alert("hey david")}}>View Your Notes</button> */}
            </div>
            <div>
              <button className="btn-NavButton" onClick={() => this.props.searchNotes}>Search Notes</button>
            </div>
            <div>
              <button className="btn-NavButton" onClick={() => this.props.createNote}>Create New Note</button>
            </div>
            <div>
              <button className="btn-NavButton" onClick={() => this.props.deleteNote}>Delete a Note</button>
            </div>
          
          </div>
          <div className="Notes-panel">
            <ul>
            {this.state.notes.map(note =>
                <li key={note.id}>
                <div className="Title">
                <h3>{ note.title }</h3><div className="Priority">Priority: {note.priority}</div> 
                </div>
                { note.body }
                <p></p> 
                <a href={ note.urlAddress }>View product</a>  |    
                  <a href={ note.reviewURL }> Read reviews</a>  |    
                  <a href={ note.audioFileURL }>  Play audio</a>
                  <button color="danger" onClick={()=> this.props.removeNote(id)}>x</button>
                
                </li>  
              )}
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

export default Notes;