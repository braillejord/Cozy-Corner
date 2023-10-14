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
            }
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Cozy Corner 🌻</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={onSubmit}>
                    <div className="form-control">
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
                        {/* <a href="#" className="label-text-alt link link-hover">New here? Sign up!</a> */}
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