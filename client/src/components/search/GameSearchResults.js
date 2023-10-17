import React, {useState, useEffect} from "react";
import GamePreview from "../previews/GamePreview";
import { NavLink } from "react-router-dom";

function GameSearchResults({searchInput, setSearchInput}) {
    const [games, setGames] = useState([])

    useEffect(() => {
        fetch(`/games/search=${searchInput}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((games) => setGames(games))
            }
        })
        .then(setSearchInput(""))
    }, [])

    let rendered_games
    if (games.results) {  
        rendered_games = games.results.map((game) => (
                <GamePreview
                key={game.id}
                game={game} />
            ))
        }
    
    return (
        <>
            <NavLink to={"/search-games"}>
                <button className="btn btn-primary mt-5">Back to All Games</button>
            </NavLink>
            <h1 className="text-5xl font-semibold text-center">Search Results</h1>
            <div class="flex flex-wrap gap-8 justify-center">{rendered_games}</div>
        </>
    )
}

export default GameSearchResults