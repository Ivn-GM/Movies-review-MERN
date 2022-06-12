const express = require('express');
const Movie = require('../models/movie');
const Review = require('../models/review');

const router = express.Router() // get access to express router


// Alternative
/*
router.route('/').get((req, res) => {
    res.send('hello world');
})
*/

router.get('/', async (req, res, next) => {
    try {
        if(!req.query.page) {
            next("route");
        } else {
            const page = req.query.page;
            const pagemovie = await Movie.paginate({}, { page });

            res.json(pagemovie);
        }    
    } catch (err) {
        console.log(err.message);
    }
});


router.get('/ratings', async (req, res, next) => {
    let ratings = [];
    
    try {
        if(req.route.path !== "/ratings") {
            next("route");
        } else {
            ratings = await Movie.distinct("rated");
            return res.json(ratings);
        }    
    } catch(e) {
        console.error(`unable to get ratings, ${e}`);
    }       
});

router.get("/", async(req, res, next) => {
    if (!req.query.rated) {
        next("route");
    } else {
        const rated = req.query.rated;
        const ratedMovie = await Movie.find().where("rated").equals(rated).limit(3);
        res.json(ratedMovie);
    }    
});


router.get("/", async(req, res, next) => {
    if (!req.query.title) {
        next("route");
    } else {
        const title = req.query.title;
        const titleMovie = await Movie.find().where("title").equals(title);
        res.json(titleMovie);
    }    
});

// Get all movies (20 of them...)
router.get('/', async (req, res) => {
    const options = {
        populate: 'review'
    }
    const allMovies = await Movie.paginate({}, options, function (err, result) {
        res.json(result);
    });

    
    // res.json(allMovies.map(movie => movie.title));
    
    // res.json(allMovies.map((movie) => movie.rated));
});


// Get movies by id
router.get('/id/:id', async (req, res) => {
    try {
        const movieById = await Movie.findById(req.params.id).populate("review").then(user => {
            res.json(user); 
        });;
        res.json(movieById);
        //console.log(req.params.id)
    } catch (err) {
        console.log(err.message);
    }
    
});


// Add a new review
router.post('/review/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userMovie = new Review({
            user: req.body.user,
            comment: req.body.comment,
            movie_id: id            
        });
        
        /*new Movie({
            plot: plot,
            title: title
        })*/
        // console.log(req.body);
        await userMovie.save();
        if (userMovie) {
            const userMovieReview = await Movie.findById(id).populate("review")
            userMovieReview.review.push(userMovie); 
            await userMovieReview.save();
        }
        
        res.json({status: 'review saved'});
    } catch (err) {
        console.log(err.message);
    }
    
})


module.exports = router;