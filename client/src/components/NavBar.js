import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <>
            <h1>NavBar</h1>
            <NavLink to={"/"}>My Corner</NavLink>
            <NavLink to={"/search/all-games"}>Games</NavLink>
            <NavLink to={"/search/all-reviews"}>Reviews</NavLink>
        </>
    )
}

export default NavBar;