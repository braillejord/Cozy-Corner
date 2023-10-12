import { useContext, useEffect } from "react"
import { UserContext } from "./context/UserContext"
import Login from "./pages/Login"
import Main from "./Main"



function CheckSession() {
    const {user, setUser} = useContext(UserContext)

    useEffect(()=> {
        fetch("/check-session")
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user))
            }
        })
    }, [])

    console.log(user)

    if (user) {
        return <Main/>
    } else {
        return <Login/>
    }

}

export default CheckSession;