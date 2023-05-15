# OIT Coding Challenge

## Running the frontend

1. Enter the 'webapp' folder
2. Run '`npm install`' in a terminal
3. Run '`npm run dev`' in the terminal
4. Open a browser to the following URL: http://localhost:3000

NOTE: The webpage doesn't currently have a search bar, but sends the word "filler" to the backend as the search query.

## Running the backend

1. Enter the 'webservice' folder
2. You'll need to provide your own API for the movies database: `https://developers.themoviedb.org`. Once you have one, create a .env file in the webservice folder with the following code:<br>
   `API_KEY= API key here`
3. Run '`npm install`' in a terminal
4. Run '`node app.js`' in the terminal

NOTE: The backend was created fully and returns results to the frontend, but the frontend isn't currently set up to display the results. Use postman to test endpoints.
