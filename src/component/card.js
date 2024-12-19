import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./card.css";

export default function Cards(props) {
    const [showModal, setShowModal] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle opening the modal and fetching movie data
    const handleShowModal = async () => {
        setShowModal(true);
        await fetchMovieDetails(props.data.imdbID); // Fetch movie details when modal is opened
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Function to fetch movie details from OMDB API
    const fetchMovieDetails = async (imdbID) => {
        setLoading(true);
        setError(null); // Reset any previous errors

        try {
            const response = await axios.get(`https://omdbapi.com/?apikey=4e9e8ed7&i=${imdbID}`);
            setMovieDetails(response.data); // Store the movie details in state
        } catch (err) {
            setError("Failed to fetch movie details.");
        } finally {
            setLoading(false); // Stop loading once the API request is complete
        }
    };

    return (
        <>
            {/* Card Button */}

            {/* <div style={{ paddingTop: "25px",}}> */}
            <div
                className="card"
                style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    border: "0px",
                    color: "transparent",
                }}
            >
                <button
                    style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        border: "0px",
                        color: "transparent",
                        overflow: "auto",
                        scrollbarWidth: "none",
                    }}
                    onClick={handleShowModal}
                >
                    <img src={props.data.Poster} alt={props.data.Title} style={{ width: "100%" }} />
                    <div className="container">
                        <h4>
                            <b>{props.data.Title}</b>
                        </h4>
                    </div>
                </button>
            </div>
            {/* </div> */}

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.data.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            <p>
                                <b>Year:</b> {movieDetails?.Year}
                            </p>
                            <p>
                                <b>Genre::</b> {movieDetails?.Genre}
                            </p>
                            <p>
                                <b>Director:</b> {movieDetails?.Director}
                            </p>
                            <p>
                                <b>Plot:</b> {movieDetails?.Plot}
                            </p>
                            <p>
                                <b>IMDB Rating:</b> {movieDetails?.imdbRating}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
