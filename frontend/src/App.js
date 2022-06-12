import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Movie from './components/Movie';
import MoviesList from './components/MovieList';
import AddReview from './components/AddReview';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <div className="App">
      <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">Movie Practice Web</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link style={{ textDecoration: "none" }} to="/">Movies&nbsp;</Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<MoviesList />}></Route>
        <Route path="/api/movies/id/:id" element={<Movie />}></Route> 
        <Route path="/review/:id" element={<AddReview />}></Route>
      </Routes>
    </div>
  );
}

export default App;
