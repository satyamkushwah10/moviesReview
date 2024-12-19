import DropdownComponent from "../component/dropdown";
import NavScrollExample from "../component/navbar";
import { useState, useEffect } from "react";
import Background from "../component/backroundimg";
import backgroundImage from "../img/i1.jpg";
import Cards from "../component/MovieCard";
import axios from "axios";
function Movies() {
    const [selectyear, setSelectYear] = useState("2024");
    const [movies, SetMovie] = useState([]);

    function handleSelectionChange(event) {
        setSelectYear(event.target.value);
    }
    useEffect(() => {
        //Runs on every render
        async function Api() {
            let url = "https://omdbapi.com/?apikey=4e9e8ed7&s=";
            let type = "movie&y=";
            let api = await axios.get(url + type+selectyear);
            console.log(api.data.Search);
            SetMovie(api.data.Search);
        }
        Api();
    });
    return (
        <>
            <Background imageUrl={backgroundImage}>
                <NavScrollExample />

                <h1 style={{ color: "white", fontSize: "45px", marginLeft: "55px" , paddingTop:"75px"}}>Best Reviewed Movies of {selectyear} </h1>
                <h2 style={{ color: "white", fontSize: "25px ", marginTop: "25px", marginLeft: "55px" }}>Select Year</h2>

                <DropdownComponent selectyear={selectyear} SetSelectYear={handleSelectionChange} />
                <div style={{ display: "flex", alignContent: "space-evenly", justifyContent: "center", backgroundColor: "none", flexWrap: "wrap" }}>
                    {movies
                        .filter((movies) => movies.Year === selectyear)
                        .map((d) => {
                            return <Cards data={d} />;
                        })}
                    {/* {movies.map((d) => {
                        return <Cards data={d} />;
                    })} */}
                </div>
            </Background>
        </>
    );
}

export default Movies;
