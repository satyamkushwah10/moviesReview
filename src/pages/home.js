import { useState, useEffect } from "react";
import NavScrollExample from "../component/navbar";
import backgroundImage from "../img/i1.jpg";
import Cards from "../component/card";
import Background from "../component/backroundimg";
import DropdownComponent from "../component/dropdown";
import axios from "axios";
function Home() {
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

            let api = await axios.get(url + type + selectyear);
            // console.log(api.data.Search);
            SetMovie(api.data.Search);
        }

        Api();
    }, [selectyear]);
    return (
        <>
            <NavScrollExample />
            <Background imageUrl={backgroundImage}>
                <div>
                    <h1 style={{ color: "white", fontSize: "45px", marginLeft: "55px" , paddingTop:"75px"}}>Movies Released in {selectyear} </h1>
                    <h2 style={{ color: "white", fontSize: "25px ", marginTop: "25px", marginLeft: "55px" }}>Select Year</h2>
                    <DropdownComponent selectyear={selectyear} SetSelectYear={handleSelectionChange} />
                    <div style={{ display: "flex", alignContent: "space-between", backgroundColor: "none", justifyContent: "center", flexWrap: "wrap" }}>
                        {movies
                            .filter((movies) => movies.Year === selectyear)
                            .map((d) => {
                                return <Cards data={d} />;
                            })}
                    </div>
                </div>
            </Background>
        </>
    );
}

export default Home;
