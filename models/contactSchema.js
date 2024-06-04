// require mongoose
const mongoose = require('mongoose')

// get schema
const Schema = mongoose.Schema

// create contact schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone : Number,
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
        required: true
    },
    userName: String
})

// export schema
module.exports = Contact = mongoose.model('contact', contactSchema)