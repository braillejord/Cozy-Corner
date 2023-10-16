import React from "react";

function RatingCircle({rating}) {
    let ratingColor
    
    if (rating >= 0 && rating < 1) {
        ratingColor = "bg-primary text-neutral-content rounded-full w-12"
    } else if (rating >= 1 && rating < 2) {
        ratingColor = "bg-secondary-focus text-neutral-content rounded-full w-12"
    } else if (rating >= 2 && rating < 3) {
        ratingColor = "bg-warning text-neutral-content rounded-full w-12"
    } else if (rating >= 3 && rating < 4) {
        ratingColor = "bg-accent text-neutral-content rounded-full w-12"
    } else if (rating >= 4 && rating < 5) {
        ratingColor = "bg-success text-neutral-content rounded-full w-12"
    } else {
        ratingColor = "bg-info text-neutral-content rounded-full w-12"
    }
    
    return (
        <div className="avatar placeholder">
            <div className={ratingColor}>
                <span>{rating}</span>
            </div>
        </div>
    )
}

export default RatingCircle