const mongoose = require('mongoose');
// Schema
const catSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A cat must hae a name'],
    },
    age: {
        type: Number,
        required: [true, 'A cat must have a duration'],
    },
    breed: {
        type: String,
        required: [true, 'A cat must hae a name'],
    }
})
const Cat = mongoose.model('Caats', catSchema);
module.exports = Cat;