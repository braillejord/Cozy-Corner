import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import GamePreview from "../components/previews/GamePreview";
import { NavLink } from "react-router-dom";

function List({setRerender}) {
    const [list, setList] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const history = useHistory()
    const {id} = useParams();

    useEffect(() => {
        fetch(`/lists/${id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((list) => setList(list))
            }
        })
    }, [])

    function handleDeleteList() {
        fetch(`/lists/${id}`, {
            method: "DELETE"
        })
        .then(history.push("/"))
        .then(setRerender(true))
    }

    return (
        <>
            <h1 className="text-3xl font-semibold text-center pt-10">{list.name}</h1>
            <div className="flex justify-end gap-2">
                <button className="btn" onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide Details" : "Show Details"}</button>
                <button className="btn btn-primary"><NavLink to={"/search-games"}>Find a Game</NavLink></button>
                <button className="btn" onClick={()=>document.getElementById('deleteListModal').showModal()}>Delete List</button>     
            </div>
            {showDetails ?
            <>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Game</th>
                            <th>Currently Playing</th>
                            <th>Played</th>
                            <th>Finished</th>
                            <th>Endless</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {list.gamelist_items?.map((game) => (
                                <GamePreview key={game.api_id} game={game} showDetails={showDetails} setShowDetails={setShowDetails}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
            :
            <div class="flex flex-wrap gap-8 justify-center">
                {list.gamelist_items?.map((game) => (
                    <GamePreview key={game.api_id} game={game} showDetails={showDetails} setShowDetails={setShowDetails}/>
                ))}
            </div> 
            }

            <dialog id="deleteListModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this list?</h3>
                    <button onClick={() => handleDeleteList()} type="submit" className="btn btn-primary">Delete List</button>
                    <p className="pt-4 text-xs">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </>
    )
}

export default List;