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

  //how to run a query to find docs with values of completed=false
  // db.collection('Todos').find({
  //     _id: new ObjectID('5965285003a14e466c0a6a32')
  //   }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   if(err){
  //     console.log('Unable to fetch todos', err);
  //   }
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos: ${count}`);
  // }, (err) => {
  //   if(err){
  //     console.log('Unable to fetch todos', err);
  //   }
  // });

  // db.collection('Users').find({name: 'Reid'}).toArray().then((docs) => {
  //    console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   if(err){
  //     console.log('Unable to fetch todos', err);
  //   }
  // });

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //findOneandDelete
  db.collection('Todos').findOneAndDelete({
    _id: new ObjectID('59653220bf878a757e3caeed')}).then((result) => {
    console.log(result);
  });

  // db.close();
});
