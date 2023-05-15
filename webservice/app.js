const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
const port = 8080;
require('dotenv').config();
const axios = require('axios');

const language = 'en-US';
const region = 'US';

app.use(cors());
app.use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
         'Access-Control-Allow-Methods',
         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader(
         'Access-Control-Allow-Headers',
         'Content-Type, Authorization'
      );
      next();
   })
   /* 
/movies
Takes a search input and returns a list of up to 10 movies.
Calls TMDB API at this endpoint: https://developers.themoviedb.org/3/search/search-movies
*/
   .get('/movies', function (req, res) {
      const search = req.query.search;

      let movieList = [];
      let rawMovieList = [];
      axios
         .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${search}&page=1&include_adult=false&region=US`
         )
         .then((response) => {
            rawMovieList = response.data.results;
            // Discard all but the first 10 results
            rawMovieList = rawMovieList.slice(0, 10);

            console.log(rawMovieList);

            axios
               .get(
                  `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
               )
               .then((response) => {
                  baseURL = response.data.images.base_url;
                  console.log(baseURL);
                  rawMovieList.forEach((movie) => {
                     let imageURL = '';
                     if (movie.poster_path !== null) {
                        imageURL = baseURL + movie.poster_path;
                     } else {
                        imageURL = 'None';
                     }
                     movieList.push({
                        movie_id: movie.id,
                        title: movie.title,
                        poster_image_url: imageURL,
                        popularity_summary: `${movie.popularity} out of ${movie.vote_count}`,
                     });
                  });
                  console.log(movieList);
                  res.send(movieList);
               })
               .catch((error) => {
                  console.log(error);
               });
         })
         .catch((error) => {
            console.log(error);
         });
   });

app.listen(port, () => {
   console.log('API running at http://localhost:' + port);
});
