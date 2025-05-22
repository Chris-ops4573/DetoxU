const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {isEmail} = require("validator")
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    }
}, {timestamps: true})

//After saving 
userSchema.post('save', function (doc, next) {
    console.log('user created and saved', doc)
    next()
})

//Before saving
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//Static method to log users in
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('incorrect password')
    } 
    throw Error('incorrect email')
}

module.exports = mongoose.model('User', userSchema)