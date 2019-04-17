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

  Step 3: Connect to your new database
In a terminal window, connect to your database using the mongo shell (the command will look similar to the following example):

% mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword
You can create a database user and password and grab your connection info after logging into your account and navigating to the database’s home page:

img-connectstring

To view detailed connection instructions, troubleshooting tips, and alternate connection methods, see Connecting to Your Database.

Step 4: Load some data
Here’s a quick exercise that tests an insertion into your new database:

Assuming you successfully connected using the mongo shell in the previous step, run the following command:

 > db.mynewcollection.insert({ "foo" : "bar" })
Next, run the command in the first line below and confirm that the shell output matches the second line (your “_id” value will be different):

 > db.mynewcollection.find()
 { "_id" : ObjectId("526705b4a3559a176784b4af"), "foo" : "bar" }
For additional instructions on how to get data, including larger datasets, into your mLab database, see Migrating Data into mLab.

