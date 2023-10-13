import React, {useState, useEffect} from "react";
import ListPreview from "../components/previews/ListPreview";
import ListForm from "../components/forms/ListForm";
import ReviewPreview from "../components/previews/ReviewPreview"

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

    return (
        <div className="container flex">
            <div className="bg-base-300 rounded-box place-items-center">
                <ListForm />
                {lists?.map((list) => (<ListPreview key={list.id} {...list}/>))}
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="bg-base-300 rounded-box place-items-center">
                {reviews?.map((review) => (<ReviewPreview key={review.id} {...review}/>))}
            </div>
        </div>
    )
}

export default MyCorner;