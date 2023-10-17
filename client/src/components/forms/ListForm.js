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
            <div className="modal-box text-left">
                <h3 className="font-bold text-lg">Create New List</h3>
                <p>(owned, backlog, wishlist, etc.)</p>
                <form className="flex justify-between" onSubmit={handleCreateNewList}>
                    <input className="w-80" value={newListName} onChange={(e) => setNewListName(e.target.value)}></input>
                    <button type="submit" className=" btn btn-primary">Create List</button>
                </form>
                <p className="pt-4 text-xs">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        
        
        <button className="btn" onClick={()=>document.getElementById('newListModal').showModal()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        </button>
       </>
    )
}

export default ListForm;