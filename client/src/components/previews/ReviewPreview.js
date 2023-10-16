import React from "react";
import { NavLink } from "react-router-dom";
import RatingCircle from "../RatingCircle";

function ReviewPreview({id, platform, rating, review, game_name}) {    
    return (
        <>
            <NavLink to={`/reviews/${id}`}>
                <div className="card w-72 bg-neutral text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">{game_name}</h2>
                        <p>{platform}</p>
                        <RatingCircle rating={rating}/>
                        <p>{`"${review.substring(0, 80)}..."`}</p>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default ReviewPreview;