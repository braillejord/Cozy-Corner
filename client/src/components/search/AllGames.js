import React, {useState, useEffect} from "react";
import GamePreview from "../previews/GamePreview";
import GameSearchResults from "./GameSearchResults";
import { NavLink } from "react-router-dom";

function AllGames({setSearchInput}) {
    const [games, setGames] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`/games/page=${page}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((games) => setGames(games))
            }
        })
    }, [page])

    let rendered_games
    if (games.results) {  
        rendered_games = games.results.map((game) => (
                <GamePreview
                key={game.id}
                {...game} />
            ))
        }

    console.log(rendered_games)

    return (
        <>
            <h1>All Games</h1>

            <form>
                <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search games by name..." className="input input-bordered w-full max-w-xs" />
                <NavLink to={"/search-results"}>
                    <button type="submit" className="btn btn-primary">Search</button>
                </NavLink>
            </form>
            {rendered_games}
            <button onClick={() => setPage(page + 1)}>Load 20 More</button>
        </>
    )
}

export default AllGames;