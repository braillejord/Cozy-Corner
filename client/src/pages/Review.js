import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useHistory } from "react-router-dom";
import { format } from 'date-fns';

function Review() {
    const [response, setResponse] = useState()
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

    return (
        <>
            <h1>Game Name: {response.review.game_name}</h1>
            <p>Written By: {response.username.username}</p>
            <p>{formattedDate}</p>
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

            <p>Platform: {response.review.platform}</p>
            <p>Game Review: {response.review.review}</p>
            {response.review.user_id == user.id
            ? 
            <>
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
            : null
            }
        </>
    )
}

export default Review;