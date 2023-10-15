import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function GameListItemPreview({game, showDetails}) {
    const [playingGame, setPlayingGame] = useState(game.currently_playing ?? false)
    const [endlessGame , setEndlessGame] = useState(game.endless ?? false)
    const [playedGame , setPlayedGame] = useState(game.played ?? false)
    const [finishedGame , setFinishedGame] = useState(game.finished ?? false)

    function handleDeleteFromList() {
        fetch(`/games/${game.api_id}`, {
            method: "DELETE"
        })
        .then(window.location.reload())
    }

    function handleClick(e) {
        if (e.target.name === "playingGame") {
            setPlayingGame(!playingGame)
            const updated_item = {currently_playing: !game.currently_playing}
            updateItem(updated_item)

        } else if (e.target.name === "playedGame") {
            setPlayedGame(!playedGame)
            const updated_item = {played: !game.played}
            updateItem(updated_item)

        } else if (e.target.name === "finishedGame") {
            setFinishedGame(!finishedGame)
            const updated_item = {finished: !game.finished}
            updateItem(updated_item)

        } else if (e.target.name === "endlessGame") {
            setEndlessGame(!endlessGame)
            const updated_item = {endless: !game.endless}
            updateItem(updated_item)
        }
    }

    function updateItem(updated_item) {
        fetch(`/edit-item/${game.api_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }, body: JSON.stringify(updated_item)
        })
    }

    return (
        <>
            <NavLink to={`/games/${game.api_id}`}>
                <p>{game.name}</p>
                <img src={game.background_image} />
            </NavLink>
            {showDetails ?
            <>
            <label>Currently Playing</label>
            <input type="checkbox" onChange={(e) => handleClick(e)} name="playingGame" checked={playingGame} className="checkbox" />

            <label>Played</label>
            <input type="checkbox" onChange={(e) => handleClick(e)} name="playedGame" checked={playedGame} className="checkbox" />

            <label>Finished</label>
            <input type="checkbox" onChange={(e) => handleClick(e)} name="finishedGame" checked={finishedGame} className="checkbox" />

            <label>Endless</label>
            <input type="checkbox" onChange={(e) => handleClick(e)} name="endlessGame" checked={endlessGame} className="checkbox" />

            {game.gamelist_id ? <button onClick={handleDeleteFromList}>X</button> : null}
            </>
            : null}
        </>
    )
}

export default GameListItemPreview