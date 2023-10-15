import React, {useState} from "react";
import { NavLink, useHistory } from "react-router-dom";

function GameListItem({game, showDetails}) {
    const [playingGame, setPlayingGame] = useState(game.currently_playing ?? false)
    const [endlessGame , setEndlessGame] = useState(game.endless ?? false)
    const [playedGame , setPlayedGame] = useState(game.played ?? false)
    const [finishedGame , setFinishedGame] = useState(game.finished ?? false)
    const history = useHistory()

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

    function handleGameNameClick() {
        history.push(`/games/${game.api_id}`)
    }

    return (
        <>
            {showDetails ?              
                <tr>
                    {/* Maybe have a tooltip that tells them it will take them to the game? Or can they infer? */}
                    <th><button onClick={handleGameNameClick}>{game.name}</button></th>
                    <td><input type="checkbox" onChange={(e) => handleClick(e)} name="playingGame" checked={playingGame} className="checkbox" /></td>
                    <td><input type="checkbox" onChange={(e) => handleClick(e)} name="playedGame" checked={playedGame} className="checkbox" /></td>
                    <td><input type="checkbox" onChange={(e) => handleClick(e)} name="finishedGame" checked={finishedGame} className="checkbox" /></td>
                    <td><input type="checkbox" onChange={(e) => handleClick(e)} name="endlessGame" checked={endlessGame} className="checkbox" /></td>
                    <td>{game.gamelist_id ? <button className="btn" onClick={handleDeleteFromList}>x</button> : null}</td>
                </tr>
            :
            <>
                <p>Normal list card. Make it look the same as search results?</p>
                <NavLink to={`/games/${game.api_id}`}>
                    <p>{game.name}</p>
                    <img src={game.background_image} />
                </NavLink>
            </>
            }
        </>
    )
}

export default GameListItem