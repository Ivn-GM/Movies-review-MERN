import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createReview } from '../services/movies';

const AddReview = () => {
    const [review, setReview] = useState({
        user: "",
        comment: ""
    });

    const params = useParams();

    
    const addingReview = async(id, data) => {
        try {
            await createReview(id, data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const onChange = e => { 
        setReview({
            ...review,
            [e.target.name]: e.target.value.trim()
        }) 
    }; 

    const onSubmit = (e) => {
        e.preventDefault();
        addingReview(params.id, review);
    }
    
    return (
        <form>
            <div className="mb-3">
                <label className="form-label">User</label>
                <input type="text" name="user" onChange={onChange} className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Comment</label>
                <input type="text" name="comment" onChange={onChange} className="form-control" rows="3"></input>
            </div>
            <button onClick={onSubmit} className="btn btn-primary mb-3">Add Review</button>
        </form>
    )
}

export default AddReview;