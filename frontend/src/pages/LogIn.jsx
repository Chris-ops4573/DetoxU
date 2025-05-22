import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("") 
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        clearErrors()
        e.preventDefault()
        try{
            const signupDetails = {email, password}
            const response = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify(signupDetails),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            if(response.ok){
                setEmail("")
                setPassword("")
            }
            const data = await response.json()
            if(data.errors){
                setEmailError(data.errors.email)
                setPasswordError(data.errors.password)
            }
            if(data.user){
                navigate('/home')
            }
        } catch(err) {
            console.log(err)
        }
    }

    const clearErrors = () => {
        setEmailError("")
        setPasswordError("")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Log In</h2>
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

export default LogIn