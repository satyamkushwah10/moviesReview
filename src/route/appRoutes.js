import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Movies from "../pages/movies";
import MyList from "../pages/myList";
import NewPopular from "../pages/new&popular";
import TvShow from "../pages/tvShows";

function AppRoute(props) {
    return (
        <Router {...props}>
            <Routes>
                {/* React Router v6 no longer needs 'exact' */}
                <Route path="/" element={<Home />} />
                <Route path="/Movies" element={<Movies />} />
                <Route path="/mylist" element={<MyList />} />
                <Route path="/new&popular" element={<NewPopular />} />
                <Route path="/tvShows" element={<TvShow />} />
            </Routes>
        </Router>
    );
}

export default AppRoute;
