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
                game={game} />
            ))
        }
    
    if (!games.results) return <p>Loading...</p>

    return (
        <>
            <h1 className="text-3xl font-semibold text-center">
                All Games
                <div className="flex justify-end font-normal">
                    <form className="flex justify-end">
                        <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search by game name..." className="input input-bordered w-full max-w-xs" />
                        <NavLink to={"/search-results"}>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </NavLink>
                    </form>
                </div>
            </h1>
            <div class="flex flex-wrap gap-8 justify-center">
                {rendered_games}
            </div>
            
            
            <button onClick={() => setPage(page + 1)}>Load 20 More</button>
        </>
    )
}

export default AllGames;