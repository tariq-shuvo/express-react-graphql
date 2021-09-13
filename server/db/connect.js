const mongoose = require('mongoose')
const config = require('config')
const mongoURI = config.get('mongoURI')

const mongoConnect = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true
        })
        console.log("Database connected!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = mongoConnect