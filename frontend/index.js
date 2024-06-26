var next = 1;

var posterPaths = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
var backgroundPaths = "http://image.tmdb.org/t/p/w1280";
var url = "http://localhost:3000/movies";
var key = "&api_key=6b4357c41d9c606e4d7ebe2f4a8850ea";
var movieCast = "https://api.themoviedb.org/3/movie/";
var actorInfo = "https://api.themoviedb.org/3/discover/movie?&with_cast=";

$(document).ready(function() {
    showMovie(); // Call showMovie when the document is ready
});

function sortMovies(choice) {
  next = 0;
  $(".movies").remove();
  $(".more").show();
  $(".item-container").removeClass("single");
  $(".overview").hide();
  $(".search").show();

  // Update the header and call showMovie with the selected genre
  if (choice === "Animation") {
      $("h1").text("Animation");
  } else if (choice === "Comedy") {
      $("h1").text("Comedy");
  } else if (choice === "Crime") {
      $("h1").text("Crime");
  } else if (choice === "Horror") {
      $("h1").text("Horror");
  }
  showMovie(choice);
}


//when enter is hit it starts the search
function checkSubmit(e) {
  if (e && e.keyCode == 13) {
    var searching = document.getElementById("search").value;
    search(searching);
    document.getElementById("search").value = "";
    return false;
  }
}

//search for a movie
function search(search) {
  $(".movies").remove();
  $(".tv").remove();
  var searchurl = "https://api.themoviedb.org/3/search/multi?api_key=6b4357c41d9c606e4d7ebe2f4a8850ea&query=";
  $.getJSON(searchurl + search, function(data) {
    console.log(data);
    for (var i = 0; i < data.results.length; i++) {
      var result = data.results[i];
      var id = result.id;
      var title = result.title;
      var rating = result.vote_average;
      var poster = posterPaths + result.poster_path;
      var overview = result.overview;

      if (!id || !title || !rating || !result.poster_path || !overview ||
        poster === "https://image.tmdb.org/t/p/w370_and_h556_bestv2null" ||
        poster === "https://image.tmdb.org/t/p/w370_and_h556_bestv2undefined" ||
        overview === "null") {
        continue;
      }

      $(".item-container").append(
        "<a class='item link movies m" + i + "' id='" + id + "' onclick='movieInfo(" + id + ")' href='#'><img src='" +
        poster + "' class='image'><div class='item-inner'><h2 class='item-title'>" + title +
        "</h2><span class='rating'><i class='fa fa-star' aria-hidden='true'></i> " + rating +
        "</span></div></a>"
      );
    }
  });
}

//display the movies in the database
function showMovie(choice) {
  next++;
  $.getJSON(url, function(data) {
      console.log(data);
      $(".item-container").empty(); // Clear the movie container
      var moviesFound = false; // Flag to check if any movie matches the genre

      for (var i = 0; i < data.length; i++) {
          var id = data[i].id;
          var title = data[i].original_title;
          var overview = data[i].overview;
          var rating = data[i].vote_average;
          var poster = posterPaths + data[i].poster_path;
          var genres = data[i].genres ? data[i].genres.split(', ') : []; // Split genres into an array

          // Skip the movie if it doesn't match the selected genre
          if (choice && !genres.includes(choice)) {
              console.log("Genre doesn't match");
              continue;
          }

          // If a movie matches the genre, set moviesFound to true
          moviesFound = true;

          if (poster === "https://image.tmdb.org/t/p/w370_and_h556_bestv2null") {
              // Skip if there is no poster
          } else if (poster === "https://image.tmdb.org/t/p/w370_and_h556_bestv2undefined") {
              // Skip if the overview is undefined
          } else if (overview == "null") {
              // Skip if the overview is null
          } else {
              $(".item-container").append(
                  "<div class='item link movies m" + i + "' id='" + id + "'><img src='" + poster +
                  "' class='image'><div class='item-inner'><h2 class='item-title'>" + title +
                  "</h2><span class='rating'><i class='fa fa-star' aria-hidden='true'></i> " + rating +
                  "</span></div><button class='delete-button' onclick='deleteMovie(" + id + ")'>Delete</button></div>"
              );
          }
      }

      // Display the message if no movies are found
      if (!moviesFound) {
          $("#no-movies-message").show();
      } else {
          $("#no-movies-message").hide();
      }
  });
}


