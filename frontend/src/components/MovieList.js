import React, {useState, useEffect} from 'react';
import { getAll, get, find, getRatings } from '../services/movies';
import { Link } from 'react-router-dom';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    useEffect(() =>{
        retrieveMovies();
        retrieveRatings();
        retrieveMovieById();
    },[])

    const retrieveMovies = async () => {
        try {
            const response = await getAll();
            setMovies(response.data.docs);            
        } catch (err) {
            console.log(err.message);
        }
    }

    const retrieveRatings = async() => {
        try {
            const response = await getRatings();
            setRatings(["All Ratings"].concat(response.data));
        } catch (err) {
            console.log(err.message);
        }
    }   
    
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }
        
    const findMovie = async(query, by) => {
        try {
            const response = await find(query, by);
            setMovies(response.data);
        } catch (err) {
            console.log(err.message);
        }
    } 

    const findByTitle = (e) => {
        e.preventDefault();
        findMovie(searchTitle, "title");
    } 


    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating);
    }

    const findByRating = (e) => { 
        e.preventDefault();
        if(searchRating === "All Ratings"){
            retrieveMovies();
        } else {
            findMovie(searchRating, "rated");
        }
    }


    const retrieveMovieById = async(id) => {
        try {
            const response = await get(id);
            setMovies(response.docs);
            
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="App">
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" style={{ width: "20%", display: "inline-flex" }} type="search" value={searchTitle} onChange={onChangeSearchTitle} placeholder="By title" aria-label="Search"></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={findByTitle} >Search</button>
            </form>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" style={{ width: "20%", display: "inline-flex" }} list="datalistOptions" type="search" onChange={onChangeSearchRating} placeholder="By rating" aria-label="Search"></input>
                <datalist id="datalistOptions">
                    {ratings.map(rating =>{
                        return(
                            <option value={rating}>{rating}</option>
                        )
                    })}
                </datalist>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={findByRating} type="submit">Search</button>
            </form>
            <br/>
            <div className='row' style={{ justifyContent: "center" }}>
                {movies.map((movie) => {
                    return (
                    <div className="card-inline" style={{width: "18rem"}}>
                        <img src={movie.poster} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h4 className="card-title">{movie.title} ({movie.year})</h4>
                            <p className="card-text">Rating: {movie.rated}</p>
                            <p className="card-text">{movie.plot}</p>
                        </div>
                        <div className="card-body">
                            <Link to={'/api/movies/id/' + movie._id} className="card-link">Reviews</Link>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );

}

export default MoviesList;