import { useState, useEffect } from "react";
import Background from "../component/backroundimg";
import NavScrollExample from "../component/navbar";
import backgroundImage from "../img/i1.jpg";
import axios from "axios";
import Cards from "../component/card";
function MyList() {
    const [page, SetPage] = useState(1);

    const [movies, SetMovie] = useState([]);

    const handleNext = () => {
        SetPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        //Runs on every render
        async function Api() {
            let url = "https://omdbapi.com/?apikey=4e9e8ed7&s=";

            let type = "movie";

            let api = await axios.get(`${url}${type}&page=${page}`);
            // console.log(api.data.Search);
            SetMovie(api.data.Search);
        }

        Api();
    }, [page]);
    return (
        <>
            <Background imageUrl={backgroundImage}>
                <div>
                    <NavScrollExample />

                    <h1 style={{ color: "white", fontSize: "45px", marginLeft: "55px" , paddingTop:"75px"}}>Lists of movies</h1>
                    <div style={{ display: "flex", alignContent: "space-between", backgroundColor: "none", justifyContent: "center", flexWrap: "wrap" }}>
                        {movies
                            // .filter((movies) => movies.Year === selectyear)
                            .map((d) => {
                                return <Cards data={d} />;
                            })}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "35px 20px 50px 20px" }}>
                        <button
                            onClick={() => SetPage(page - 1)}
                            disabled={page <= 1}
                            style={{
                                backgroundColor: "#383428",
                                color: "white",
                                width: "125px",
                                height: "35px",
                            }}
                        >
                            Previous
                        </button>

                        <button onClick={handleNext} style={{ backgroundColor: "#383428", color: "white", width: "126px", height: "35px" }}>
                            Next Page
                        </button>
                    </div>
                </div>
            </Background>
        </>
    );
}

export default MyList;
