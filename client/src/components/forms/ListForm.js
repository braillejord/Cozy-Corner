import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function ListForm() {
    const [newListName, setNewListName] = useState("")
    const history = useHistory()
    const {user} = useContext(UserContext)
    
    function handleCreateNewList(e) {        
        e.preventDefault()

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
        .then((r) => r.json())
        .then(setNewListName(""))
        .then((list) => history.push(`/lists/${list.id}`))
    }
    
    return (
       <>
        <dialog id="newListModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create New List</h3>
                <form onSubmit={handleCreateNewList}>
                    <input placeholder="new list name" value={newListName} onChange={(e) => setNewListName(e.target.value)}></input>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
                <p className="py-4">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        <button className="btn" onClick={()=>document.getElementById('newListModal').showModal()}>New List</button>
       </>
    )
}

export default ListForm;