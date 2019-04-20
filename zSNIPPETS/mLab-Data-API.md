mlab-data-api
mlab-data-api is a node.js module designed to allow you to access mLab's Data API with minimal overhead from browser-side. Inspired by mongolab Data API

Installation
Using npm:

$ npm install --save mlab-data-api
If you don't have or don't want to use npm:

$ cd ~/.node_modules
$ git clone git://github.com/bgrusnak/mlab-data-api.git
Usage
To require the library and initialize it

import MLab from 'mlab-data-api';
var mLab=MLab({
  key: '<YOUR MLAB API DATA KEY>',
  host:'https://api.mlab.com', //optional
  uri : '/api',//optional
  version :'1',//optional
  database:'your working database', //optional
  timeout : 10000 //optional
})
 
Examples
List databases

  mLab.listDatabases()
  .then(function (response) {
    console.log('got',response.data)
  })
  .catch(function (error) {
    console.log('error', error)
  })
List collections

mLab.listCollections('exampledb')
  .then(function (response) {
    console.log('got',response.data)
  })
  .catch(function (error) {
    console.log('error', error)
  })
List documents

var options = {
  database: 'exampledb', //optional
  collection: 'examples',
  query: { 'key': 'value' }
};
 
mLab.listDocuments(options)
  .then(function (response) {
    console.log('got',response.data)
  })
  .catch(function (error) {
    console.log('error', error)
  });
Methods
All methods returns the Promises for further processing

listDatabases
Get the databases linked to the authenticated account

.listDatabases()

listCollections
Get the collections in the specified database

.listCollections(database)

Parameters:

Name	Description	Type	Required
database	MongoDB database name	String	No
listDocuments
Get the documents in the specified collection

.listDocuments(options)

Options:

Name	Description	Type	Required
database	MongoDB database name	String	No
collection	MongoDB collection name	String	Yes
query	restrict results by the specified JSON query	Object	No
count	return the result count for this query	Boolean	No
fields	specify the set of fields to include or exclude in each document (1 - include; 0 - exclude)	Object	No
findOne	return a single document from the result set (same as findOne() using the mongo shell)	Boolean	No
order	specify the order in which to sort each specified field (1- ascending; -1 - descending)	String	No
skip	number of documents to skip	Number	No
limit	number of documents to return	Number	No
insertDocuments
Create a new document in the specified collection

.insertDocuments(options)

Options:

Name	Description	Type	Required
database	MongoDB database name	String	No
collection	MongoDB collection name	String	Yes
data	a document or array of documents to be inserted	Object/Array	Yes
updateDocuments
Update one or more documents in the specified collection

.updateDocuments(options)

Options:

Name	Description	Type	Required
database	MongoDB database name	String	No
collection	MongoDB collection name	String	Yes
data	replacement document or update modifiers	Object	Yes
query	only update document(s) matching the specified JSON query	Object	No
all	update all documents collection or query (if specified). By default only one document is modified	Boolean	No
upsert	insert the document defined in the request body if none match the specified query	Boolean	No
deleteDocuments
Replace the contents of some or all documents of a collection

.deleteDocuments(options)

Options:

Name	Description	Type	Required
database	MongoDB database name	String	No
collection	MongoDB collection name	String	Yes
query	only replace the document(s) matching the specified JSON query	Object	No
viewDocument
View a single document

.viewDocument(options)

Options:

Name	Description	Type	Required
database	MongoDB database name	String	No
collection	MongoDB collection name	String	Yes
id	the document's id	String	Yes
updateDocument
Update a single document

.updateDocument(options)

Options:

Name	Description	Type	Required
database	MongoDB database name	String	No
collection	MongoDB collection name	String	Yes
id	the document's id	String	Yes
updateObject	object sent as replacement	Object	Yes
deleteDocument
Delete a single document

.deleteDocument(options)

Options:

Name	Description	Type	Required
database	MongoDB database name	String	No
collection	MongoDB collection name	String	Yes
id	the document's id	String	Yes
runCommand
Run a MongoDB database command

.runCommand(options)

Options:

Name	Description	Type	Required
database	MongoDB database name	String	No
commands	MongoDB database command	Object	Yes
Notes
Creating a new collection
As soon as you POST your first document you should see the collection appear
runCommands
Only certain MongoDB commands are exposed through the Data API
The available commands are:
getLastError
getPrevError
ping
profile
repairDatabase
resetError
whatsmyuri
convertToCapped
distinct
findAndModify
geoNear
reIndex
collStats
dbStats
Requirements
mLab account w/API key.
node.js v7.10.0+ (7.10.0 is the version I used to develop this module. I'm unsure if it will work with previous ones. If you run a previous version, and it works, let me know and I'll update this)
axios 0.16.2+
