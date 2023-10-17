import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import ListPreview from "../components/previews/ListPreview";
import ListForm from "../components/forms/ListForm";
import RatingCircle from "../components/RatingCircle";

function MyCorner() {
    const [lists, setLists] = useState()
    const [reviews, setReviews] = useState()


    function fetchLists() {
        fetch('/lists')
        .then(r => {
            if (r.ok) {
                r.json().then((lists) => setLists(lists))
            }
        })
    }

    if (!lists) fetchLists()

    function fetchReviews() {
        fetch("/reviews")
        .then(r => {
            if (r.ok) {
                r.json().then((reviews) => setReviews(reviews))
            }
        })
    }
    
    if (!reviews) fetchReviews()


    let rendered_reviews = reviews?.map((review) => (        
        <tr>
                <th>{review.game_name}</th>
                <td>{review.platform}</td>
                <td><RatingCircle rating={review.rating}/></td>
                <NavLink to={`/reviews/${review.id}`}>
                    <td className="review-preview-text">{`${review.review.substring(0, 10)}...`}</td>
                </NavLink>
        </tr>
    ))

    return (
        <>
            <h1 className="text-3xl font-semibold text-center">My Corner</h1>
            <div className="flex">
                <div className="flex-1">
                    <h1 className="text-xl font-semibold text-center">Game Lists</h1>
                    <ListForm />
                    {lists?.map((list) => (<ListPreview key={list.id} list={list}/>))}
                </div>
                
                <div className="divider divider-horizontal"></div>
                
                <div className="flex-1">
                    <h1 className="text-xl font-semibold text-center">Game Reviews</h1>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Game</th>
                                <th>Platform</th>
                                <th>Rating</th>
                                <th>Review</th>
                            </tr>
                            </thead>
                            <tbody>
                                {rendered_reviews}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyCorner;