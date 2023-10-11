import React from "react";
import { NavLink } from "react-router-dom";

function GamePreview({id, api_id, background_image, name}) {
    return (
        <>
            {api_id ?
            <>
                <NavLink to={`/games/${api_id}`}>
                    <p>Game Title: {name}</p>
                    <img src={background_image} />
                </NavLink>
                <p>This is where you would put other information about the game.</p>
            </>
            :
            <>
                <NavLink to={`/games/${id}`}>
                <p>Game Title: {name}</p>
                <img src={background_image} />
                </NavLink>
                <p>This is where you would put other information about the game.</p>
            </>    
            }
        </>
    )
}

export default GamePreview;