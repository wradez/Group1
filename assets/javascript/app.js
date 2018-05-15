//Materialize carousel
$( document ).ready(function(){
    var responseData;
    var currentUser;
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAEdWYT728WAyg2Nbuacq_wX9f81M7jI4I",
        authDomain: "what-s-for-dinner-76bbd.firebaseapp.com",
        databaseURL: "https://what-s-for-dinner-76bbd.firebaseio.com",
        projectId: "what-s-for-dinner-76bbd",
        storageBucket: "what-s-for-dinner-76bbd.appspot.com",
        messagingSenderId: "562329637910"
    };

    firebase.initializeApp(config);

    var fireData = firebase.database();

    //global variables
    var foodSearch = "";
    var diet = "";
    var health = "";
    var calories = "";
    var cookTime = 0;
    var exFood = "";
    var category = "";

    //on click of the form submit, the form values will be assigned to the global variables and then passed into the queryURL. The queryURL will then be passed to the AJAX call to pull information based on the search terms
    $("#searchTerms").on("click", function(event){
        event.preventDefault();

        $(".collapsible-body").attr("style", "display:none"); 
        $("#collapsibleSubmit").removeClass("active");

        foodSearch = $("#foodSearch").val().trim();
        diet = $("#diet").val();
        console.log(diet);
        health = $("#health").val();
        console.log(health);
        calories = $("#calories").val().trim();
        cookTime = $("#cookTime").val().trim();
        exFood = $("#exFood").val().trim();
        

        var queryURL = "https://api.edamam.com/search?app_id=42ef94b5&app_key=b1f67a4f17a704d595b115098ac477e7&q=" + foodSearch + "&from=0&to=15"; 

        if(diet != "Choose your option"){
            queryURL = queryURL + "&diet=" + diet;
        }else if(health != "Choose your option"){
            queryURL = queryURL + "&health=" + health;
        }else if(calories != ""){
            queryURL = queryURL + "&calories=" + parseInt(calories);
        }else if(cookTime != ""){
            queryURL = queryURL + "&time=" + cookTime;
        }else if(exFood != ""){
            queryURL = queryURL + "&excluded=" + exFood;
        }
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            responseData = response.hits;
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

                var recipeID = database1.uri;
                var recipeID2 = database2.uri;
                var recipeID3 = database3.uri;                
    
    
                var divRow = $("<div class='row' >");
                var divImg1 = $('<div id="' + i + '" class="col s12 m4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + imageURL + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + label + '<i class="material-icons right">more_vert</i></span><p><a href="' + sourceURL + '">Preparation Instructions</a><a data-id="' + i + '" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + label + '<i class="material-icons right">close</i></span><p>Servings: ' + yield + '</p><p>Calories: ' + calories + '</p><p>Dietary Info: ' + dietLabels + '</p><p>Health Consideration: ' + healthLabels + '</p><p>Ingredients: ' + ingredients.join(", ") + '</p><a href="' + sourceURL + '">Preparation Instructions</a></div></div></div>');
                var divImg2 = $('<div id="' + (i+1) + '" class="col s12 m4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + imageURL2 + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + label2 + '<i class="material-icons right">more_vert</i></span><p><a href="' + sourceURL2 + '">Preparation Instructions</a><a data-id="' + (i+1) + '" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + label2 + '<i class="material-icons right">close</i></span><p>Servings: ' + yield2 + '</p><p>Calories: ' + calories2 + '</p><p>Dietary Info: ' + dietLabels2 + '</p><p>Health Consideration: ' + healthLabels2 + '</p><p>Ingredients: ' + ingredients2.join(", ") + '</p><a href="' + sourceURL2 + '">Preparation Instructions</a></div></div></div>');
                var divImg3 = $('<div id="' + (i+2) + '" class="col s12 m4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + imageURL3 + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + label3 + '<i class="material-icons right">more_vert</i></span><p><a href="' + sourceURL3 + '">Preparation Instructions</a><a data-id="' + (i+2) + '" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + label3 + '<i class="material-icons right">close</i></span><p>Servings: ' + yield3 + '</p><p>Calories: ' + calories3 + '</p><p>Dietary Info: ' + dietLabels3 + '</p><p>Health Consideration: ' + healthLabels3 + '</p><p>Ingredients: ' + ingredients3.join(", ") + '</p><a href="' + sourceURL3 + '">Preparation Instructions</a></div></div></div>');
               

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

    $("body").on("click", "#addIngredient", function(event){
        event.preventDefault();

        var addIngredient = $("#addItem").val().trim();
        console.log(addIngredient);
        currentUser = firebase.auth().currentUser.uid;
        console.log(currentUser);
        fireData.ref(`users/` + currentUser + `/ingredients`).push(addIngredient).then((data) => {
            console.log(data);
        });    
        $("#addItem").val("");
    });

    $("body").on("click", ".btn-floating", function(event){
        event.preventDefault();
        var grabDataID = $(this).attr("data-id");
        currentUser = firebase.auth().currentUser.uid;
        console.log(currentUser);
        fireData.ref(`users/` + currentUser + `/recipes`).push(responseData[grabDataID]).then((data) => {
            console.log(data);
        });
    });

    var randomFoodArray = ["chicken", "steak", "eggs", "pasta", "kale", "green+beans", "fish", "pork", "dessert", "strawberry", "banana", "onion", "garlic", "salt+pepper", "mango", "chocolate", "vanilla", "beer", "wine", "peanut+butter", "italian", "chinese", "french", "brazilian"]; 
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

    //myIngredients.html on user login function to append users' ingredients
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log("You're logged in");

            var loggedInUser = firebase.auth().currentUser.uid;

            fireData.ref(`users/` + loggedInUser).on("value", function(userSnapshot) {
                var userIngredients = userSnapshot.val().ingredients;
                console.log(userIngredients);

                var divRow = $("<div class='row' >");

                for (var ingredientObj in userIngredients) {
                    var savedIngredient = userIngredients[ingredientObj];
                    var ingredientCheckbox = $('<p><label><input type="checkbox" /><span>' + savedIngredient + '</span></label></p>');
        
                    divRow.append(ingredientCheckbox);
                    
                }

                $("#yourIngredients").html(divRow);
        
              }, function(errorObject) {
                console.log("Errors handled: " + errorObject);
              });
        }else{
            alert("Please Login");
            //need to change this to a modal
        }

    });

    //myRecipe.html on user login function to append users' recipes
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log("You're logged in");

            var loggedInUser = firebase.auth().currentUser.uid;

            fireData.ref(`users/` + loggedInUser).on("value", function(userSnapshot) {
                var userRecipe = userSnapshot.val().recipes;
                console.log(userRecipe);

                var divRow = $("<div class='row' >");

                for (var recipeObj in userRecipe) {
                    var savedRecipe = userRecipe[recipeObj];
                    savedRecipe = savedRecipe.recipe;
                    var divRecipe = $('<div class="col s12 m4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + savedRecipe.image + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + savedRecipe.label + '<i class="material-icons right">more_vert</i></span><p><a href="' + savedRecipe.url + '">Preparation Instructions</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + savedRecipe.label + '<i class="material-icons right">close</i></span><p>Servings: ' + savedRecipe.yield + '</p><p>Calories: ' + savedRecipe.calories + '</p><p>Dietary Info: ' + savedRecipe.dietLabels + '</p><p>Health Consideration: ' + savedRecipe.healthLabels + '</p><p>Ingredients: ' + savedRecipe.ingredientLines.join(", ") + '</p><a href="' + savedRecipe.url + '">Preparation Instructions</a></div></div></div>');
        
                    divRow.append(divRecipe);
                    
        
                    $("#savedRecipes").append(divRow);
                }
        
              }, function(errorObject) {
                console.log("Errors handled: " + errorObject);
              });
        
        }else{
            alert("Please Login");
            //need to change this to a modal
        }
    });

    $(".dropdown-trigger").dropdown();
    $('.carousel.carousel-slider').carousel();
    $('.collapsible').collapsible(); 
    $('select').formSelect();
    var instance = M.Collapsible.getInstance(elem);
    instance.open(3);
    instance.close(3);
    instance.destroy();

});
