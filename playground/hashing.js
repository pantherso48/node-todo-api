const{SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var pw = '123abc!';
var e = '$2a$10$LKbIPBabxhhHXdtD2aZCcexuh/EMMDv7aNcBZ1UPOuWjm6wV.Vi/K';

bcrypt.compare(pw, e, (err, res) => {
  console.log(res);
})


bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(pw, salt, (err, hash) => {
    console.log(hash);
  })
});


// var data = {
//   id: 4,
// }
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// var message = 'I am user number 3';
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message},    ${hash}`);
//
// var data = {
//   id: 4,
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// }
//
// // if the user doesnt have the 'salt' the hash will never match and cannot be trusted
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//   console.log('Data was not changed.');
// }
// else {
//   console.log('Data was changed. Do not trust!');
// }
