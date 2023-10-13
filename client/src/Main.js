import React from "react";
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import AllGames from "./components/search/AllGames"
import AllReviews from "./components/search/AllReviews"
import Game from "./pages/Game";
import Review from "./pages/Review";
import List from "./pages/List";
import MyCorner from "./pages/MyCorner";

function Main() {
    return (
        <>
            <NavBar />
            <Logo />
            <Switch>
                <Route path="/search-games">
                    <AllGames />
                </Route>
                <Route path="/search-reviews">
                    <AllReviews />
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
        </>
    )
}

export default Main;
