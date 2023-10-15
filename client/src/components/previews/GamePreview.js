import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function GamePreview({id, api_id, background_image, currently_playing, endless, finished, gamelist_id, name, played, showDetails, setShowDetails}) {
    const [playingGame, setPlayingGame] = useState(currently_playing ?? false)
    const [endlessGame , setEndlessGame] = useState(endless ?? false)
    const [playedGame , setPlayedGame] = useState(played ?? false)
    const [finishedGame , setFinishedGame] = useState(finished ?? false)

    function handleDeleteFromList() {
        fetch(`/games/${api_id}`, {
            method: "DELETE"
        })
        .then(window.location.reload())
    }

    function handleClick(e) {
        if (e.target.name === "playingGame") {
            setPlayingGame(!playingGame)
            const updated_item = {currently_playing: !currently_playing}
            updateItem(updated_item)

        } else if (e.target.name === "playedGame") {
            setPlayedGame(!playedGame)
            const updated_item = {played: !played}
            updateItem(updated_item)

        } else if (e.target.name === "finishedGame") {
            setFinishedGame(!finishedGame)
            const updated_item = {finished: !finished}
            updateItem(updated_item)

        } else if (e.target.name === "endlessGame") {
            setEndlessGame(!endlessGame)
            const updated_item = {endless: !endless}
            updateItem(updated_item)
        }
    }

    function updateItem(updated_item) {
        fetch(`/edit-item/${api_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }, body: JSON.stringify(updated_item)
        })
    }

    return (
        <>
            {api_id ?
            <>
                <p>Has an api_id</p>
                <NavLink to={`/games/${api_id}`}>
                    <p>{name}</p>
                    <img src={background_image} />
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

                </>
                : "Not showing more information."}
                {gamelist_id ? <button onClick={handleDeleteFromList}>X</button> : null}
            </>
            :
            <>
                <p>Has a regular id</p>
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