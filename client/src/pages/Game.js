import React, {useState, useEffect, useContext} from "react";
import ReviewForm from "../components/forms/ReviewForm";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Game() {
    const [game, setGame] = useState([])
    const [userLists, setUserLists] = useState([])
    const [listSelection, setListSelection] = useState(0)
    const [writeReview, setWriteReview] = useState(false)
    const [gameAdded, setGameAdded] = useState(false)
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
            list_id: parseInt(listSelection)
        }
        
        fetch("/create-gamelist-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item_data),
        })
        .then(document.getElementById('addGameToListModal').close())
        .then(setGameAdded(true))
        .then(setTimeout(() => {
            setGameAdded(false)
        }, 5000))
    }

    useEffect(() => {
        fetch(`/user-lists/${user.id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((lists) => setUserLists(lists))
            }
        })
    }, [])

    const gamelist_options = userLists.map((list) => (
        <option value={list.id} name={list.name}>{list.name}</option>
    ))
            
    return (
        <>    
            {gameAdded ? 
            <div className="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Game added to your list!</span>
            </div>
            :
            null}        
            <h1>Game Name: {game.name}</h1>                
            <dialog id="addGameToListModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Choose a list to add this game to!</h3>
                    <form onSubmit={(e) => handleCreateListItem(e)}>
                        <select onChange={(e) => setListSelection(e.target.value)} className="select select-bordered w-full max-w-xs">
                            {gamelist_options}
                        </select>
                        <button type="submit" className="btn btn-primary">Add Game</button>
                    </form>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <button className="btn btn-primary" onClick={()=>document.getElementById('addGameToListModal').showModal()}>Add to List</button>

            {writeReview ? <ReviewForm game={game}/> : <button className="btn btn-primary" onClick={() => setWriteReview(!writeReview)}>Write a Review</button>}
            
            <img src={game.background_image} />
            <img src={game.background_image_additional} />
            <p dangerouslySetInnerHTML={{__html: game.description}}></p>
            <p>Developers: {game_developers}</p>
            <p>Genres: {game_genres}</p>
            <p>Platforms: {game_platforms}</p>
            <p>Publishers: {game_publishers}</p>
            <p>Tags: {game_tags}</p>
            <p>Release Date: {game.released}</p>
            <p>ESRB Rating: {game_rating}</p>
            <p>Stores: {game_stores}</p>
        </>
    )
}

export default Game;