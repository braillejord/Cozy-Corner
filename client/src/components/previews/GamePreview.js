import React from "react";
import { NavLink } from "react-router-dom";
import GameListItem from "../GameListItem";

function GamePreview({game, showDetails}) {
    if (!game.api_id) {
        game.api_id = game.id
    }

    function deleteGameListItem() {
        fetch(`/delete-gamelist-item/${game.api_id}`, {
            method: "DELETE"
        }).then(window.location.reload())
    }
    
    return (
        <>
            {showDetails ? <GameListItem key={game.api_id} game={game} showDetails={showDetails}/> 
            :
                <div className="card card-compact h-60 w-72 bg-base-100 shadow-xl">
                    <figure className="min-h-[165px]"><img src={game.background_image} alt={game.name} className="h-full object-cover w-full"/></figure>
                    <div className="flex flex-wrap justify-center card-body h-20 content-between">
                    <NavLink to={`/games/${game.api_id}`}>
                        <div className="tooltip tooltip-bottom" data-tip={game.name}>
                            <h2 className="link link-hover card-title shortened-card-title">{game.name}</h2>
                        </div>
                    </NavLink>
                    {game.gamelist_id ?
                    <div className="dropdown dropdown-hover dropdown-bottom">
                        <label tabIndex={0} className="m-1 text-2xl" style={{cursor: 'pointer'}}>...</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                            <li><a onClick={() => deleteGameListItem()} name="delete">Delete</a></li>
                        </ul>
                    </div>
                    : null }
                    </div>
                </div>
            }
        </>
    )
}

export default GamePreview;