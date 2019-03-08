import React, { Component } from 'react';
import { Button } from 'reactstrap';
// import { Container, LGroup, ListGroupItem } from 'reactstrap';
import './Notes.css';
// import logo from '../src/assets/D2rdroid2.png';  //move to ./assets folder
const url = 'http://localhost:5501/notes'
// const notes = 'http://localhost:5501/notes'

class Notes extends Component {
  constructor(props) {  //constructor initializes the default state.
    super(props);
    this.state = {
      notes: []
    }
  }
// ☞ e240912c-8d2f-4025-bcd8-dc8f2f72a0c4

//  componentDidMount() {
//     fetch(url) // Call the fetch function passing the url of the API as a parameter
//       .then(res => res.json())
//       .then(notes => this.setState({notes}, () => console.log('Notes fetched...', notes)
//         ))
//         .catch(error => {
//           console.error('Error fetching notes from mLab:', error); 
//         })
//   }

callAPI () {
  fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(res => res.json())
    .then(notes => this.setState({notes}, () => console.log('Notes fetched...', notes)
      ))
      .catch(error => {
        console.error('Error fetching notes from mLab:', error); 
      })
}

componentDidMount() {
  this.callAPI();
}
  // removeNote(id) {
  //   this.setState({notes: this.state.notes.filter(note => id !== id)})
  // }

  // removeNote() {
  //   this.setState({notes: this.state.notes.filter(notes.id )})
  // }
 removeNote = id => {
    this.setState({notes: this.state.notes.filter(note => id )})
  }
  render() {
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
              {this.state.notes.map((note, id) =>
                <li key={id}>
                  <div className="Title">
                    <h3>{note.title}</h3>
                    <div className="Priority">Priority: {note.priority}
                    </div>
                  </div>
                  {note.body}
                  <p></p>
                  <a href={note.urlAddress}>View product</a>  |
                  <a href={note.reviewURL}> Read reviews</a>  |
                  <a href={note.audioFileURL}>  Play audio</a>
                  {/* <button className="btn-itemDelete">X</button> */}
                  <Button className="btn-itemDelete" onClick={()=> this.props.removeNote(id)}>Delete</Button>

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