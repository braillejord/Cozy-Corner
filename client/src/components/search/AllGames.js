import React, {useState, useEffect} from "react";
import GamePreview from "../previews/GamePreview";
import { useHistory } from "react-router-dom";

function AllGames({setSearchInput}) {
    const [games, setGames] = useState([])
    const [page, setPage] = useState(1)
    const history = useHistory()

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
    
    if (!games.results) return <p className="pt-5">Loading...</p>

    return (
        <>
            <h1 className="text-4xl font-semibold text-center pt-10">
                All Games
                <div className="flex justify-end font-normal">
                    <form className="flex justify-end">
                        <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search by game name..." className="input input-bordered w-full max-w-xs"/>
                        <button onClick={() => history.push("/search-results")} type="submit" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </form>
                </div>
            </h1>
            <div className="flex flex-wrap gap-8 justify-center">
                {rendered_games}
            </div>
            
            
            <button onClick={() => setPage(page + 1)}>Load 20 More</button>
        </>
    )
}

export default AllGames;