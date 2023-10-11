import React, {useState, useEffect} from "react";
import GamePreview from "../previews/GamePreview";

function AllGames() {
    const [games, setGames] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`/games/page=${page}`)
        .then(r => {
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

    return (
        <>
            <h1>All Games</h1>
            {rendered_games}
            <button onClick={() => setPage(page + 1)}>Load 20 More</button>
        </>
    )
}

export default AllGames;