import axios from 'axios';


export const getAll = () => {
    return axios.get("http://localhost:8000/api/movies");
};

export const getRatings = () => {
    return axios.get("http://localhost:8000/api/movies/ratings");
};

export const get = (id) => {
    return axios.get(`http://localhost:8000/api/movies/id/${id}`);
};

export const find = (query, by="title") => {
    return axios.get(
        `http://localhost:8000/api/movies?${by}=${query}`
    );
};

export const createReview = (id, data) => {
    return axios.post(`http://localhost:8000/api/movies/review/${id}`, data);
};
