import React, {useState, useEffect, useContext} from "react";
import ReviewForm from "../components/forms/ReviewForm";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { format, parseISO } from 'date-fns';

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

    console.log(game)

    useEffect(() => {
        fetch(`/user-lists/${user.id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((lists) => setUserLists(lists))
            }
        })
    }, [])

    if (!game) {
        return <p>Loading...</p>
    }

    let game_developers
    if (game.developers) {
        game_developers = game.developers.map((developer) => developer.name).join(', ')
    }
    
    let game_genres
    if (game.genres) {
        game_genres = game.genres.map((genre) => genre.name).join(', ')
    }
    
    let game_platforms
    if (game.platforms) {
        game_platforms = game.platforms.map((platform) => platform.platform.name).join(', ')
        }
    
    let game_publishers
    if (game.publishers) {
        game_publishers = game.publishers.map((publisher) => publisher.name).join(', ')
        }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let game_tags
    if (game.tags) {
        game_tags = game.tags.map((tag) => capitalizeFirstLetter(tag.name)).join(', ')
        }
    
    let game_stores
    if (game.stores) {
        game_stores = game.stores.map((store) => store.store.name).join(', ')
        }

    let game_rating
    if (game.esrb_rating) {
        game_rating = game.esrb_rating.name
    }

    let game_description
    if (game.description) {
        game_description = game.description.replace(/\n/g, '<br />')
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


    const gamelist_options = userLists.map((list) => (
        <option value={list.id} name={list.name}>{list.name}</option>
    ))

    let formattedDate
    if (game.released) {
        const parsedDate = parseISO(game.released)
        formattedDate = format(parsedDate, 'MMM d, yyyy')
    }
            
    return (
        <div className="flex flex-col space-y-5 px-8">    
            {gameAdded ? 
            <div className="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Game added to your list!</span>
            </div>
            :
            null}     

            <dialog id="addGameToListModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Choose a list to add this game to!</h3>
                    <form onSubmit={(e) => handleCreateListItem(e)}>
                        <select onChange={(e) => setListSelection(e.target.value)} className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Choose a list:</option>
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
            
            {/* image, game name, release date, esrb rating, add to list & review buttons */}
            <div className="card card-side bg-neutral-content shadow-xl">
                <figure><img className="w-96" src={game.background_image} alt={game.name}/></figure>
                <div className="card-body">
                    <h2 className="card-title text-4xl">{game.name}</h2>
                    <p>{formattedDate} | {game_rating} </p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={()=>document.getElementById('addGameToListModal').showModal()}>Add to List</button>
                        <button className="btn btn-primary" onClick={() => setWriteReview(!writeReview)}>Write a Review</button>
                    </div>
                </div>
            </div>
            
            {/* review form in a card */}
            {writeReview ? <ReviewForm game={game}/> : null}
            
            {/* game description */}
            <div className="card bg-neutral-content shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">About</h2>
                    <p dangerouslySetInnerHTML={{ __html: game_description }}></p>
                </div>
            </div>

            {/* other game details */}
            <div className="card bg-neutral-content shadow-xl">
                <div className="card-body">
                <div className="overflow-x-auto">
                    <h2 className="card-title"> More Details</h2>
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>Developer(s)</th>
                            <td>{game_developers}</td>
                        </tr>
                        <tr>
                            <th>Platform(s)</th>
                            <td>{game_platforms}</td>
                        </tr>
                        <tr>
                            <th>Publisher(s)</th>
                            <td>{game_publishers}</td>
                        </tr>
                        <tr>
                            <th>Genre(s)</th>
                            <td>{game_genres}</td>
                        </tr>
                        <tr>
                            <th>Tag(s)</th>
                            <td>{game_tags}</td>
                        </tr>
                        <tr>
                            <th>Store(s)</th>
                            <td>{game_stores}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Game;