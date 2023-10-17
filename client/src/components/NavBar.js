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
        <div className="navbar bg-base-100">
        <div className="flex-1">
            {/* <a className="btn btn-ghost normal-case text-xl">cozy corner </a> */}
            <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">cozy corner 🌻</NavLink>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li><NavLink exact to={"/"}>My Corner</NavLink></li>
                <li><NavLink to={"/search-games"}>Games</NavLink></li>
                <li><NavLink to={"/search-reviews"}>Reviews</NavLink></li>
                <li className="font-semibold"><NavLink to={"/login"} onClick={handleLogout}>Log Out</NavLink></li>
            </ul>
        </div>
        </div>
    )
}

export default NavBar;