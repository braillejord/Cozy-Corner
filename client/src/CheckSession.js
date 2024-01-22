import { useState, useContext, useEffect } from "react"
import { UserContext } from "./context/UserContext"
import LoadingScreen from "./pages/LoadingScreen"
import Login from "./pages/Login"
import Main from "./Main"



function CheckSession() {
    const [loading, setLoading] = useState(true)
    const {user, setUser} = useContext(UserContext)

    useEffect(()=> {
        fetch("/check-session")
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user)).then(() => setLoading(false))
            }
        })
    }, [setUser])

    console.log(user)

    // if (loading) return <LoadingScreen />

    if (user) {
        return <Main/>
    } else {
        return <Login/>
    }

}

export default CheckSession;