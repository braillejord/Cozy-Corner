import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import GameListItemPreview from "./GameListItemPreview";

function GamePreview({game, showDetails}) {
    return (
        <>
            {game.api_id ? <GameListItemPreview key={game.api_id} game={game} showDetails={showDetails}/> :
            <>
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