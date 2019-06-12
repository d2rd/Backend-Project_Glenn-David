<ul>
              {this.state.notes.map((note, _id) =>
                <li key={_id}>
                <div className="Note-title-row"><h3 className="Title">{note.title}</h3><h3 className="Price">Price: ${note.price}</h3><h3 className="Priority">Priority: {note.priority}</h3>
                </div>
                  {note.body}
                  <p></p>
                  <a href={note.urlAddress}>View product</a>  |
                  <a href={note.reviewURL}> Read reviews</a>  |
                  <a href={note.audioFileURL}>  Play audio</a>  |
                  <a href={note.gallery}>  Gallery</a>
                  <p></p>
                  <button className="btn-itemDelete" onClick={this.deleteNoteHandler4.bind(this,note)}>Delete Me</button>
                  {/* <Button className="btn-itemDelete" onClick={()=> this.props.removeNote(note._id)}>Delete-A</Button> */}
                  <h5>{note._id}</h5>
                </li>
// ☞ 04a1312d-1275-4a50-8c41-bf1867af6999


              )}
            </ul>