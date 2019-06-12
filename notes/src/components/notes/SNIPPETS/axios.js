axios.get({url})
.then(res => {
  const notes = res.data;
  this.setState({ notes });
})