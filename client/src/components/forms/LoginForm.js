import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

function LoginForm({setSignup}) {
    const [error, setError] = useState()
    const [display, setDisplay] = useState(false)
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    function onChange(e) {
        setFormData({
            ...formData,
            [e.target.type]: e.target.value
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
            } else {
                r.json().then((message) => setError(message['message'])).then(() => setDisplay(true)).then(setTimeout(() => {
                    setError('')
                    setDisplay(false)
                }, 8000))
            }
        })
    }

    return (
        <div className="hero min-h-screen bg-gradient-to-bl from-primary-focus via-accent-focus to-neutral-content">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="website-title text-8xl font-bold">Cozy Corner</h1>
                <p className="py-6">A site that helps you organize your game collection, discover new titles, and connect with fellow players through reviews. Log in now to continue building your corner in our cozy gaming community!</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={onSubmit}>
                    <div className="form-control">
                    {display && error ? <p className="label-text text-error">{error}</p> : null}
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" value={formData.email} onChange={onChange} required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" value={formData.password} onChange={onChange} required />
                    <label className="label">
                        <a onClick={() => setSignup(true)} className="label-text-alt link link-hover">New here? Sign up!</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
    )
}

export default LoginForm