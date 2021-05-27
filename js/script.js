function searchMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      'apikey': "fb443652",
      's': $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
          <div class="col-md-4 mb-3">
            <div class="card" style="width: 18rem;">
              <img src="` +
              data.Poster +
              `" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">` +
              data.Title +
              `</h5>
                <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
              <a href="#" class="card-link see-details" data-toggle="modal" data-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Details</a>
              </div>
            </div>
          </div>
          
          `
          );
        });
      } else {
        $("#movie-list").html(
          `
        <div class="col">
          <h1 class="text-center">` +
            result.Error +
            `</h1>
        </div>`
        );
      }
    },
  });
}
$("#search-button").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

$("#movie-list").on("click", ".see-details", function () {
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      'apikey': "fb443652",
      'i': $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
        
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="` +
            movie.Poster +
            `" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>` +
            movie.Title +
            `</h3></li>
                  <li class="list-group-item">Released: ` +
            movie.Released +
            `</li>
                  <li class="list-group-item">Genre: ` +
            movie.Genre +
            `</li>
                  <li class="list-group-item">Directors: ` +
            movie.Director +
            `</li>
                  <li class="list-group-item">Actors: ` +
            movie.Actors +
            `</li>
                </ul>
              </div>
            </div>
          </div>
        
        `
        );
      }
    },
  });
});
