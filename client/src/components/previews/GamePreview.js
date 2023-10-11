import React from "react";
import { NavLink } from "react-router-dom";

function GamePreview({id, game_id}) {
    return (
        <NavLink to={`/games/${id}`}>
            <p>This is a game: {id}</p>
        </NavLink>
    )
}

export default GamePreview;