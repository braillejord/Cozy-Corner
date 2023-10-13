import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useHistory } from "react-router-dom";
import { format } from 'date-fns';

function Review() {
    const [review, setReview] = useState([])
    const [name, setName] = useState("")
    const history = useHistory()
    const {id} = useParams();
    const {user, setUser} = useContext(UserContext)
    
    const originalDate = new Date(review.created_at)
    const formattedDate = format(originalDate, 'PPP')
    
    useEffect(() => {
        fetch(`/reviews/${id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((review) => setReview(review)).then(fetchUsername())
            }
        })
    }, [])

    function fetchUsername() {
        fetch(`/user/${review.user_id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((name) => setName(name))
            }
        })
    }

    function handleDeleteReview() {
        fetch(`/reviews/${id}`, {
            method: "DELETE"
        })
        .then(history.push("/"))
    }


    return (
        <>
            <h1>{review.game_name}</h1>
            <p>Written By: {name}</p>
            <p>{formattedDate}</p>
            <p>Game Rating: {review.rating} out of 5</p>
            <p>Platform: {review.platform}</p>
            <p>Game Review: {review.review}</p>
            {review.user_id == user.id
            ? <button onClick={() => handleDeleteReview()}>Delete Review</button>
            : null
            }
        </>
    )
}

export default Review;