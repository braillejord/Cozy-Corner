import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import GameListItem from "../GameListItem";

function GamePreview({game, showDetails}) {
    if (!game.api_id) {
        game.api_id = game.id
    }
    
    return (
        <>
            {showDetails ? <GameListItem key={game.api_id} game={game} showDetails={showDetails}/> 
            :
            <NavLink to={`/games/${game.api_id}`}>
                <div className="card card-compact w-72 bg-base-100 shadow-xl">
                    <figure><img src={game.background_image} alt={game.name} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{game.name}</h2>
                    </div>
                </div>
            </NavLink>   
            }
        </>
    )
}

export default GamePreview;