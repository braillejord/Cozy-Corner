import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";
import ListPreview from "../components/previews/ListPreview";

function MyCorner() {
    const [lists, setLists] = useState([])
    const [showListForm, setShowListForm] = useState(false)
    const [newListName, setNewListName] = useState("")
    const {user, setUser} = useContext(UserContext)

    function fetchLists() {
        fetch('/lists')
        .then(r => {
            if (r.ok) {
                r.json().then((lists) => setLists(lists))
            }
        })
    }

    fetchLists()

    function handleCreateNewList(e) {
        e.preventDefault()
        setShowListForm(false)

        const new_list = {
            list_name: newListName,
            user_id: user.id
        }

        fetch("/create-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(new_list)
        })
        .then(setNewListName(""))
        .then(fetchLists())
    }
    
    return (
        <>
            <h1>My Corner</h1>
            <div>
                <h2>Lists</h2>
                {showListForm
                ?
                <form onSubmit={handleCreateNewList}>
                    <input placeholder="new list name" value={newListName} onChange={(e) => setNewListName(e.target.value)}></input>
                    <button type="submit">Create New List</button>
                </form>
                :
                <button onClick={() => setShowListForm(true)}>Create New List</button>
                }
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