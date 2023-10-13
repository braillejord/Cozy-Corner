import React, {useState, useEffect} from "react";
import ReviewPreview from "../previews/ReviewPreview";

function AllReviews() {
    const [reviews, setReviews] = useState([])
    
    useEffect(() => {
        fetch("/all-reviews")
        .then(r => {
            if (r.ok) {
                r.json().then((reviews) => setReviews(reviews))
            }
        })
    }, [])

    console.log(reviews)

    let rendered_reviews
    if (reviews) {
        rendered_reviews = reviews.map((review) => (
            <ReviewPreview
            key={review.id}
            {...review}
            />
        ))
    }
    
    return (
        <>
            <h1>All Reviews</h1>
            {rendered_reviews}
        </>
    )
}

export default AllReviews;