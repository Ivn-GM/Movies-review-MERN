const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const movieSchema = new mongoose.Schema({
    plot: {
        type: String
    },
    review: [{
        //type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    genres: [{
        type: String
    }],
    runtime: {
        type: Number
    },
    cast: [{
        type: String
    }],
    num_mflix_comments: {
        type: Number
    },
    title: {
        type: String
    },
    countries: [{
        type: String
    }],
    released: {
        type: Date
    },
    directors: [{
        type: String
    }],
    rated: {
        type: String
    },
    awards: {
        wins:{
            type: Number
        },
        nominations: {
            type: Number
        },
        text: {
            type: String
        }
    },
    lastupdated: {
        type: String
    },
    year: {
        type: Number
    },
    imdb: {
        rating: {
            type: Number
        },
        votes:{
            type: Number
        },
        id:{
            type: Number
        }
    },
    type: {
        type: String
    },
    tomatoes: {
        viewer: {
            rating: {
                type: Number
            },
            numReviews: {
                type: Number
            },
            meter: {
                type: Number
            }
        },
        lastupdated: {
            type: Date
        }
    }


}, {collection: 'movies'});

movieSchema.virtual('url').get(function(){
    return '/review/' + this._id
})

movieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;