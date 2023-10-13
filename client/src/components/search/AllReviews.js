import React, {useState, useEffect} from "react";
import ReviewPreview from "../previews/ReviewPreview";

function AllReviews() {
    const [reviews, setReviews] = useState([])
    const [sort, setSort] = useState("")
    
    useEffect(() => {
        fetch("/all-reviews")
        .then(r => {
            if (r.ok) {
                r.json().then((reviews) => setReviews(reviews))
            }
        })
    }, [])

    // let rendered_reviews = reviews.map((review) => (
    //         <ReviewPreview
    //         key={review.id}
    //         {...review}
    //         />
    //     ))

    function submitFilterChoice(e) {
        e.preventDefault()
        setSort(e.target.value)
    }

    let unorganized_reviews = reviews.map((review) => (<ReviewPreview key={review.id} {...review}/>))
    
    let rendered_reviews

    // WON'T GO BACK TO THE NORMAL, UNORGANIZED VERSION

    if (sort === "") {
        rendered_reviews = unorganized_reviews
    } else if (sort === "game_name") {
        const sortedByGame = reviews.sort((a,b) => a.game_name.localeCompare(b.game_name))
        rendered_reviews = sortedByGame.map(((review) => (<ReviewPreview key={review.id} {...review}/>)))
    } else if (sort === "rating") {
        const sortedByRating = reviews.sort((a,b) => a.rating - b.rating)
        rendered_reviews = sortedByRating.map(((review) => (<ReviewPreview key={review.id} {...review}/>)))
    } else if (sort === "platform") {
        const sortedByPlatform = reviews.sort((a,b) => a.platform.localeCompare(b.platform))
        rendered_reviews = sortedByPlatform.map(((review) => (<ReviewPreview key={review.id} {...review}/>)))
    }
    
    return (
        <>
            <h1>All Reviews</h1>
            <label>Sort by:</label>
            <select onChange={(e) => submitFilterChoice(e)}>
                <option value=""></option>
                <option value="game_name">Game</option>
                <option value="rating">Rating</option>
                <option value="platform">Platform</option>
                {/* <option>Player</option> */}
            </select>
            {rendered_reviews}
        </>
    )
}

export default AllReviews;