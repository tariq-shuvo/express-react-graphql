const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'authors'
    }
})

module.exports = Book = mongoose.model('book', BookSchema)