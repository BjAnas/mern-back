// require mongoose
const mongoose = require('mongoose')

// function connect to DB
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Connected to DataBase Successully !')
    } catch (error) {
        console.log(error)
    }
}

// export function connect
module.exports = connect