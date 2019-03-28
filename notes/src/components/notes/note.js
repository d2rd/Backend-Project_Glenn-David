const user = (props) => {
  return( <li key={id}>
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
  )
}