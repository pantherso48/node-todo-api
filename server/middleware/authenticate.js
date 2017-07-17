var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    // return a rejected promise to STOP running the code and send
    // the 401 status in the catch block-good way of not writing same line
    // of code for the 401 error in 2 places
    if(!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    // 401 didnt authenticate correctly
    res.status(401).send();
  });
};

module.exports = {authenticate};
