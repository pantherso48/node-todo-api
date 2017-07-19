const {ObjectID} = require('mongodb');

const{Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
var jwt = require('jsonwebtoken');

var idone = new ObjectID();
var idtwo = new ObjectID();

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: idone
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: idtwo
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const users = [{
  _id: idone,
  email: 'apple@gmail.com',
  password: '!sdafsf34344',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: idone, access: 'auth'}, 'woohoo').toString()
  }]
}, {
  _id: idtwo,
  email: 'apple2@gmail.com',
  password: 'asdfaf333!',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: idtwo, access: 'auth'}, 'woohoo').toString()
  }]
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne,userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
