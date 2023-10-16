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

    console.log(response.review)
    
    return (
        <>
           <div className="card bg-neutral-content shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl">
                        {response.review.game_name} 
                        <div className="rating rating-half">
                            <input type="radio" name="rating-10" value="0" className="rating-hidden" disabled />
                            <input type="radio" name="rating-10" value="0.5" className="mask mask-heart bg-primary mask-half-1" disabled />
                            <input type="radio" name="rating-10" value="1" className="mask mask-heart bg-primary mask-half-2" disabled />
                            <input type="radio" name="rating-10" value="1.5" className="mask mask-heart bg-secondary-focus mask-half-1" disabled />
                            <input type="radio" name="rating-10" value="2" className="mask mask-heart bg-secondary-focus mask-half-2" disabled />
                            <input type="radio" name="rating-10" value="2.5" className="mask mask-heart bg-warning mask-half-1" disabled />
                            <input type="radio" name="rating-10" value="3" className="mask mask-heart bg-warning mask-half-2" disabled />
                            <input type="radio" name="rating-10" value="3.5" className="mask mask-heart bg-accent mask-half-1" disabled />
                            <input type="radio" name="rating-10" value="4" className="mask mask-heart bg-accent mask-half-2" disabled />
                            <input type="radio" name="rating-10" value="4.5" className="mask mask-heart bg-success mask-half-1" disabled />
                            <input type="radio" name="rating-10" value="5" className="mask mask-heart bg-success mask-half-2" disabled />
                        </div>
                    </h2>
                    <p className="text-accent-content text-xs">{response.username.username} | {formattedDate} | {response.review.platform}</p>
                    <p style={{whiteSpace: 'pre-line'}}>{response.review.review}</p>
                    <div className="card-actions justify-center">
                        {response.review.user_id == user.id 
                        ? <>
                        <button className="btn btn-primary" onClick={()=>document.getElementById('deleteReviewModal').showModal()}>Delete Review</button> 
                        {editing ? null : <button className="btn btn-primary" onClick={startEditing}>Edit Review</button>}</> 
                        : null}
                    </div>
                </div>
            </div>
            <div className="card bg-neutral-content shadow-xl">
                {editing ?
                    <div className="card-body">
                    <h2 className="card-title">Edit Review</h2>
                    <form onSubmit={(e) => handleSubmitReview(e)}>
                    <div className="flex flex-col space-y-5 px-8">
                        <select onChange={(e) => setRating(parseFloat(e.target.value))} className="select select-bordered w-full max-w-xs">
                            <option value="0" name="0">Keep my rating</option>
                            <option value="0.5" name="0.5">0.5</option>
                            <option value="1" name="1">1</option>
                            <option value="1.5" name="1.5">1.5</option>
                            <option value="2" name="2">2</option>
                            <option value="2.5" name="2.5">2.5</option>
                            <option value="3" name="3">3</option>
                            <option value="3.5" name="3.5">3.5</option>
                            <option value="4" name="4">4</option>
                            <option value="4.5" name="4.5">4.5</option>
                            <option value="5" name="5">5</option>
                        </select>
                        <textarea onChange={(e) => setReview(e.target.value)} value={review} className="textarea textarea-bordered h-72" placeholder="Write your review here!"></textarea>
                        
                        <div className="card-actions justify-center">
                            <button onClick={() => setEditing(false)} className="btn btn-primary">Discard Edits</button>
                            <button className="btn btn-primary" type="submit">Publish Edits</button> 
                        </div>
                    </div>
                    </form>
                </div>
                : null}
            </div>
      
            <dialog id="deleteReviewModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this review?</h3>
                    <button onClick={() => handleDeleteReview()} type="submit" className="btn btn-primary">Delete Review</button>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Review;