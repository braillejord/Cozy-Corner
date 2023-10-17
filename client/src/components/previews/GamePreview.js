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
                <div className="card card-compact h-60 w-72 bg-base-100 shadow-xl">
                    <figure className="min-h-[165px]"><img src={game.background_image} alt={game.name} className="h-full object-cover w-full"/></figure>
                    <div className="card-body h-20">
                        <h2 className="card-title">{game.name}</h2>
                    </div>
                </div>
            </NavLink>   
            }
        </>
    )
}

export default GamePreview;