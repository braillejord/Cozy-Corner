import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import ListPreview from "../components/previews/ListPreview";
import ListForm from "../components/forms/ListForm";
import RatingCircle from "../components/RatingCircle";

function MyCorner({rerender, setRerender}) {
    const [lists, setLists] = useState()
    const [reviews, setReviews] = useState()
    const history = useHistory()

    function fetchLists() {
        fetch('/lists')
        .then(r => {
            if (r.ok) {
                r.json().then((lists) => setLists(lists))
            }
        })
    }

    if (!lists || rerender) {
        fetchLists()
        setRerender(false)
    }

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
        <tr onClick={() => history.push(`/reviews/${review.id}`)} style={{cursor: 'pointer'}}>
            <th>{review.game_name}</th>
            <td>{review.platform}</td>
            <td><RatingCircle rating={review.rating}/></td>
            <td className="review-preview-text">{review.review}</td>

        </tr>
    ))

    return (
        <>
            <h1 className="text-4xl font-semibold text-center pt-10">My Corner</h1>
            <div>
                <h1 className="text-2xl font-semibold text-left pb-3">Game Lists</h1>
                <div className="flex flex-wrap gap-4 justify-between">
                    {lists?.map((list) => (<ListPreview key={list.id} list={list}/>))}
                    {lists?.length === 0 ? <p className="text-primary">You don't have any lists yet!</p> : null}
                </div>
                <div className="pt-6 tooltip tooltip-bottom" data-tip="New List">
                    <ListForm />
                </div>
            </div>
            
            <div className="divider"></div>
            
            <div>
                <h1 className="text-2xl font-semibold text-left pb-3">Game Reviews</h1>
                {rendered_reviews?.length === 0 ? <p className="text-primary">Click on "Games" to find a game and review it!</p> : null}
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
        </>
    )
}

export default MyCorner;