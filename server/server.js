require('./config/config.js');
var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const {ObjectID} = require('mongodb');
const{SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
      res.status(404).send();
  }
  else if(ObjectID.isValid(id)) {
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
      if(todo){
        res.status(200).send({todo});
      }
      else {
        res.status(404).send();
      }
    }).catch((e) => res.status(400).send());
  }
});

app.delete('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
      res.status(404).send();
  }
  else if(ObjectID.isValid(id)) {
    Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if(todo){
        res.status(200).send({todo});
      }
      else {
        res.status(404).send();
      }
    }).catch((e) => res.status(400).send());
  }
});

app.patch('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;
  //creates an object
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }

//body is already an object so you dont have to do the properties in an object after set
  Todo.findByIdAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.send(400).send();
  });
});

app.post('/users', (req,res) => {
  //.pick from the module lodash- returns an object with props email and pw
  //from the parameters of the url post sent to the server, pick also only
  //pulls parms we want so ppl cannot change tokens
  var user = new User(_.pick(req.body, ['email','password']));
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
      res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//not just passing authenticate but calling the function and the req parameter
// function has the return values from authenticate
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = new User(_.pick(req.body, ['email','password']));

  // User-static is a model method that encompasses the object of users, user
  // method-mind the case in 'u' is used on select user documents in the object
  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
});

module.exports = {app};
