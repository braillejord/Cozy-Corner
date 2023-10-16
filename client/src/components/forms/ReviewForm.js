import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function ReviewForm({game}) {
    const [platformSelection, setPlatformSelection] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState()
    const [writeReview, setWriteReview] = useState(false)
    const history = useHistory()
    const {user} = useContext(UserContext)

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
    }

    const platform_options = game.platforms.map((platform) => (
        <option value={platform.platform.name} name={platform.platform.name}>{platform.platform.name}</option>
    ))

    return (
        <>
            <div className="card bg-neutral-content shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Review</h2>
                    <form>
                        <div className="flex flex-col space-y-5 px-8">
                            <div className="flex justify-around">
                                <div onChange={(e) => setRating(parseFloat(e.target.value))} className="rating rating-lg rating-half" required>
                                    <input type="radio" name="rating-10" value="0" className="rating-hidden"/>
                                    <input type="radio" name="rating-10" value="0.5" className="mask mask-heart bg-primary mask-half-1"/>
                                    <input type="radio" name="rating-10" value="1" className="mask mask-heart bg-primary mask-half-2" />
                                    <input type="radio" name="rating-10" value="1.5" className="mask mask-heart bg-secondary-focus mask-half-1"/>
                                    <input type="radio" name="rating-10" value="2" className="mask mask-heart bg-secondary-focus mask-half-2" />
                                    <input type="radio" name="rating-10" value="2.5" className="mask mask-heart bg-warning mask-half-1" />
                                    <input type="radio" name="rating-10" value="3" className="mask mask-heart bg-warning mask-half-2" />
                                    <input type="radio" name="rating-10" value="3.5" className="mask mask-heart bg-success mask-half-1" />
                                    <input type="radio" name="rating-10" value="4" className="mask mask-heart bg-success mask-half-2" />
                                    <input type="radio" name="rating-10" value="4.5" className="mask mask-heart bg-info mask-half-1" />
                                    <input type="radio" name="rating-10" value="5" className="mask mask-heart bg-info mask-half-2" />
                                </div>

                                <select onChange={(e) => setPlatformSelection(e.target.value)} className="select select-bordered w-full max-w-xs" required>
                                    <option disabled selected>Platform played on:</option>
                                    {platform_options}
                                </select>
                            </div>
                            
                            <textarea onChange={(e) => setReview(e.target.value)} value={review} className="textarea textarea-bordered" placeholder="Write your review here!"></textarea>

                            <div className="card-actions justify-center">
                                <button type="submit" onClick={(e) => handleSubmitReview(e)} className="btn btn-primary">Submit Review</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            
        </>
    )
}

export default ReviewForm;