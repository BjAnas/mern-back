const contactSchema = require("../models/contactSchema")
const User = require('../models/userSchema')

// test route
exports.test = (req, res) => {
    try {
        res.status(200).send('Test OK')
    } catch (error) {
        res.status(400).send(error)
    }
}

// add new contact
exports.addContact = async (req, res) => {

    try {
        let addedBy = req.user._id

        let user = await User.findById(req.user._id)

        const {name, email, phone} = req.body
        const newContact = new contactSchema({name, email, phone, addedBy, userName: user.name})

        let existingContacts = await contactSchema.find();

                // Add the new contact to the beginning of the list
                existingContacts.unshift(newContact);

                // Save the updated list of contacts
                await Promise.all(existingContacts.map(contact => contact.save()));

        // await newContact.save()
        res.status(200).send({success: [{msg: 'Contact added successfully !'}], newContact, user})
    } catch (error) {
        res.status(400).send(error)
    }
}

// get contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await contactSchema.find()
        res.status(200).send(contacts)
    } catch (error) {
        res.status(400).send(error)
    }
}

// get contact by id
exports.getById = async (req, res) => {
    try {
        const {_id} = req.body
        let foundContact = await contactSchema.findById({_id})
        !foundContact ? 
        res.status(400).send('Contact not found')
        : 
        res.status(200).send(foundContact)
    } catch (error) {
        res.status(400).send(error)
    }
}

// get list contacts by user id
exports.getByUserId = async (req, res) => {
    try {
        const {_id} = req.body
        let listContacts = await contactSchema.find({_id})
        res.status(200).send({success: [{msg: 'List Contacts get successfully !'}], listContacts})
    } catch (error) {
        res.status(400).send(error)
    }
}

// delete contact
exports.deleteContact = async (req, res) => {
    try {
        const {_id} = req.params
        await contactSchema.findByIdAndDelete({_id})
        res.status(200).send({msg: 'Contact deleted successfully !'})
    } catch (error) {
        res.status(400).send(error)
    }
}

// edit contact
exports.editContact = async (req, res) => {
    try {
        const {_id} = req.params
        const {name, email, phone} = req.body
        await contactSchema.findByIdAndUpdate({_id}, {$set: {name, email, phone}})
        res.status(200).send({msg: 'Contact updated successfully !'})
    } catch (error) {
        res.status(400).send({msg: 'Something went wrong !', error})
    }
}