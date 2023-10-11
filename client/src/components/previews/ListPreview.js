import React from "react";
import { NavLink } from "react-router-dom";

function ListPreview({id, name}) {
    return (
        <NavLink to={`/lists/${id}`}>
            {name}
        </NavLink>
    )
}

export default ListPreview;