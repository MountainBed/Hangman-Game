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
    // Selects new choice
    pokeSelect: function() {
        return this.pokeArr[Math.floor(Math.random() * this.pokeArr.length)];
    },
    // Writes initial dashes
    pokeDashes: function(str) {
        var numDash = str.length;
        var dashArray = [];

        for (var i = 0; i < numDash; i++) {
            dashArray.push("__");
        }
        return dashArray;
    },
    // Converts deliminator to given string in provided array
    toSpace: function(arr, str) {
        return arr.join(str);
    },
    // Returns indices of user guess in given word; 0 = DNE
    checkGuess: function(ltr, word) {
        var a = [],
            i = -1;
        while ((i = word.indexOf(ltr, i + 1)) >= 0) {
            a.push(i);
        }
        return a;
    },
    // Updates dashes to include users guesses
    updateDashes: function(charIndex, baseArray, guess) {
        for (var i = 0; i < charIndex.length; i++) {
            baseArray[charIndex[i]] = guess;
        }
        return baseArray;
    },
    // Determines if guess has already been given
    existGuessCheck: function(guess, guessArr) {
        for (var i = 0; i < guessArr.length; i++) {
            if (guessArr[i] === guess) {
                return false;
            }
        }
        return true;
    },
    // Add guess to array of existing guesses
    addGuess: function(guess, guessArr) {
        guessArr.push(guess);
        return guessArr;
    },
    updateAttempts: function() {
        this.attempts = this.attempts - 1;
        return this.attempts;
    }

}
var pokeWins = 0; // # Wins
var userGuesses = []; // Array of guessed characters
var checkUser = []; // Indeces of characters in correct word
var userString = ""; // String of all choices with correct characters

// Main process

// Choose random word from poke Array
var pokeAnswer = game.pokeSelect();

console.log("Correct choice: " + pokeAnswer);

// Create string of dashses and spaces
userString = game.pokeDashes(pokeAnswer);
console.log("Dashes (userstring): " + userString);

document.onkeyup = function(event) {
    userInput = String.fromCharCode(event.keyCode).toUpperCase();
    console.log("User choice: " + userInput);

    // true if choice does not exist
    if (game.attempts > 0) {
        if ((game.existGuessCheck(userInput, userGuesses))) {

            userGuesses = game.addGuess(userInput, userGuesses);
            if (game.checkGuess(userInput, pokeAnswer).length != 0) {

                console.log("Attempts remaining: " + game.attempts);
                checkUser = game.checkGuess(userInput, pokeAnswer);
                console.log("checkUser: " + checkUser);
                console.log("output: " + game.updateDashes(checkUser, userString, userInput));
                document.getElementById("dashes").innerHTML = game.toSpace(game.updateDashes(checkUser, userString, userInput), "  ");
                document.getElementById("userLetters").innerHTML = game.toSpace(userGuesses, "  ");

            } else {
                game.updateAttempts();
                console.log("Attempts remaining: " + game.attempts);
                document.getElementById("guessRemain").innerHTML = game.attempts;
                document.getElementById("userLetters").innerHTML = game.toSpace(userGuesses, "  ");
            }

        } else {
            console.log("Already guessed");
            console.log("Attempts remaining: " + game.attempts);
            document.getElementById("userLetters").innerHTML = game.toSpace(userGuesses, "  ");

        }
    } else {
        console.log("Game over.");
    }

}






// while (pokeAnswer != userString && game.attempts != 0) {
//     document.onkeyup = function(event) {
//         userInput = String.fromCharCode(event.keyCode).toUpperCase();

//         if (game.attempts != 0) {

//             checkUser = game.checkGuess(userInput, pokeAnswer);

//             if (checkUser.length === 0) {
//                 userGuesses = game.addGuess(userInput, userGuesses);
//                 console.log("User guesses: " + userGuesses);
//                 console.log("Attempts: " + game.attempts);
//             } else {

//             }
//         } else {

//         }
//     }
//     game.updateAttempts();
// }


// checkUser = game.checkGuess(userInput, pokeAnswer);

// console.log("Length of array holding indeces: " + checkUser.length);
// console.log("User key: " + userInput);
// console.log("Index of character in word: " + checkUser);
// console.log("With dashes: " + game.pokeDashes(pokeAnswer));
// console.log("With spaces: " + game.toSpace(game.pokeDashes(pokeAnswer), "  "));
// console.log("Updated with word: " + game.toSpace(game.updateDashes(checkUser, game.pokeDashes(pokeAnswer), userInput), "  "));
// console.log("Guess already exist? " + game.existGuessCheck(userInput, userGuesses));
// console.log("List of guesses: " + game.addGuess(userInput, userGuesses));



// Print to HTML page
document.getElementById("wins").innerHTML = pokeWins;
document.getElementById("dashes").innerHTML = game.toSpace(game.pokeDashes(pokeAnswer), "  ");
document.getElementById("guessRemain").innerHTML = game.attempts;
document.getElementById("userLetters").innerHTML = game.toSpace(userGuesses, "  ");


// resetGuesses: function(nmbr) {
//     nmbr = this.attempts;
//     return nmbr;
// }
