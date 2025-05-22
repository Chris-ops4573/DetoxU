const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const handleError = (err) => {
    console.log(err.message, err.code)
    let error = {email: '', password: '', username: ''}

    //incorrect email 
    if(err.message === 'incorrect email'){
        error.email = 'email not registered'
    }

    //incorrect password 
    if(err.message === 'incorrect password'){
        error.password = 'Password is incorrect'
    }

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

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

//middlewear for checking auth
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.status(401).json({error: 'unverifiable token'})
            } else{
                req.userId = decodedToken.id
                console.log(decodedToken)
                next()
            }
        })
    } else{
        res.status(401).json({error: 'invalid token'})
    }
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
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * maxAge})
        res.status(201).json({user: user._id});
    } catch(err){
        const errors = handleError(err)
        console.log(errors)
        res.status(400).json({errors})  
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * maxAge})
        res.status(200).json({user: user._id})
        console.log(user)
    } catch(err){
        const errors = handleError(err)
        res.status(400).json({errors})
    }
}

