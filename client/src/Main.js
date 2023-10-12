import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Search from "./components/search/Search";
import Game from "./pages/Game";
import Review from "./pages/Review";
import List from "./pages/List";
import MyCorner from "./pages/MyCorner";

function Main() {
    const [searchGames, setSearchGames] = useState(false)

    return (
        <>
            <NavBar 
            setSearchGames={setSearchGames}/>
            <Logo />
            <Switch>
                <Route path="/search">
                    <Search 
                    searchGames={searchGames}
                    setSearchGames={setSearchGames}
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
        </>
    )
}

export default Main;
