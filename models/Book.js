const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleKey: String,
  ISBN10: String,
  ISBN13: String,
  genres: [String],
  recommendedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  bookId: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;