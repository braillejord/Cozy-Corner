import React, {useState, useEffect} from "react";
import { NavLink, useParams } from "react-router-dom";
import MyCorner from "./MyCorner";
import GamePreview from "../previews/GamePreview";

function List() {
    const [listGames, setListGames] = useState([])
    const {id} = useParams();
    
    useEffect(() => {
        fetch(`/list/${id}`)
        .then(r => {
            if (r.ok) {
                r.json().then((games) => setListGames(games))
            }
        })
    }, [])

    return (
        <>
            <h1>This is a list.</h1>
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