//Materialize carousel
$( document ).ready(function(){

    //global variables
    var foodSearch = "";
    var diet = "";
    var health = "";
    var calories = "";
    var cookTime = 0;
    var exFood = "";
    var addIngredient = "";

    $("#addIngredient").on("click",function(event){
        event.preventDefault();

        addIngredient = $("#addItem").val().trim();

        var ingredientDiv = $('<p class="red lighten-5 col s4 m3"><label><input class="with-gap" name="group3" type="radio" checked /><span>' + addIngredient + '</span></label></p>');

        $("#addedItems").append(ingredientDiv);
        //need to add some more formating and get teh button to the proper place
    });

    //on click of the form submit, the form values will be assigned to the global variables and then passed into the queryURL. The queryURL will then be passed to the AJAX call to pull information based on the search terms
    $("#searchTerms").on("click", function(event){
        event.preventDefault();

        $(".collapsible-body").attr("style", "display:none"); 
        $("#collapsibleSubmit").removeClass("active");

        foodSearch = $("#foodSearch").val().trim();
        diet = $("#diet").val().trim();
        health = $("#health").val().trim();
        calories = $("#calories").val().trim();
        cookTime = $("#cookTime").val().trim();
        exFood = $("#exFood").val().trim();

        var queryURL = "https://api.edamam.com/search?app_id=42ef94b5&app_key=b1f67a4f17a704d595b115098ac477e7&q=" + foodSearch + "&from=0&to=15"; // + "&diet=" + diet + "&health=" + health + "&calories=" + calories + "&time=" + cookTime + "&excluded=" + exFood

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for(var i = 0; i < 16; i += 3){
                var database1 = response.hits[i].recipe;
                var database2 = response.hits[i+1].recipe;
                var database3 = response.hits[i+2].recipe;
    
                var imageURL = database1.image;
                var imageURL2 = database2.image;
                var imageURL3 = database3.image;
    
                var label = database1.label;
                var label2 = database2.label;
                var label3 = database3.label;
    
                var yield = database1.yield;
                var yield2 = database2.yield;
                var yield3 = database3.yield;
    
                var calories = Math.round(database1.calories);
                var calories2 = Math.round(database2.calories);
                var calories3 = Math.round(database3.calories);
    
                var ingredients = database1.ingredientLines;
                var ingredients2 = database2.ingredientLines;
                var ingredients3 = database3.ingredientLines;
    
                var dietLabels = database1.dietLabels;
                var dietLabels2 = database2.dietLabels;
                var dietLabels3 = database3.dietLabels;
    
                var healthLabels = database1.healthLabels;
                var healthLabels2 = database2.healthLabels;
                var healthLabels3 = database3.healthLabels;
    
                var sourceURL = database1.url;
                var sourceURL2 = database2.url;
                var sourceURL3 = database3.url;
    
    
                var divRow = $("<div class='row' >");
                var divImg1 = $('<div class="col s12 m4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + imageURL + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + label + '<i class="material-icons right">more_vert</i></span><p><a href="' + sourceURL + '">Preparation Instructions</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + label + '<i class="material-icons right">close</i></span><p>Servings: ' + yield + '</p><p>Calories: ' + calories + '</p><p>Dietary Info: ' + dietLabels + '</p><p>Health Consideration: ' + healthLabels + '</p><p>Ingredients: ' + ingredients.join(", ") + '</p><a href="' + sourceURL + '">Preparation Instructions</a></div></div></div>');
                var divImg2 = $('<div class="col s12 m4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + imageURL2 + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + label2 + '<i class="material-icons right">more_vert</i></span><p><a href="' + sourceURL2 + '">Preparation Instructions</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + label2 + '<i class="material-icons right">close</i></span><p>Servings: ' + yield2 + '</p><p>Calories: ' + calories2 + '</p><p>Dietary Info: ' + dietLabels2 + '</p><p>Health Consideration: ' + healthLabels2 + '</p><p>Ingredients: ' + ingredients2.join(", ") + '</p><a href="' + sourceURL2 + '">Preparation Instructions</a></div></div></div>');
                var divImg3 = $('<div class="col s12 m4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + imageURL3 + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + label3 + '<i class="material-icons right">more_vert</i></span><p><a href="' + sourceURL3 + '">Preparation Instructions</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + label3 + '<i class="material-icons right">close</i></span><p>Servings: ' + yield3 + '</p><p>Calories: ' + calories3 + '</p><p>Dietary Info: ' + dietLabels3 + '</p><p>Health Consideration: ' + healthLabels3 + '</p><p>Ingredients: ' + ingredients3.join(", ") + '</p><a href="' + sourceURL3 + '">Preparation Instructions</a></div></div></div>');

                divRow.append(divImg1);
                divRow.append(divImg2);
                divRow.append(divImg3);
                
                $("#searchResults").append(divRow);
            }
        });

        foodSearch = $("#foodSearch").val("");
        diet = $("#diet").val("");
        health = $("#health").val("");
        calories = $("#calories").val("");
        cookTime = $("#cookTime").val("");
        exFood = $("#exFood").val("");
        
    });

    var randomFoodArray = ["chicken", "steak", "eggs", "pasta", "kale", "green+beans", "fish", "pork", "desert", "strawberry", "banana", "onion", "garlic", "salt+pepper", "mango", "chocolate", "vanilla", "beer", "wine", "peanut+butter", "italian", "chinese", "french", "brazilian"]; 
    var randomChoice = Math.floor(Math.random() * randomFoodArray.length);
    var mainPageURL = "https://api.edamam.com/search?app_id=42ef94b5&app_key=b1f67a4f17a704d595b115098ac477e7&q=" + randomFoodArray[randomChoice] + "&from=0&to=9";
    $.ajax({
        url: mainPageURL,
        method: "GET"
    }).then(function (response) {

        for(var i = 0; i < 10; i += 2){
            var database1 = response.hits[i].recipe;
            var database2 = response.hits[i+1].recipe;

            var imageURL = database1.image;
            var imageURL2 = database2.image;

            var label = database1.label;
            var label2 = database2.label;

            var yield = database1.yield;
            var yield2 = database2.yield;

            var calories = Math.round(database1.calories);
            var calories2 = Math.round(database2.calories);

            var ingredients = database1.ingredientLines;
            var ingredients2 = database2.ingredientLines;

            var dietLabels = database1.dietLabels;
            var dietLabels2 = database2.dietLabels;

            var healthLabels = database1.healthLabels;
            var healthLabels2 = database2.healthLabels;

            var sourceURL = database1.url;
            var sourceURL2 = database2.url;


            var divRow = $("<div class='row' >");
            var divImg1 = $('<div class="col s12 m6"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + imageURL + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + label + '<i class="material-icons right">more_vert</i></span><p><a href="' + sourceURL + '">Preparation Instructions</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + label + '<i class="material-icons right">close</i></span><p>Servings: ' + yield + '</p><p>Calories: ' + calories + '</p><p>Dietary Info: ' + dietLabels + '</p><p>Health Consideration: ' + healthLabels + '</p><p>Ingredients: ' + ingredients.join(", ") + '</p><a href="' + sourceURL + '">Preparation Instructions</a></div></div></div>');
            var divImg2 = $('<div class="col s12 m6"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + imageURL2 + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + label2 + '<i class="material-icons right">more_vert</i></span><p><a href="' + sourceURL2 + '">Preparation Instructions</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + label2 + '<i class="material-icons right">close</i></span><p>Servings: ' + yield2 + '</p><p>Calories: ' + calories2 + '</p><p>Dietary Info: ' + dietLabels2 + '</p><p>Health Consideration: ' + healthLabels2 + '</p><p>Ingredients: ' + ingredients2.join(", ") + '</p><a href="' + sourceURL2 + '">Preparation Instructions</a></div></div></div>');

            divRow.append(divImg1);
            divRow.append(divImg2);
            
            $("#featured-recipes").append(divRow);
        }
    });
            

    $(".dropdown-trigger").dropdown();
    $('.carousel.carousel-slider').carousel();
    $('.collapsible').collapsible(); 
    var instance = M.Collapsible.getInstance(elem);
    instance.open(3);
    instance.close(3);
    instance.destroy();

});









