// Movie Collection Manager

// Sample movie collection
let movies = [
    {
        title: "The Shawshank Redemption",
        genre: "Drama",
        rating: 9.3,
        releaseYear: 1994
    },
    {
        title: "The Godfather",
        genre: "Crime",
        rating: 9.2,
        releaseYear: 1972
    },
    {
        title: "The Dark Knight",
        genre: "Action",
        rating: 9.0,
        releaseYear: 2008
    }
];

// Function to add a new movie
const addMovie = (movie) => {
    movies.push(movie);
    console.log(`Added new movie: ${movie.title}`);
};

// Function to list movies by genre
const listMoviesByGenre = (genre) => {
    return movies.filter(movie => movie.genre === genre);
};

// Function to find highest rated movie
const findHighestRatedMovie = () => {
    return movies.reduce((highest, current) => 
        current.rating > highest.rating ? current : highest
    );
};

// Function to get all movie titles using map
const getAllMovieTitles = () => {
    return movies.map(movie => movie.title);
};

// Function to filter movies by release year
const filterMoviesByYear = (year) => {
    return movies.filter(movie => movie.releaseYear > year);
};

// Example usage
console.log("All Movies:", movies);
console.log("Movies by Genre (Drama):", listMoviesByGenre("Drama"));
console.log("Highest Rated Movie:", findHighestRatedMovie());
console.log("All Movie Titles:", getAllMovieTitles());
console.log("Movies after 2000:", filterMoviesByYear(2000));

// Example of adding a new movie
const newMovie = {
    title: "Inception",
    genre: "Sci-Fi",
    rating: 8.8,
    releaseYear: 2010
};
addMovie(newMovie); 