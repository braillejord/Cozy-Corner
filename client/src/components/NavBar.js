import React, {useContext} from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";

function NavBar() {
    const {user, setUser} = useContext(UserContext)

    function handleLogout(e) {
        fetch("/logout", {
            method: "DELETE"
        })
        .then(setUser(null))
    }
    
    return (
        <>
            <h1>NavBar</h1>
            <NavLink to={"/"}>My Corner</NavLink>
            <NavLink to={"/search-games"}>Games</NavLink>
            <NavLink to={"/search-reviews"}>Reviews</NavLink>
            <span>Hello {user ? user.username : "Anonymous"}</span>
            <NavLink to={"/login"}>
                <button onClick={handleLogout}>Log Out</button>
            </NavLink>
        </>
    )
}

export default NavBar;