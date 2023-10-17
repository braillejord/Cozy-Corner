import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

function SignupForm({setSignup}) {
    const [error, setError] = useState()
    const [display, setDisplay] = useState(false)
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
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={onSubmit}>
                    {display && error ? <p className="label-text text-error">{error}</p> : null}
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input name="username" placeholder="minimum 6 characters" className="input input-bordered" value={formData.username} onChange={onChange} required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name="email" type="email" placeholder="email" className="input input-bordered" value={formData.email} onChange={onChange} required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input name="password" type="password" placeholder="minimum 8 characters" className="input input-bordered" value={formData.password} onChange={onChange} required />
                    <label className="label">
                        <a onClick={() => setSignup(false)} className="label-text-alt link link-hover">Have an account? Log in!</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        
        // <>
        //     <h1>Signup</h1>
        //     <form onSubmit={onSubmit}>
        //         <label>Username must contain at least 6 characters:</label>
        //         <input 
        //             name="username"
        //             placeholder="username"
        //             value={formData.username}
        //             onChange={onChange}    
        //             />
        //         <input 
        //             name="email"
        //             placeholder="email"
        //             value={formData.email}
        //             onChange={onChange}    
        //             />
        //         <label>Password must contain at least 8 characters:</label>
        //         <input 
        //             name="password"
        //             placeholder="password"
        //             type='password'
        //             value={formData.password}
        //             onChange={onChange}    
        //             />
        //         <button type='submit'>Submit</button>
        //     </form>
        //     <button onClick={() => setSignup(false)}>Have An Account? Log In!</button>
        // </>
        )
    }

export default SignupForm