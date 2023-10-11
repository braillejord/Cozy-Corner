import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function Game() {
    const [game, setGame] = useState([])
    const {api_id} = useParams();

    useEffect(() => {
        fetch(`/games/${api_id}`)
        .then(r => {
            if (r.ok) {
                r.json().then((game) => setGame(game))
            }
        })
    }, [])

    let game_developers
    if (game.developers) {
        game_developers = game.developers.map((developer) => (
            <span>{developer.name}</span>
            ))
        }
    
    let game_genres
    if (game.genres) {
        game_genres = game.genres.map((genre) => (
            <span>{genre.name}</span>
            ))
        }
    
    let game_platforms
    if (game.platforms) {
        game_platforms = game.platforms.map((platform) => (
            <span>{platform.platform.name}</span>
            ))
        }
    
    let game_publishers
    if (game.publishers) {
        game_publishers = game.publishers.map((publisher) => (
            <span>{publisher.name}</span>
            ))
        }

    let game_tags
    if (game.tags) {
        game_tags = game.tags.map((tag) => (
            <span>{tag.name}</span>
            ))
        }
    
    let game_stores
    if (game.stores) {
        game_stores = game.stores.map((store) => (
            <span>{store.store.name}</span>
            ))
        }

    let game_rating
    if (game.esrb_rating) {
        game_rating = game.esrb_rating.name
    }

    function handleCreateListItem() {
        const item_data = {
            api_id: game.id,
            name: game.name,
            image: game.background_image,
            // NEED TO SEND ID OF USER'S SPECIFIC LIST (OWNED, WISHLIST, BACKLOG, ETC.)
        }
        
        fetch("/create-gamelist-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item_data),
        })
    }
            
    return (
        <>
            <h1>A Single Game</h1>
            This page will display a single game's information. You will need the id of this game to be the id that your API uses so you can make a fetch. It's making a request with your database's id right now.
            <button onClick={() => handleCreateListItem()}>Add to List</button> THIS BUTTON NEEDS TO CREATE A GAMELIST_ITEM INSTANCE, WHICH WILL TIE IT TO THE LIST.
            <p>Game Name: {game.name}</p>
            <img src={game.background_image} />
            <img src={game.background_image_additional} />
            <p dangerouslySetInnerHTML={{__html: game.description}}></p>
            <p>Developers: {game_developers}</p>
            <p>Genres: {game_genres}</p>
            <p>Platforms: {game_platforms}</p>
            <p>Publishers: {game_publishers}</p>
            <p>Tags: {game_tags}</p>
            <p>Release Date: {game.released}</p>
            <p>Game Id: {game.api_id}</p>
            <p>ESRB Rating: {game_rating}</p>
            <p>Stores: {game_stores}</p>
        </>
    )
}

export default Game;