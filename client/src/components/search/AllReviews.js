import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import ReviewPreview from "../previews/ReviewPreview";

function AllReviews() {
    const [reviews, setReviews] = useState([])
    const [platforms, setPlatforms] = useState()
    const [filteredReviews, setFilteredReviews] = useState()
    
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


    let sorted_reviews = reviews.sort((a, b) => a.rating - b.rating)
    
    let rendered_reviews = sorted_reviews.map((review) => (
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

    function filterByRating(e) {
        const rating_string = e.target.name
        const rating_number = parseInt(rating_string)

        const elem = document.activeElement
        if (elem) {
            elem?.blur()
        }

        let filtered_reviews = rendered_reviews.filter((review) => {            
            if (rating_number === 0) {
                return true
            } else if (review.props.children[2].props.children[0] >= rating_number) {
                return true
            }
        })

        setFilteredReviews(filtered_reviews)
    }

    function filterByPlatform(e) {
        console.log(e.target)
    }
    
    return (
        <>
            <h1>All Reviews</h1>
            <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn m-1">Filter by Rating</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={filterByRating} name="0">All Ratings</a></li>
                    <li><a onClick={filterByRating} name="1">1+</a></li>
                    <li><a onClick={filterByRating} name="2">2+</a></li>
                    <li><a onClick={filterByRating} name="3">3+</a></li>
                    <li><a onClick={filterByRating} name="4">4+</a></li>
                </ul>
            </div>

            <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn m-1">Filter by Platform</label>
                <ul tabIndex={0} className="h-96 overflow-y-auto block dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>All Platforms</a></li>
                    {rendered_platforms}
                </ul>
            </div>
            
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
                        {filteredReviews ? filteredReviews : rendered_reviews}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllReviews;