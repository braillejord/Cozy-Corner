import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useHistory } from "react-router-dom";
import { format } from 'date-fns';

function Review() {
    const [response, setResponse] = useState()
    const [editing, setEditing] = useState(false)
    const [rating, setRating] = useState()
    const [review, setReview] = useState("")
    const history = useHistory()
    const {id} = useParams();
    const {user} = useContext(UserContext)
    
    useEffect(() => {
        fetch(`/reviews/${id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((response) => setResponse(response))
            }
        })
    }, [])

    useEffect(() => {
        if (response) {
            const radios = document.querySelectorAll('input[name="rating-10"]')
            radios[response.review.rating * 2].checked = true
        }
    }, [response])
    
    function handleDeleteReview() {
        fetch(`/reviews/${id}`, {
            method: "DELETE"
        })
        .then(history.push("/"))
    }
    
    if (!response) {
        return <p>Loading...</p>
    }

    const originalDate = new Date(response.review.created_at)
    const formattedDate = format(originalDate, 'PPP')

    function startEditing() {
        setEditing(true)
        setReview(response.review.review)
        setRating(response.review.rating)
    }
    
    function handleSubmitReview(e) {
        e.preventDefault()
        setEditing(false)

        const review_obj = {
            platform: response.review.platform,
            rating: rating,
            review: review,
        }

        fetch(`/reviews/${response.review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(review_obj),
        })
        .then(window.location.reload())
        .then(setReview(""))
        .then(setRating())
    }
    
    return (
        <>
            <h1>Game Name: {response.review.game_name}</h1>
            <p>Written By: {response.username.username}</p>
            <p>{formattedDate}</p>
            <p>Platform: {response.review.platform}</p>
            <p>Game Rating: {response.review.rating} out of 5</p>
            <div className="rating rating-lg rating-half">
                <input type="radio" name="rating-10" value="0" className="rating-hidden" disabled />
                <input type="radio" name="rating-10" value="0.5" className="mask mask-heart bg-red-400 mask-half-1" disabled />
                <input type="radio" name="rating-10" value="1" className="mask mask-heart bg-red-400 mask-half-2" disabled />
                <input type="radio" name="rating-10" value="1.5" className="mask mask-heart bg-orange-400 mask-half-1" disabled />
                <input type="radio" name="rating-10" value="2" className="mask mask-heart bg-orange-400 mask-half-2" disabled />
                <input type="radio" name="rating-10" value="2.5" className="mask mask-heart bg-yellow-400 mask-half-1" disabled />
                <input type="radio" name="rating-10" value="3" className="mask mask-heart bg-yellow-400 mask-half-2" disabled />
                <input type="radio" name="rating-10" value="3.5" className="mask mask-heart bg-lime-400 mask-half-1" disabled />
                <input type="radio" name="rating-10" value="4" className="mask mask-heart bg-lime-400 mask-half-2" disabled />
                <input type="radio" name="rating-10" value="4.5" className="mask mask-heart bg-green-400 mask-half-1" disabled />
                <input type="radio" name="rating-10" value="5" className="mask mask-heart bg-green-400 mask-half-2" disabled />
            </div>
            
            {editing 
            ? 
            <>
            <form onSubmit={(e) => handleSubmitReview(e)}>
                <select onChange={(e) => setRating(parseFloat(e.target.value))} className="select select-bordered w-full max-w-xs">
                    <option value="0" name="0">Keep my rating</option>
                    <option value="0.5" name="0.5">0.5 out of 5</option>
                    <option value="1" name="1">1 out of 5</option>
                    <option value="1.5" name="1.5">1.5 out of 5</option>
                    <option value="2" name="2">2 out of 5</option>
                    <option value="2.5" name="2.5">2.5 out of 5</option>
                    <option value="3" name="3">3 out of 5</option>
                    <option value="3.5" name="3.5">3.5 out of 5</option>
                    <option value="4" name="4">4 out of 5</option>
                    <option value="4.5" name="4.5">4.5 out of 5</option>
                    <option value="5" name="5">5 out of 5</option>
                </select>
                <textarea onChange={(e) => setReview(e.target.value)} value={review} className="textarea textarea-bordered" placeholder="Write your review here!"></textarea>
                <button className="btn" type="submit">Publish Edits</button> 
            </form>
            </>
            : <p>Game Review: {response.review.review}</p> }
            
            {response.review.user_id == user.id
            ? 
            <>
            {editing ? null : <button className="btn" onClick={startEditing}>Edit Review</button>}            
            <dialog id="deleteListModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this review?</h3>
                    <button onClick={() => handleDeleteReview()} type="submit" className="btn btn-primary">Delete Review</button>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <button className="btn" onClick={()=>document.getElementById('deleteListModal').showModal()}>Delete Review</button>
            </>
            : null}
        </>
    )
}

export default Review;