//show the movie information
function movieInfo(id) {
  $.getJSON(movieCast + id + "/casts?" + key, function(json) {
    let cast1 = json.cast[0]?.name;
    let cast1id = json.cast[0]?.id;
    let cast2 = json.cast[1]?.name;
    let cast2id = json.cast[1]?.id;
    let cast3 = json.cast[2]?.name;
    let cast3id = json.cast[2]?.id;
    let cast4 = json.cast[3]?.name;
    let cast4id = json.cast[3]?.id;

    $(".movies").hide();
    $(".search").hide();
    $(".more").hide();
    $(".item-container").addClass("single");
    $(".titles").addClass("hide");

    var infoURL = "https://api.themoviedb.org/3/movie/" + id + "?&api_key=6b4357c41d9c606e4d7ebe2f4a8850ea";

    $.getJSON(infoURL, function(data) {
      let runtime = data.runtime ? data.runtime : "Runtime not available";
      let tagline = data.tagline ? data.tagline : "";
      let year = data.release_date ? data.release_date.slice(0, 4) : "Year not available";
      let title = data.title ? data.title : "Title not available";
      let rating = data.vote_average ? data.vote_average : "Rating not available";
      let overview = data.overview ? data.overview : "Overview not available";
      let poster = data.poster_path ? posterPaths + data.poster_path : "https://via.placeholder.com/1280x1080?text=No+Poster&000.jpg";

      let genre;
      if (data.genres && data.genres.length > 0) {
        genre = data.genres.map(g => g.name).join(", ");
      } else {
        genre = "Genre not available";
      }

      let actors = [
        { name: cast1, id: cast1id },
        { name: cast2, id: cast2id },
        { name: cast3, id: cast3id },
        { name: cast4, id: cast4id }
      ];

      $(".item-container").prepend(
        "<div class='overview'><div class='movie-container'><div class='movie-inner'><div class='movie-content'><div class='movie-poster'><img class='movie-img' src='" +
        poster +
        "'></div><div class='movie-data'><div class='movie-info'><div class='movie-head'><h1 class='movie-title'>" +
        title +
        "</h1><h1 class='movie-tagline'>" +
        tagline +
        "</h1></div><div class='movie-subdata'><div class='movie-left'><p class='movie-stars'><i class='fa fa-star' aria-hidden='true'></i>  " +
        rating +
        "</p></div><div class='movie-right'>" +
        year +
        " / " +
        runtime +
        " min</div></div><h3 class='movie-fields'>The Genres</h3><div class='movie-tags'><span class='movie-taxonomy'>" +
        genre +
        "</span></div><h3 class='movie-fields'>The Synopsis</h3><p class='movie-description'>" +
        overview +
        "</p></div><h3 class='movie-fields'>The Actors</h3><div class='movie-tags'><a class='movie-taxonomy' onclick='showActor(" +
        cast1id +
        ")'>" +
        cast1 +
        "</a><a class='movie-taxonomy' onclick='showActor(" +
        cast2id +
        ")'> " +
        cast2 +
        "</a><a class='movie-taxonomy' onclick='showActor(" +
        cast3id +
        ")'>" +
        cast3 +
        "</a><a class='movie-taxonomy' onclick='showActor(" +
        cast4id +
        ")'>" +
        cast4 +
        "</a></div><div id='hideMInfo' class='exit' style='font-size:30px;'><i style='cursor:pointer;' onclick='exit(" +
        id +
        ")' class='fa fa-chevron-circle-left' aria-hidden='true'></i></div>" +
        "<button class='add-button' onclick='addMovieToDB(" + JSON.stringify({
          id: id,
          background_path: data.backdrop_path,
          original_language: data.original_language,
          original_title: data.original_title,
          overview: overview,
          poster_path: data.poster_path,
          release_date: data.release_date,
          vote_average: rating,
          vote_count: data.vote_count,
          runtime: runtime,
          tagline: tagline,
          actors: actors,
          genres: genre
        }) + ")'>Add Movie to DB</button></div></div></div></div></div>"
      );

    });
  });
}

// Add movie to DB
function addMovieToDB(movieDetails) {
  $.ajax({
    url: "http://localhost:3000/movies/add",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(movieDetails), 
    success: function (data) {
      alert("Movie added to DB");
    },
    error: function (error) {
      alert("Error adding movie to DB: " + error.responseJSON?.error || "Unknown error");
    }
  });
}


// Delete a movie from the database
function deleteMovie(id) {
  $.ajax({
    url: "http://localhost:3000/movies/delete/" + id,
    type: "DELETE",
    success: function (data) {
      alert("Movie deleted from DB");
      $(".item-container").find(".item#" + id).remove();
    },
    error: function (error) {
      alert("Error deleting movie from DB: " + (error.responseJSON?.error || "Unknown error"));
    },
    complete: function (xhr, status) {
      console.log("Request complete with status: " + status);
      console.log("Response: ", xhr.responseText);
    }
  });
}


//show the movies the actors have been in
function showActor(id) {
  $(".overview").hide();
  $(".more").show();
  $(".search").show();
  $(".item-container").removeClass("single");
  var next = 0;
  next++;
  $.getJSON(actorInfo + id + key + "&page=" + next, function (data) {
    for (var i = 0; i < data.results.length; i++) {
      var id = data.results[i].id;
      var title = data.results[i].title;
      var overview = data.results[i].overview;
      var rating = data.results[i].vote_average;
      var poster = posterPaths + data.results[i].poster_path;
      if (poster === "https://image.tmdb.org/t/p/w370_and_h556_bestv2null") {
        poster = "https://via.placeholder.com/370x556?text=No+Poster&000.jpg";
      }
      $(".item-container").append(
        "<a class='item link movies m" +
        i +
        "' id='" +
        id +
        "' onclick='movieInfo(" +
        id +
        ")' href='#'><img src='" +
        poster +
        "' class='image'><div class='item-inner'><h2 class='item-title'>" +
        title +
        "</h2><span class='rating'><i class='fa fa-star' aria-hidden='true'></i> " +
        rating +
        "</span></div></a>"
      );
    }
  });
}


sortMovies();
$(".container").addClass("main");
$(".search").show();


