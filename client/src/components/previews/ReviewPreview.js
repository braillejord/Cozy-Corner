import React from "react";
import { NavLink } from "react-router-dom";

function ReviewPreview({id, platform, rating, review, game_name, created_at}) {
    return (
        <>
            <NavLink to={`/reviews/${id}`}>
                <p>Game Name: {game_name}</p>
                <p>Rating: {rating} | Platform: {platform} | Created At: {created_at}</p>
                <p>Review Text: {`${review.substring(0, 50)}...`}</p>
            </NavLink>

        </>
    )
}

export default ReviewPreview;