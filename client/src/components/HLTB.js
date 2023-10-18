import React, {useState, useEffect} from "react";

function HLTB({game}) {
    const [results, setResults] = useState()
    
    function fetchResponse() {
        if (game) {
            fetch(`/hltb/${game}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((results) => setResults(results))
                }
            })
        }
    }

    console.log(results)

    let main
    let mainPlusSides
    let completionist
    let allStyles

    if (!results) {
        fetchResponse()
    } else {
        main = Math.round(results.comp_main / 3600)
        mainPlusSides = Math.round(results.comp_plus / 3600)
        completionist = Math.round(results.comp_100 / 3600)
        allStyles = Math.round(results.comp_all / 3600)
    }

    return (
        <>
        {results?.length === 0 ? null :
        <div className="card bg-neutral-content shadow-xl">
            <div className="card-body">
                <h2 className="card-title">How Long to Beat</h2>
                <div className="flex justify-evenly">
                    <div className="text-center">
                        <p className="text-xl font-semibold">{main} hrs</p>
                        <p>Main Story</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold">{mainPlusSides} hrs</p>
                        <p>Main + Sides</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold">{completionist} hrs</p>
                        <p>Completionist</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold">{allStyles} hrs</p>
                        <p>All Styles</p>
                    </div>
                </div>
            </div>
        </div>
        }
    </>
    )
}

export default HLTB