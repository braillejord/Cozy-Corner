import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import GameListItem from "../GameListItem";

function GamePreview({game, showDetails}) {
    return (
        <>
            {showDetails ? <GameListItem key={game.api_id} game={game} showDetails={showDetails}/> :
            <>
                <p>Normal game preview. Not added to a list.</p>
                <NavLink to={`/games/${game.id}`}>
                <p>{game.name}</p>
                <img src={game.background_image} />
                </NavLink>
            </>    
            }
        </>
    )
}

export default GamePreview;