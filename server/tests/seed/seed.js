const {ObjectID} = require('mongodb');

const{Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
var jwt = require('jsonwebtoken');

var id = new ObjectID();

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  completed: true,
  completedAt: 333
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const users = [{
  _id: id,
  email: 'apple@gmail.com',
  password: '!sdafsf34344',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: id, access: 'auth'}, 'woohoo').toString()
  }]
}, {
  _id: new ObjectID(),
  email: 'apple2@gmail.com',
  password: 'asdfaf333!',
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne,userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
