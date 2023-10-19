import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function EditListForm({listName, listId}) {
    const [newListName, setNewListName] = useState(listName)
    const history = useHistory()
    const {user} = useContext(UserContext)
    
    function handleEditListName(e) {        
        e.preventDefault()

        const new_list_name = {
            name: newListName,
        }

        console.log(new_list_name)

        fetch(`/lists/${listId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(new_list_name)
        })
        .then((r) => r.json())
        .then(window.location.reload())
    }
    
    return (
       <>
        <dialog id="editListModal" className="modal">
            <div className="modal-box text-left">
                <h3 className="font-bold text-lg">Edit List Title</h3>
                <form className="flex justify-between" onSubmit={handleEditListName}>
                    <input className="w-80 pl-2" value={newListName} onChange={(e) => setNewListName(e.target.value)}></input>
                    <button type="submit" className=" btn btn-primary">Edit Title</button>
                </form>
                <p className="pt-4 text-xs">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        
        
        <p className="flex flex-wrap content-end font-semibold" style={{cursor: 'pointer'}} onClick={() => document.getElementById('editListModal').showModal()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 pb-1">
            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
        </svg>
        </p>
    </>
    )
}

export default EditListForm;