/* Global Variables */

const guessedAlpha = document.querySelector(".guessed-letters"); // The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess") // The button with the text “Guess!” in it.
const currentGuess = document.querySelector(".letter") // The text input where the player will guess a letter.
const mysteryWord = document.querySelector(".word-in-progress") // The empty paragraph where the word in progress will appear.
const guessesLeft = document.querySelector(".remaining") // The span inside the paragraph where the remaining guesses will display.
const messages = document.querySelector(".message") // The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again") // The hidden button that will appear prompting the player to play again.

/* temporary value for the word */ const word = "magnolia";

const guessedLetters = [];

/*const circleLetters = function (word) {
    for(const letter of word) {
        console.log(letter);
        let p = document.createElement("p");
        p.innerText ="●";
        mysteryWord.append(p);
    }
} */


//////////////////////////  Display our symbols as placeholders for the chosen word's letters \\\\\\\\\\\\\\\\\\\
const circleLetters = function (word) {  
    const mysteryCircles = []; // this is the array where the individual circles each representing a letter in the mystery word, will be pushed to.

    for(const letter of word) {
        console.log(letter);
        mysteryCircles.push("●")
    }
    mysteryWord.innerText = mysteryCircles.join("");
    console.log(mysteryWord.innerText);
};

circleLetters(word); 

///////////////////////// Activate the Guess Button to retrieve Letter, and test for eligibility \\\\\\\\\\\\\\\
guessButton.addEventListener("click", function (event) {
    event.preventDefault();

    messages.innerText = "";

    const guessedLetter = currentGuess.value // this takes the value of the letter inputed into the input section
    console.log(guessedLetter);

    currentGuess.value = ""; // by doing this we are resetting the value.

    const goodInput = validInput(guessedLetter); // Passes the guessed letter to the validInput function in order to verify whether it is a valid function

    if (goodInput.length === 1) { // Essentially if goodInput was ever returned after passing the conditional statements in validInput, then it will hold the .length value of one, and as a result it is eligible to be passed on to makeGuess function.
        makeGuess(guessedLetter);
    }

    console.log(goodInput);
})

/* Started Part 2 */

const validInput = function (input) { // This is the first outside function of guessButton.

    const acceptedLetter = /[a-zA-Z]/; // This line uses a regular expression to ensure the player inputs a letter! It is important to put the expression inside [brackets]

    /*if(input === "") {
        messages.innerText = "Please guess one letter in the input section"; 
    } else if (input === " , ") { // "This didn't properly access the input to check if more than one character was inputed"
        messages.innerText = "Too many characters to procces, try guessing only one letter";
    } else if (input.match(acceptedLetter)) {
        messages.innerText = "Please enter a letter of the Alphabet from A - Z"
    } else {
        return input;
    } */

    if(input === "") {
        messages.innerText = "Please guess one letter in the input section"; 
    } else if (input.length > 1) {
        messages.innerText = "Too many characters to procces, try guessing only one letter";
    } else if (!input.match(acceptedLetter)) { // the ! represents (does not equal)
        messages.innerText = "Please enter a letter of the Alphabet from A - Z"
    } else {
        //messages.innerText = "";
        return input;
    } 

};

const makeGuess = function (letter) { // This is the second outside function of guessButton
    guess = letter.toUpperCase() // Converts all the alphabetic characters in a string to uppercase

    if (guessedLetters.includes(guess)) {
        messages.innerText = "That letter has already been guessed, try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

