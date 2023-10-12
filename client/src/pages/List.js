import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import GamePreview from "../components/previews/GamePreview";

function List() {
    const [listGames, setListGames] = useState([])
    const [listName, setListName] = useState("")
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

    return (
        <>
            <h1>{listName}</h1>
            {listGames.map((game) => (
                <GamePreview 
                key={game.api_id}
                {...game}
                />
            ))}
        </>
    )
}

export default List;