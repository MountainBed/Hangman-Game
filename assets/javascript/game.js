// Variable definitions
var game = {
    pokeArr: ["BULBASAUR",
        "CHARMANDER",
        "SQUIRTLE",
        "PIKACHU",
        "VULPIX",
        "JIGGLYPUFF",
        "PSYDUCK",
        "SLOWBRO",
        "LICKITUNG",
        "SNORLAX",
        "MEWTWO"
    ],
    attempts: 5,
    pokeSelect: function() {
        return this.pokeArr[Math.floor(Math.random() * this.pokeArr.length)];
    },
    pokeDashes: function(str) {
        var numDash = str.length;
        var dashArray = [];

        for (var i = 0; i < numDash; i++) {
            dashArray.push("__");
        }
        return dashArray;
    },
    toSpace: function(arr, str) {
        return arr.join(str);
    },
    checkGuess: function(ltr, word) {
        var a = [],
            i = -1;
        while ((i = word.indexOf(ltr, i + 1)) >= 0) {
            a.push(i);
        }
        return a;
    },
    updateDashes: function(charIndex, baseArray, guess) {
        for (var i = 0; i < charIndex.length; i++) {
            baseArray[charIndex[i]] = guess;
        }
        return baseArray;
    },
    resetGuesses: function(nmbr) {
        nmbr = this.attempts;
        return nmbr;
    }
}
var pokeWins = 0;
var numGuesses = 5;
var userGuesses = [];
var checkUser = [];

// Main process

// Select correct word
var pokeAnswer = game.pokeSelect();
console.log(pokeAnswer);

document.onkeyup = function(event) {

    // Captures the key press, converts it to lowercase, and saves it to a variable.
    var userInput = String.fromCharCode(event.keyCode).toUpperCase();

    checkUser = game.checkGuess(userInput, pokeAnswer);

    console.log("Length of array holding indeces: " + checkUser.length);
    console.log("User key: " + userInput);
    console.log("Index of character in word: " + checkUser);
    console.log("With dashes: " + game.pokeDashes(pokeAnswer));
    console.log("With spaces: " + game.toSpace(game.pokeDashes(pokeAnswer), "  "));
    console.log("Updated with word: " + game.toSpace(game.updateDashes(checkUser, game.pokeDashes(pokeAnswer), userInput), "  "));

    if (checkUser.length > 0) {

    }


}


// Print to HTML page
document.getElementById("wins").innerHTML = pokeWins;
document.getElementById("dashes").innerHTML = game.toSpace(game.pokeDashes(pokeAnswer), "  ");
document.getElementById("guessRemain").innerHTML = numGuesses;
document.getElementById("userLetters").innerHTML = userGuesses;
