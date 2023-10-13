import React from "react";
import { NavLink } from "react-router-dom";

function ReviewPreview({id, platform, rating, review, game_name}) {
    return (
        <>
            <NavLink to={`/reviews/${id}`}>
                <p>Game Name: {game_name}</p>
                <p>Rating: {rating} | Platform: {platform}</p>
                <p>Review Text: {`${review.substring(0, 50)}...`}</p>
            </NavLink>

        </>
    )
}

export default ReviewPreview;