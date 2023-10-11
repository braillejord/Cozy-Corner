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

    const game_developers = game.developers.map((developer) => (
        <p>{developer.name}</p>
    ))

    const game_genres = game.genres.map((genre) => (
        <span>{genre.name}</span>
    ))

    const game_platforms = game.platforms.map((platform) => (
        <span>{platform.platform.name}</span>
    ))

    const game_publishers = game.publishers.map((publisher) => (
        <span>{publisher.name}</span>
    ))

    const game_stores = game.stores.map((store) => (
        <span>{store.store.name}</span>
    ))

    return (
        <>
            This page will display a single game's information. You will need the id of this game to be the id that your API uses so you can make a fetch. It's making a request with your database's id right now.
            <p>{game.name}</p>
            <img src={game.background_image} />
            <img src={game.background_image_additional} />
            <p dangerouslySetInnerHTML={{__html: game.description}}></p>
            {game_developers}
            {game_genres}
            {game_platforms}
            {game_publishers}
            <p>{game.released}</p>
            <p>{game.id}</p>
            <p>{game.esrb_rating}</p>
            {game_stores}
        </>
    )
}

export default Game;