

// importing environment variables 
require('dotenv').config() // from the env file

const express = require('express');

const path = require('path');
const fetchData = require('./utils /fetchData')

// serve static assets from this folder
const getPathToDist = path.join(__dirname, '../giphy-search/dist')
const app = express();


const logRoutes = (req, res, next) => {
    const time = (new Date()).toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next();
};

const serveStatic = express.static(getPathToDist);

// have api endpoint that fetches from the giphy API using the API key. 
const serveGifs = async (req, res, next) => {
    const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=g`;
    const [data, error] = await fetchData(API_URL);
    if (error) {
        console.log(error.message);
        return res.status(404).send(error);
    }
    res.send(data);
}


app.get('/api/gifs', serveGifs)
app.use(logRoutes)
app.use(serveStatic)



const port = 8080;
app.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}`);
});