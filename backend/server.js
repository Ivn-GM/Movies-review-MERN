const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const app = express();

// DB connection
connectDB();

// Settings
app.set('port', process.env.PORT || 8000);
// ALTERNATIVE const port = process.env.PORT || 8000; 

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/movies", require('./routes/movies.route')); 
app.use('*', (_, res)=> { 
    res.status(404).json({error: "not found"}) 
})


// Static files



// Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`)
})


module.exports = app;