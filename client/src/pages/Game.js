import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Game() {
    const [game, setGame] = useState([])
    const [userLists, setUserLists] = useState([])
    const [listSelection, setListSelection] = useState(0)
    const [writeReview, setWriteReview] = useState(false)
    const {api_id} = useParams();
    const {user, setUser} = useContext(UserContext)

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

    function handleCreateListItem(e) {
        e.preventDefault()

        const item_data = {
            api_id: game.id,
            name: game.name,
            image: game.background_image,
            user_id: user.id,
            list_id: listSelection
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

    useEffect(() => {
        fetch(`/user/${user.id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((lists) => setUserLists(lists))
            }
        })
    }, [])

    const gamelist_options = userLists.map((list) => (
        <option value={list.id} name={list.name}>{list.name}</option>
    ))

    function handleSubmitReview(e) {
        e.preventDefault()
        setWriteReview(!writeReview)
        
    }
            
    return (
        <>            
            <p>Game Name: {game.name}</p>

            <form onSubmit={(e) => handleCreateListItem(e)}>
                <label htmlFor="lists">Choose a list:</label>
                <select name="lists" id="lists" onChange={(e) => setListSelection(e.target.value)}>
                    {gamelist_options}
                </select>
                <button type="submit">Add to List</button>
            </form>

            {writeReview
            ?
            <form>
                <textarea placeholder="Review here..."></textarea>
                <button type="submit" onClick={(e) => handleSubmitReview(e)}>Submit Review</button>
            </form>
            :
            <button onClick={() => setWriteReview(!writeReview)}>Write a Review</button>
            }
            

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