const mongoose = require('mongoose');

// allows promises to be called instead of callbacks
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoApp');

module.exports = {mongoose};
