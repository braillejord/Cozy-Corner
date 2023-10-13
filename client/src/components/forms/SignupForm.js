import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

function SignupForm({setSignup}) {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    
    function onChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    function onSubmit(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user)).then(history.push("/"))
            }
        })
    }
    
    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <label>Username must contain at least 6 characters:</label>
                <input 
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={onChange}    
                    />
                <input 
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={onChange}    
                    />
                <label>Password must contain at least 8 characters:</label>
                <input 
                    name="password"
                    placeholder="password"
                    type='password'
                    value={formData.password}
                    onChange={onChange}    
                    />
                <button type='submit'>Submit</button>
            </form>
            <button onClick={() => setSignup(false)}>Have An Account? Log In!</button>
        </>
        )
    }

export default SignupForm