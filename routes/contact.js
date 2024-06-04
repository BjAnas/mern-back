// require express
const express = require('express')
const { test, addContact, getContacts, getById, deleteContact, editContact, getByUserId } = require('../controllers/contact')
const isAuth = require('../middlewares/isAuth')

// require Router
const router = express.Router()

// test Route
router.get('/test', test)

// add contact route
router.post('/add_contact', isAuth, addContact)

// get contacts
router.get('/getContacts', getContacts)

// get contact by id
router.get('/getContactById/:_id', getById)

// get list contacts by user id
router.get('/getByUserId/:_id', getByUserId)

// delete contact
router.delete('/deleteContact/:_id', deleteContact)

// edit contact
router.put('/editContact/:_id', editContact)

// export router
module.exports = router