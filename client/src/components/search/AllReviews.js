import React, {useState, useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";
import RatingCircle from "../RatingCircle";

function AllReviews() {
    const [reviews, setReviews] = useState([])
    const [platforms, setPlatforms] = useState()
    const [filteredReviews, setFilteredReviews] = useState()
    const [searchInput, setSearchInput] = useState("")
    const history = useHistory()
    
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
        <tr onClick={() => history.push(`/reviews/${review.id}`)}>
                <th>{review.game_name}</th>
                <td>{review.platform}</td>
                <td><RatingCircle rating={review.rating}/></td>
                <td className="review-preview-text">{review.review}</td>
        </tr>
    ))
    
    if (!platforms) {
        return <p className="pt-5">Loading...</p>
    }

    let rendered_platforms = platforms.results.map((platform) => (
        <li><a onClick={filterByPlatform} name={platform.name}>{platform.name}</a></li>
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
            } else if (review.props.children[2].props.children.props.rating >= rating_number) {
                return true
            }
        })

        setFilteredReviews(filtered_reviews)
    }

    function filterByPlatform(e) {
        const platform_name = e.target.name

        const elem = document.activeElement
        if (elem) {
            elem?.blur()
        }

        let filtered_reviews = rendered_reviews.filter((review) => {
            if (platform_name === "all") {
                return true
            } else if (review.props.children[1].props.children === platform_name) {
                return true
            }
        })

        setFilteredReviews(filtered_reviews)
    }
    
    return (
        <>
            <h1 className="text-4xl font-semibold text-center pt-10">All Reviews</h1>
            <div className="flex justify-between">
                <div>
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn btn-primary m-1">Filter by Rating</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="font-semibold"><a onClick={filterByRating} name="0">All Ratings</a></li>
                            <li><a onClick={filterByRating} name="1">1+</a></li>
                            <li><a onClick={filterByRating} name="2">2+</a></li>
                            <li><a onClick={filterByRating} name="3">3+</a></li>
                            <li><a onClick={filterByRating} name="4">4+</a></li>
                        </ul>
                    </div>

                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn btn-primary m-1">Filter by Platform</label>
                        <ul tabIndex={0} className="h-96 overflow-y-auto block dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="font-semibold"><a onClick={filterByPlatform} name="all">All Platforms</a></li>
                            {rendered_platforms}
                        </ul>
                    </div>
                </div>
                <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search reviews by game..." className="input input-bordered w-full max-w-xs" />
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
                        {filteredReviews 
                        ? filteredReviews.filter((review) => searchInput ? review.props.children[0].props.children.toLowerCase().includes(searchInput.toLowerCase()) : true) 
                        : rendered_reviews.filter((review) => searchInput ? review.props.children[0].props.children.toLowerCase().includes(searchInput.toLowerCase()) : true)
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllReviews;