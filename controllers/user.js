require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env

const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// test route
exports.test = (req, res) => {
    try {
        res.status(200).send('Test User OK');
    } catch (error) {
        res.status(400).send(error);
    }
}

// register
exports.register = async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log the request body
        let { name, email, password, username } = req.body;

        let foundUser = await User.findOne({ email });

        if (foundUser) {
            return res.status(400).send({ errors: [{ msg: "Email already exists" }] });
        }

        const salt = 10;

        let hashedPassword = await bcrypt.hash(password, salt);

        let newUser = new User({
            name,
            email,
            password: hashedPassword,
            username // Include the username field if provided
        });

        await newUser.save();

        const token = jwt.sign({
            id: newUser._id
        }, process.env.SECRET_KEY); // Access the secret key from .env

        res.status(200).send({ success: [{ msg: "Register Successfully!" }], newUser, token });

    } catch (error) {
        console.error('Error in register:', error);  // Log the error
        res.status(500).send({ errors: [{ msg: "Register failed!" }], error });
    }
}

// login
exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        let foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(400).send({ errors: [{ msg: "Incorrect email" }] });
        }

        let hashedPassword = await bcrypt.compare(password, foundUser.password);

        if (!hashedPassword) {
            return res.status(400).send({ errors: [{ msg: "Incorrect password" }] });
        }

        const token = jwt.sign({
            id: foundUser._id
        }, process.env.SECRET_KEY); // Access the secret key from .env

        res.status(200).send({ success: [{ msg: `Hello ${foundUser.name}, welcome back!` }], foundUser, token });

    } catch (error) {
        res.status(400).send({ errors: [{ msg: "Login failed" }] });
    }
}

// get users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

// get user by id
exports.getOneUser = async (req, res) => {
    try {
        const _id = req.query._id;
        let foundUser = await User.findById(_id);
        !foundUser ?
            res.status(400).send('User not found') :
            res.status(200).send(foundUser);
    } catch (error) {
        res.status(400).send(error);
    }
}
