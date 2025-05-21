import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 
    const [username, setUsername] = useState("")
    const [emailError, setEmailError] = useState("") 
    const [passwordError, setPasswordError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        clearErrors()
        e.preventDefault()
        try{
            const signupDetails = {username, email, password}
            const response = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify(signupDetails),
                headers: {'Content-Type': 'application/json'}
            })
            if(response.ok){
                setUsername("")
                setEmail("")
                setPassword("")
            }
            const data = await response.json()
            if(data.errors){
                setEmailError(data.errors.email)
                setPasswordError(data.errors.password)
                setUsernameError(data.errors.username)
            }
            if(data.user){
                navigate('/signup')
            }
        } catch(err) {
            console.log(err)
        }
    }

    const clearErrors = () => {
        setUsernameError("")
        setEmailError("")
        setPasswordError("")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label>Username</label>
                <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)} />
                <p>{usernameError}</p>
                <label>Email</label>
                <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} />
                <p>{emailError}</p>
                <label>Password</label>
                <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                <p>{passwordError}</p>
                <button onClick={clearErrors}>Sumbit</button>
            </form>
        </div>
    )
}

export default SignUp
