const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');
//
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneandRemove()

Todo.findByIdAndRemove('5967b2c5f94b842bdedd21b4').then((todo) => {
  console.log(todo);
})
