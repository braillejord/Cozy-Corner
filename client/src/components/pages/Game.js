import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function Game() {
    const [game, setGame] = useState([])
    const {id} = useParams();

    useEffect(() => {
        fetch(`/games/${id}`)
        .then(r => {
            if (r.ok) {
                r.json().then((game) => setGame(game))
            }
        })
    }, [])

    return (
        <>
            This page will display a single game's information. You will need the id of this game to be the id that your API uses so you can make a fetch. It's making a request with your database's id right now.
            <img src={game.background_image} />
            <img src={game.background_image_additional} />
            <p>{game.description}</p>
            <p>{game.description_raw}</p>
            {/* <p>{game.developers}</p>
            <p>{game.genres}</p>
            <p>{game.name}</p>
            <p>{game.platforms}</p>
            <p>{game.publishers}</p>
            <p>{game.released}</p>
            <p>{game.id}</p>
            <p>{game.alternative_names}</p>
            <p>{game.esrb_rating}</p>
            <p>{game.slug}</p>
            <p>{game.stores}</p> */}
        </>
    )
}

export default Game;