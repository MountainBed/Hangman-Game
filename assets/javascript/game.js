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
    pokeWins: 0,
    pokeLosses: 0,
    pokeWord: "",
    userGuesses: [],
    checkUser: [],
    userString: "",
    userWord: "",
    userInput: "",

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
        var argsString = Array.prototype.join.call(arr, '  ');
        return argsString;
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
                return true;
            }
        }
        return false;
    },
    // Add guess to array of existing guesses
    addGuess: function(guess, guessArr) {
        guessArr.push(guess);
        return guessArr;
    },
    // Updates attempts by 1 try
    updateAttempts: function() {
        this.attempts = this.attempts - 1;
        return this.attempts;
    },
    // Checks for win
    checkWin: function() {
        if (this.userWord === this.pokeWord) {
            console.log("YAY");
            return true;
        } else {
            console.log("NO!");
            return false;
        }
    },
    // Convert Array to String
    strtoArr: function(arr) {
        var argsString = Array.prototype.join.call(arr, '');
        return argsString;
    },
    // Checks for 0 attempts
    checkLoss: function() {
        if (this.attempts === 0) {
            return true;
        }
        return false;
    },
    // Add win
    addWin: function() {
        this.pokeWins += 1;
    },
    // Add loss
    addLoss: function() {
        this.pokeLosses += 1;
    },
    // Chooses word from pokemon array
    chooseWord: function() {
        this.pokeWord = this.pokeSelect();
    },
    // Resets values for start of new game
    resetAll: function() {
        this.userGuesses = [];
        this.attempts = 5;
        this.userWord = "";
        this.userString = this.pokeDashes(this.pokeWord);
    },
    // Prints initial html
    printInitial: function() {
        document.getElementById("wins").innerHTML = this.pokeWins;
        document.getElementById("losses").innerHTML = this.pokeLosses;
        document.getElementById("dashes").innerHTML = game.toSpace(game.pokeDashes(this.pokeWord), "  ");
        document.getElementById("guessRemain").innerHTML = this.attempts;
        document.getElementById("userLetters").innerHTML = this.toSpace(this.userGuesses, "  ");
    },
    // Main game
    gamefunc: function() {
        // Choose random word from poke Array
        game.chooseWord();

        console.log("Correct choice: " + game.pokeWord);

        // Create string of dashses and spaces
        game.userString = game.pokeDashes(this.pokeWord);

        game.printInitial();

        document.onkeyup = function(event) {
            game.userInput = String.fromCharCode(event.keyCode).toUpperCase();
            console.log("User choice: " + game.userInput);

            // Checks if choice already exists, does not nothing
            // Existing guess
            if (game.existGuessCheck(game.userInput, game.userGuesses)) {
                console.log("This choice was already made.");
                return;
            }
            // New guess
            else {
                // New guess, letter correct
                if (game.checkGuess(game.userInput, game.pokeWord).length != 0) {

                    console.log("Attempts remaining: " + game.attempts);
                    game.checkUser = game.checkGuess(game.userInput, game.pokeWord);
                    game.userGuesses = game.addGuess(game.userInput, game.userGuesses);
                    game.userWord = game.strtoArr(game.updateDashes(game.checkUser, game.userString, game.userInput));
                    document.getElementById("dashes").innerHTML = game.toSpace(game.updateDashes(game.checkUser, game.userString, game.userInput), "  ");
                    document.getElementById("userLetters").innerHTML = game.toSpace(game.userGuesses, "  ");

                }
                // New guess, letter incorrect
                else {
                    game.updateAttempts();
                    console.log("Attempts remaining: " + game.attempts);
                    game.userGuesses = game.addGuess(game.userInput, game.userGuesses);
                    document.getElementById("guessRemain").innerHTML = game.attempts;
                    document.getElementById("userLetters").innerHTML = game.toSpace(game.userGuesses, "  ");
                }
            }
            // Checks for Win, sets with plus one win
            if (game.checkWin()) {

                game.addWin();
                game.chooseWord();
                game.resetAll();
                game.printInitial();
                console.log("Win, new word: " + game.pokeWord);

            }
            // Checks for Loss, resets
            if (game.checkLoss()) {
                game.addLoss();
                game.chooseWord();
                game.resetAll();
                game.printInitial();
                console.log("Loss, new word: " + game.pokeWord);
            }
        }


    }
}

game.gamefunc();
