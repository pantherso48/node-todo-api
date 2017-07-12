const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');

var id  = '5966612a5c1afa282a77ac5a';

User.findById(id).then((user) =>{
  if(!user){
    console.log('no id found');
  }
    console.log('id found');
}, (e) => {
  console.log(e);
});

//var id = '596689017cc302102f3c570c';

// if(!ObjectId.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   //dont need to convert variable string to object id, mongoose does it for you
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({//dont need to convert variable string to object id, mongoose does it for you
// _id: id
// }).then((todo) => {
// console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found');
//   }
// console.log('Todo by id', todo);
// }).catch((e) => console.log(e));
