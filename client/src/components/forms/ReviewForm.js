import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Rating } from "react-simple-star-rating";

function ReviewForm({game}) {
    const [rating, setRating] = useState(3)
    const [platformSelection, setPlatformSelection] = useState("")
    const [review, setReview] = useState("")
    const [writeReview, setWriteReview] = useState(false)
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    function handleSubmitReview(e) {
        e.preventDefault()

        const review_obj = {
            user_id: user.id,
            game_id: game.id,
            platform: platformSelection,
            rating: rating,
            review: review,
            game_name: game.name
        }

        fetch("/write-review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(review_obj),
        })
        .then((r) => r.json()).then((review_id) => history.push(`/reviews/${review_id}`))
        .then(setWriteReview(!writeReview))
        .then(handleReset())
    }

    function handleRating(rate) {
        setRating(rate)
    }

    function handleReset() {
        setRating(0)
    }

    const platform_options = game.platforms.map((platform) => (
        <option value={platform.platform.name} name={platform.platform.name}>{platform.platform.name}</option>
    ))

    return (
        <>
            <form>
                <Rating
                    required
                    onClick={handleRating}
                    initialValue={rating}
                    allowFraction="True"
                />
                {/* You might not need "Select a platform" when it comes to Daisy. */}
                <select required onChange={(e) => setPlatformSelection(e.target.value)}>
                    <option>Select a platform:</option>
                    {platform_options}
                </select>
                <textarea
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Review here..."></textarea>
                <button type="submit" onClick={(e) => handleSubmitReview(e)}>Submit Review</button>
            </form>
        </>
    )
}

export default ReviewForm;