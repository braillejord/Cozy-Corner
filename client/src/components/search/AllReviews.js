import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import ReviewPreview from "../previews/ReviewPreview";

function AllReviews() {
    const [reviews, setReviews] = useState([])
    const [platforms, setPlatforms] = useState()
    
    useEffect(() => {
        fetch("/all-reviews")
        .then((r) => {
            if (r.ok) {
                r.json().then((reviews) => setReviews(reviews))
            }
        })
    }, [])


    function fetchPlatforms() {
        fetch("/platforms")
        .then((r) => {
            if (r.ok) {
                r.json().then((platforms) => setPlatforms(platforms))
            }
        })
    }

    if (!platforms) fetchPlatforms()

    let rendered_reviews = reviews.map((review) => (
        <tr>
                <td>{review.game_name}</td>
                <td>{review.platform}</td>
                <td>{review.rating} / 5</td>
                <NavLink to={`/reviews/${review.id}`}>
                    <td>{`${review.review.substring(0, 50)}...`}</td>
                </NavLink>
        </tr>
    ))

    
    if (!platforms) {
        return <p>Loading...</p>
    }

    let rendered_platforms = platforms.results.map((platform) => (
        <li><a>{platform.name}</a></li>
    ))
    
    return (
        <>
            <h1>All Reviews</h1>
            <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn m-1">Filter by Rating</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>0+</a></li>
                    <li><a>1+</a></li>
                    <li><a>2+</a></li>
                    <li><a>3+</a></li>
                    <li><a>4+</a></li>
                </ul>
            </div>

            <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn m-1">Filter by Platform</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {rendered_platforms}
                </ul>
            </div>
            
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Game</th>
                        <th>Rating</th>
                        <th>Platform</th>
                        <th>Review</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rendered_reviews}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllReviews;