import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Reviews = ({ reviews }) => {
    const params = useParams();

  return (
    <div>
        {reviews&&reviews.map((rev) => {
            return (                
                <ul className="list-group list-group">
                    <li key={rev._id} className="list-group-item d-flex">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{rev.user}</div>
                            {rev.comment}
                        </div>  
                    </li>                    
                </ul>  
            )
        })}
        
        <div className="ms-2 me-auto">
            <div className="fw-bold">
                <Link to={"/review/" + params.id} >+ Add Review</Link>
            </div>
        </div>
        
    </div>
  );
};

export default Reviews;
