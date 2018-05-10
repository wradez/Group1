//variables
var foodSearch = "";
var diet = "";
var health = "";
var calories = "";
var cookTime = 0;
var exFood = "";

//on click of the form submit, the form values will be assigned to the global variables and then passed into the queryURL. The queryURL will then be passed to the AJAX call to pull information based on the search terms
$("#searchTerms").on("click", function(){
    foodSearch = $("#foodSearch").val().trim();
    diet = $("#diet").val().trim();
    health = $("#health").val().trim();
    calories = $("#calories").val().trim();
    cookTime = $("#cookTime").val().trim();
    exFood = $("#exFood").val().trim();

    var queryURL = "https://api.edamam.com/search?app_id=42ef94b5&app_key=b1f67a4f17a704d595b115098ac477e7&q=" + foodSearch + "&diet=" + diet + "&health=" + health + "&calories=" + calories + "&time=" + cookTime + "&excluded=" + exFood;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        for(var i = 0; i < 10; i++){
            var database = response.hits[i];

            var recipeDiv = $("<div>").addClass("text-canter");
        }
  });
})
