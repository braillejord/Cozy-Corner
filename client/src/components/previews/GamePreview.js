import React from "react";
import { NavLink } from "react-router-dom";

function GamePreview({id, api_id, background_image, name, gamelist_id}) {
    
    function handleDeleteFromList() {
        fetch(`/games/${api_id}`, {
            method: "DELETE"
        })
        .then(window.location.reload())
    }
    
    
    return (
        <>
            {api_id ?
            <>
                <NavLink to={`/games/${api_id}`}>
                    <p>{name}</p>
                    <img src={background_image} />
                </NavLink>
                {gamelist_id ? <button onClick={handleDeleteFromList}>X</button> : null}
            </>
            :
            <>
                <NavLink to={`/games/${id}`}>
                <p>{name}</p>
                <img src={background_image} />
                </NavLink>
            </>    
            }
        </>
    )
}

export default GamePreview;