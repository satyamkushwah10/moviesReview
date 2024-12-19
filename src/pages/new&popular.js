import { useState, useEffect } from "react";
import Background from "../component/backroundimg";
import NavScrollExample from "../component/navbar";
import backgroundImage from "../img/i1.jpg";
import DropdownComponent from "../component/dropdown";
import axios from "axios";
import Cards from "../component/card";
function NewPopular() {
    const [selectyear, setSelectYear] = useState("2024");
    const [page, SetPage] = useState(1);

    const [movies, SetMovie] = useState([]);

    function handleSelectionChange(event) {
        setSelectYear(event.target.value);
        SetPage(1);
    }
    const handleNext = () => {
        SetPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        //Runs on every render
        async function Api() {
            let url = "https://omdbapi.com/?apikey=4e9e8ed7&s=";

            let type = "movie&y=";

            let api = await axios.get(`${url}${type}${selectyear}&page=${page}`);
            // console.log(api.data.Search);
            SetMovie(api.data.Search);
        }

        Api();
    }, [selectyear, page]);
    return (
        <>
            <Background imageUrl={backgroundImage}>
                <div>
                    <NavScrollExample />

                    <h1 style={{ color: "white", fontSize: "45px", marginLeft: "55px", paddingTop:"75px" }}>New & Popular{selectyear} Releases</h1>
                    <h2 style={{ color: "white", fontSize: "25px ", marginTop: "25px", marginLeft: "55px" }}>Select Year</h2>
                    <DropdownComponent selectyear={selectyear} SetSelectYear={handleSelectionChange} />
                    <div style={{ display: "flex", alignContent: "space-between", backgroundColor: "none", justifyContent: "center", flexWrap: "wrap" }}>
                        {movies
                            .filter((movies) => movies.Year === selectyear)
                            .map((d) => {
                                return <Cards data={d} />;
                            })}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding:"35px 20px 50px 20px" }}>
                        <button
                            onClick={() => SetPage(page - 1)}
                            disabled={page <= 1}
                            style={{
                                backgroundColor: "#383428",
                                color: "white",
                                width:"125px",
                                height:"35px"
                            }}
                        >
                            Previous
                        </button>

                        <button onClick={handleNext} style={{ backgroundColor: "#383428", color: "white", width: "126px",height:"35px" }}>
                            Next Page
                        </button>
                    </div>
                </div>
            </Background>
        </>
    );
}

export default NewPopular;
