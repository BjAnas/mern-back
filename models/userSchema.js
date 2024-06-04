const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true, // Assurez-vous que ce champ est unique
        sparse: true // Permet d'avoir des valeurs nulls ou vides sans erreur d'index
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
