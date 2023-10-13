import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import GamePreview from "../components/previews/GamePreview";
import { NavLink } from "react-router-dom";

function List() {
    const [listGames, setListGames] = useState([])
    const [listName, setListName] = useState("")
    const history = useHistory()

    const {id} = useParams();
    
    useEffect(() => {
        fetch(`/list-games/${id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((games) => setListGames(games))
            }
        })
    }, [])

    useEffect(() => {
        fetch(`/lists/${id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((name) => setListName(name))
            }
        })
    }, [])

    function handleDeleteList(e) {
        fetch(`/lists/${id}`, {
            method: "DELETE"
        })
        .then(history.push("/"))
    }

    return (
        <>
            <h1>{listName}</h1>
            <NavLink to={"/search"}>Find a game to add to your list!</NavLink>
            {listGames.map((game) => (
                <GamePreview 
                key={game.api_id}
                {...game}
                />
            ))}
            <button onClick={(e) => handleDeleteList(e)}>Delete List</button>
        </>
    )
}

export default List;