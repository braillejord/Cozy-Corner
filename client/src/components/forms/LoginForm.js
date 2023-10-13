import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

function LoginForm({setSignup}) {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
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
        fetch("/login", {
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
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={onChange}    
                    />
                <input 
                    name="password"
                    placeholder="password"
                    type='password'
                    value={formData.password}
                    onChange={onChange}    
                    />
                <button type='submit'>Submit</button>
            </form>
            <button onClick={() => setSignup(true)}>New Here? Sign Up!</button>
        </>
    )
}

export default LoginForm