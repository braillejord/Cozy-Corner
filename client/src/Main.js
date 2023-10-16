import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import AllGames from "./components/search/AllGames"
import AllReviews from "./components/search/AllReviews"
import Game from "./pages/Game";
import Review from "./pages/Review";
import List from "./pages/List";
import MyCorner from "./pages/MyCorner";
import GameSearchResults from "./components/search/GameSearchResults";

function Main() {
    const [searchInput, setSearchInput] = useState("")

    return (
        <>
            <NavBar />
            <div className="flex flex-col space-y-5 px-8">
                <Switch>
                    <Route path="/search-games">
                        <AllGames 
                        setSearchInput={setSearchInput}
                        />
                    </Route>
                    <Route path="/search-reviews">
                        <AllReviews />
                    </Route>
                    <Route path="/search-results">
                        <GameSearchResults 
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        />
                    </Route>
                    <Route path="/games/:api_id">
                        <Game />
                    </Route>
                    <Route path="/reviews/:id">
                        <Review />
                    </Route>
                    <Route path="/lists/:id">
                        <List />
                    </Route>
                    <Route exact path="/">
                        <MyCorner />
                    </Route>
                    <Route path="*">
                        <h1>404 Not Found</h1>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default Main;
