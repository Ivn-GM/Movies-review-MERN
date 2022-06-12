const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const reviewSchema = new mongoose.Schema({    
    user: {
        type: String
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    review_id: {
        type: mongoose.Types.ObjectId
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }    
})


const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;