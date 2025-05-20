const User = require("../models/userModel")

const handleError = (err) => {
    console.log(err.message, err.code)
    let error = {email: '', password: '', username: ''}

    //duplicate errors
    if(err.code === 11000){
        error.email = 'email already regsitered'
        return error  
    }

    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message
        })
    }
    return error
}

module.exports.signup_get = (req, res) => {
    res.send("singup page")
}

module.exports.login_get = (req, res) => {
    res.send("login page")
}

module.exports.signup_post = async (req, res) => {
    const {username, email, password} = req.body

    try{
        const user = await User.create({username, email, password})
        res.status(201).json(user);
    } catch(err){
        const errors = handleError(err)
        res.status(400).json({errors})
    }
}

module.exports.login_post = (req, res) => {
    const {email, password} = req.body
    res.send("signing in user")
}

