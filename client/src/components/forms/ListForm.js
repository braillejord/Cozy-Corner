import React, {useState} from "react";

function ListForm({newListName, setNewListName, handleCreateNewList}) {
    return (
        <form onSubmit={handleCreateNewList}>
            <input placeholder="new list name" value={newListName} onChange={(e) => setNewListName(e.target.value)}></input>
            <button type="submit">Create New List</button>
        </form>
    )
}

export default ListForm;