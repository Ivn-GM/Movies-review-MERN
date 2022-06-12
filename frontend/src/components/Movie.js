import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../services/movies';
import Reviews from './Reviews';


const Movie = () => {
    const [movie, setMovie] = useState({});

    const params = useParams();

    useEffect(() => {
        getMovie(params.id)
    },[params.id]);   


    const getMovie = async(id) => {
        try {
            const response = await get(id);
            setMovie(response.data);           
        } catch (err) {
            console.log(err.message);
        }
    }   

    const reviews = movie.review;

    return (
        <div className='card mb-3' style={{width: "840px", display: "inline-flex", marginTop: "10px"}}>
            <div className='row g-0'>
                <div className='col-md-4'>
                    <img src={movie.poster} className='img-fluid rounded-start' alt="..."></img>
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h1 className='card-title'>{movie.title} ({movie.year})</h1>
                        <p className='card-text'>{movie.fullplot}</p>
                        <h3 className='card-text' style={{ paddingTop: "150px", paddingRight: "300px" }}>Reviews</h3>
                    </div>
                </div>
                <Reviews reviews={reviews} />
            </div>
        </div>
    );
}

export default Movie;