document.addEventListener("DOMContentLoaded", function () {
  const movieList = document.getElementById("movie-list");
  const videoPlayer = document.getElementById("video-player");
  const player = document.getElementById("player");
  const closeVideo = document.getElementById("close-video");
  const searchBar = document.getElementById("search-bar");
  const body = document.body;

  let moviesData = []; // Variable to store movies data

  // Fetch movies data from the JSON file
  fetch("movies.json")
    .then((response) => response.json())
    .then((movies) => {
      moviesData = movies; // Store the fetched data
      displayMovies(moviesData); // Initially display all movies
    })
    .catch((error) => console.error("Error loading movie data:", error));

  // Function to display movies
  function displayMovies(movies) {
    movieList.innerHTML = ""; // Clear the movie list before displaying filtered movies
    movies.forEach((movie) => {
      const movieContainer = document.createElement("div");
      movieContainer.classList.add("movie-container");

      const img = document.createElement("img");
      img.src = movie.poster;
      img.classList.add("movie");

      const playMovie = () => {
        player.src = movie.video;
        videoPlayer.style.display = "block";
      };

      img.addEventListener("click", playMovie);

      const movieName = document.createElement("p");
      movieName.textContent = movie.name;
      movieName.classList.add("movie-name");
      movieName.style.cursor = "pointer"; // Make the movie name clickable
      movieName.addEventListener("click", playMovie); // Add the same event listener for the name

      movieContainer.appendChild(img);
      movieContainer.appendChild(movieName);
      movieList.appendChild(movieContainer);
    });
  }

  // Search functionality
  searchBar.addEventListener("input", () => {
    const searchText = searchBar.value.toLowerCase(); // Get the search text
    const filteredMovies = moviesData.filter((movie) =>
      movie.name.toLowerCase().includes(searchText)
    );
    displayMovies(filteredMovies); // Display filtered movies
  });

  // Close video player
  closeVideo.addEventListener("click", () => {
    player.pause();
    videoPlayer.style.display = "none";
    body.classList.remove("blur-content"); // Remove blur when video closes
  });

  // Keydown events for space (pause/play) and 'F' for fullscreen
});
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && videoPlayer.style.display === "block") {
    event.preventDefault();
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }

  if (event.code === "KeyF" && videoPlayer.style.display === "block") {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      videoPlayer.classList.remove("fullscreen");
    } else {
      videoPlayer.requestFullscreen();
      videoPlayer.classList.add("fullscreen");
    }
  }
});
