import React, {useState} from "react";
import LoginForm from "../components/forms/LoginForm"
import SignupForm from "../components/forms/SignupForm"

function Login() {
    const [signup, setSignup] = useState(false)
    
    return (
        <>
            {signup
            ?
            <SignupForm
            setSignup={setSignup}
            />
            :
            <LoginForm
            setSignup={setSignup}
            />
            }
        </>
    )
}

export default Login;