import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import logo from "../img/61020.jpg";
import "./navbar.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Cards from "./card";

function NavScrollExample() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setShowSearchModal(true);

        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=4e9e8ed7&s=${searchQuery}`);
            if (response.data.Search) {
                setSearchResults(response.data.Search);
            } else {
                setError("No results found.");
            }
        } catch (err) {
            setError("Failed to fetch search results.");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSearchModal = () => {
        setShowSearchModal(false);
        setSearchResults([]);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-dark" variant="dark">
                <Container fluid>
                    {/* Logo */}
                    <Navbar.Brand href="#">
                        <img
                            alt="Logo"
                            width="55"
                            height="55"
                            className="d-inline-block align-top rounded-circle" // Adding rounded-circle class
                            src={logo}
                        />
                    </Navbar.Brand>

                    {/* Navbar Toggle for mobile */}
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "200px" }} navbarScroll>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/Movies">Movies</Nav.Link>
                            <Nav.Link href="/new&popular">New & Popular</Nav.Link>
                            <Nav.Link href="/tvShows">TV Shows</Nav.Link>
                            <Nav.Link href="/mylist">List</Nav.Link>
                        </Nav>

                        {/* Search Form */}
                        <form className="d-flex" onSubmit={handleSearchSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
                            <button className="btn btn-outline-primary" type="submit">
                                Search
                            </button>
                        </form>
                    </Navbar.Collapse>
                </Container>

                <Modal show={showSearchModal} onHide={handleCloseSearchModal} centered dialogClassName="larger-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Search Results</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="no-scroll-modal-body">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : searchResults.length > 0 ? (
                            <div className="row g-4 flex-nowrap">
                                {" "}
                                {/* Single row layout for cards */}
                                {searchResults.map((result) => (
                                    <div className="col-12" key={result.imdbID}>
                                        <Cards data={result} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleCloseSearchModal}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </Navbar>
        </>
    );
}

export default NavScrollExample;
