/* Global Variables */

const guessedAlpha = document.querySelector(".guessed-letters"); // The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess") // The button with the text “Guess!” in it.
const currentGuess = document.querySelector(".letter") // The text input where the player will guess a letter.
const mysteryWord = document.querySelector(".word-in-progress") // The empty paragraph where the word in progress will appear.
const guessesLeft = document.querySelector(".remaining") // The span inside the paragraph where the remaining guesses will display.
const correctLetter = document.querySelector(".message") // The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again") // The hidden button that will appear prompting the player to play again.

/* temporary value for the word */ const word = "magnolia";

/*const circleLetters = function (word) {
    for(const letter of word) {
        console.log(letter);
        let p = document.createElement("p");
        p.innerText ="●";
        mysteryWord.append(p);
    }
} */
 
const circleLetters = function (word) { // // Display our symbols as placeholders for the chosen word's letters
    const mysteryCircles = []; // this is the array where the individual circles each representing a letter in the mystery word, will be pushed to.

    for(const letter of word) {
        console.log(letter);
        mysteryCircles.push("●")
    }
    mysteryWord.innerText = mysteryCircles.join("");
    console.log(mysteryWord.innerText);
};

circleLetters(word); 

guessButton.addEventListener("click", function (event) {
    event.preventDefault();

    const guessedLetter = currentGuess.value // this takes the value of the letter inputed into the input section
    console.log(guessedLetter);

    currentGuess.value = ""; // by doing this we are resetting the value.
})