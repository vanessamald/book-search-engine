const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/Book-Search-Engine',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
}),

module.exports = mongoose.connection;
