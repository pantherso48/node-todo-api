// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//create a random object id
var obj = new ObjectID();
console.log(obj);

var user = {name: 'andrew', age: 27};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if(err){
    //prevents rest of function from executing
    return console.log('Unable to connect to db server');
  }
  console.log('connected mongodb server');

  // db.collection('Todos').insertOne({
  //   text: 'something',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.console.log('unable to insert todo',err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //     name: 'Reid',
  //     age: '27',
  //     location: 'Dolla Land'
  //   }, (err, result) => {
  //     if(err){
  //       return console.log('Could not insert a user');
  //     }
  //     console.log(JSON.stringify(result.ops, undefined,2));
  //     console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});
