import React, {useState, useEffect} from "react";
import Reviews from "./Review";
import ListPreview from "../previews/ListPreview";

function MyCorner() {
    const [lists, setLists] = useState([])

    useEffect(() => {
        fetch('/lists')
        .then(r => {
            if (r.ok) {
                r.json().then((lists) => setLists(lists))
            }
        })
    }, [])
    
    return (
        <>
            <h1>My Corner</h1>
            <div>
                <h2>Lists</h2>
                {lists.map((list) => (
                    <ListPreview
                    key={list.id}
                    {...list}
                    />
                ))}
            </div>
            <div>
                <h2>Reviews</h2>
            </div>
        </>
    )
}

export default MyCorner;