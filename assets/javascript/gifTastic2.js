$(document).ready(function() {

  var pirates = [
    "Monkey D. Luffy", "Dread Pirate Roberts", "Monkey Island","Jack Sparrow"
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }
  $("#add-Treasure").on("click", function(event) {
    event.preventDefault();
    var type = $("#treasure-Input").val();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      console.log("response", response);

      for (var i = 0; i < results.length; i++) {
        var pirateDiv = $("<div class=\"treasure-item col-lg-4\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var pirateImage = $("<img>");
        pirateImage.attr("src", still);
        pirateImage.attr("data-still", still);
        pirateImage.attr("data-animate", animated);
        pirateImage.attr("data-state", "still");
        pirateImage.addClass("pirate-image");

        pirateDiv.append(p);
        pirateDiv.append(pirateImage);

        $("#pirates").append(pirateDiv);
      }
    });


  });

  $(document).on("click", ".pirate-button", function() {
    $("#pirates").empty();
    $(".pirate-button").removeClass("active");
    $(this).addClass("active");

    console.log("buttonClicked");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      console.log("response", response);

      for (var i = 0; i < results.length; i++) {
        var pirateDiv = $("<div class=\"treasure-item col-lg-4\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var pirateImage = $("<img>");
        pirateImage.attr("src", still);
        pirateImage.attr("data-still", still);
        pirateImage.attr("data-animate", animated);
        pirateImage.attr("data-state", "still");
        pirateImage.addClass("pirate-image");

        pirateDiv.append(p);
        pirateDiv.append(pirateImage);

        $("#pirates").append(pirateDiv);
      }
    });
  });

  $(document).on("click", ".pirate-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newPirate = $("input").eq(0).val();

    if (newPirate.length > 2) {
      pirates.push(newPirate);
    }

    populateButtons(pirates, "pirate-button", "#pirate-buttons");

  });

  populateButtons(pirates, "pirate-button", "#pirate-buttons");
});