import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";
import ListPreview from "../components/previews/ListPreview";
import ListForm from "../components/ListForm";
import ReviewPreview from "../components/previews/ReviewPreview"

function MyCorner() {
    const [lists, setLists] = useState([])
    const [reviews, setReviews] = useState([])
    const [showListForm, setShowListForm] = useState(false)
    const [newListName, setNewListName] = useState("")
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        fetch("/reviews")
        .then(r => {
            if (r.ok) {
                r.json().then((reviews) => setReviews(reviews))
            }
        })
    }, [])
    
    function fetchLists() {
        console.log("Fetching...")
        fetch('/lists')
        .then(r => {
            if (r.ok) {
                r.json().then((lists) => setLists(lists))
            }
        })
    }

    console.log(reviews)

    // fetchLists()

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
                <ListForm 
                newListName={newListName}
                setNewListName={setNewListName}
                handleCreateNewList={handleCreateNewList}
                />
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
                {reviews.map((review) => (
                    <ReviewPreview
                    key={review.id}
                    {...review}
                    />
                ))}
            </div>
        </>
    )
}

export default MyCorner;