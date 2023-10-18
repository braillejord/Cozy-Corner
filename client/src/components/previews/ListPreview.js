import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function ListPreview({list}) {
    const [color, setColor] = useState(list.card_color)
    
    function chooseCardColor(e) {
        const userChoice = e.target.name
        
        let colorObj
        
        if (userChoice === "maroon") {
            setColor("bg-primary h-24 rounded-t-2xl")
            colorObj = {card_color: "bg-primary h-24 rounded-t-2xl"}
        } else if (userChoice === "bright red") {
            setColor("bg-secondary-focus h-24 rounded-t-2xl")
            colorObj = {card_color: "bg-secondary-focus h-24 rounded-t-2xl"}
        } else if (userChoice === "orange") {
            setColor("bg-warning h-24 rounded-t-2xl")
            colorObj = {card_color: "bg-warning h-24 rounded-t-2xl"}
        } else if (userChoice === "copper") {
            setColor("bg-accent h-24 rounded-t-2xl")
            colorObj = {card_color: "bg-accent h-24 rounded-t-2xl"}
        } else if (userChoice === "teal green") {
            setColor("bg-success h-24 rounded-t-2xl")
            colorObj = {card_color: "bg-success h-24 rounded-t-2xl"}
        } else if (userChoice === "sky blue") {
            setColor("bg-info h-24 rounded-t-2xl")
            colorObj = {card_color: "bg-info h-24 rounded-t-2xl"}
        }

        fetch(`/lists/${list.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }, body: JSON.stringify(colorObj)
        })
    }

    return (
        <div className="card card-compact w-80 bg-base-100 shadow-xl">
                <div className={color}></div>
                <div className="card-body">
                    <div className="flex flex-wrap justify-between">
                        <NavLink to={`/lists/${list.id}`}>
                            <h2 className="link link-hover card-title shortened-card-title text-lg list-name-preview" style={{margin: "0"}}>{list.name}</h2>
                        </NavLink>
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div className="tooltip tooltip-bottom" data-tip="Card Colors">
                                <label tabIndex={0} className="m-1 text-2xl" style={{cursor: 'pointer'}}>...</label>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a onClick={(e) => chooseCardColor(e)} name="maroon">Maroon</a></li>
                                <li><a onClick={(e) => chooseCardColor(e)} name="bright red">Bright Red</a></li>
                                <li><a onClick={(e) => chooseCardColor(e)} name="orange">Orange</a></li>
                                <li><a onClick={(e) => chooseCardColor(e)} name="copper">Copper</a></li>
                                <li><a onClick={(e) => chooseCardColor(e)} name="teal green">Teal Green</a></li>
                                <li><a onClick={(e) => chooseCardColor(e)} name="sky blue">Sky Blue</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ListPreview;