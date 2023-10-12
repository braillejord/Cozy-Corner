import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";

function Review() {
    const [review, setReview] = useState([])
    const history = useHistory()
    const {id} = useParams();
    
    useEffect(() => {
        fetch(`/reviews/${id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((review) => setReview(review))
            }
        })
    }, [])

    function handleDeleteReview() {
        fetch(`/reviews/${id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then(history.push("/"))
            }
        })
    }

    return (
        <>
            <h1>{review.game_name}</h1>
            <p>{review.created_at}</p>
            <p>{review.rating}</p>
            <p>{review.platform}</p>
            <p>{review.review}</p>
            <button>Edit Review</button>
            <button onClick={() => handleDeleteReview()}>Delete Review</button>
        </>
    )
}

export default Review;