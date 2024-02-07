/* Global Variables */


const guessedAlpha = document.querySelector(".guessed-letters"); // The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess") // The button with the text “Guess!” in it.
const currentGuess = document.querySelector(".letter") // The text input where the player will guess a letter.
const mysteryWord = document.querySelector(".word-in-progress") // The empty paragraph where the word in progress will appear.
const guessesLeftElement = document.querySelector(".remaining") // The span inside the paragraph where the remaining guesses will display.
const messages = document.querySelector(".message") // The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again") // The hidden button that will appear prompting the player to play again.

let word = "magnolia"; // temporary value for the word 


let guessedLetters = [];
let guessesLeft = 8; 

const getWord = async function () {

    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();

    const wordsArray = words.split("\n"); // When the `.split()` method is used with "\n", it scans the string and splits it into separate elements at every occurrence of the "\n" marker.

    const randomNumber = Math.floor((Math.random()* wordsArray.length)); // In this equation I am looking for a random number inbetween zero and the amount of words availble in wordsArray.

    word = wordsArray[randomNumber].trim(); // By using the [] brackets I am telling the program to choose the word at the index position of #randomNumber. The .trim() is used to clear out any whitespace beside the word.
    // ERROR, previously my code was const words instead of "words =" when I changed that the program ran smoothly.

    //guessesLeft = word.length; // here I am giving guesses left a new value based on the length of the new random
    console.log(word);

    circleLetters(word);

    
    //console.log(wordsArray); 
};

// This starts the game
getWord();

//////////////////////////  Display our symbols as placeholders for the chosen word's letters \\\\\\\\\\\\\\\\\\\
const circleLetters = function (word) {  
    const mysteryCircles = []; // this is the array where the individual circles each representing a letter in the mystery word, will be pushed to.

    for(const letter of word) {
        //console.log(letter);
        mysteryCircles.push("●")
    }
    mysteryWord.innerText = mysteryCircles.join("");
    console.log(mysteryWord.innerText);
};



///////////////////////// Activate the Guess Button to retrieve Letter, and test for eligibility \\\\\\\\\\\\\\\
guessButton.addEventListener("click", function (event) {
    event.preventDefault();

    messages.innerText = "";

    const guessedLetter = currentGuess.value // this takes the value of the letter inputed into the input section
    //console.log(guessedLetter);

    currentGuess.value = ""; // by doing this we are resetting the value.

    const goodInput = validInput(guessedLetter); // Passes the guessed letter to the validInput function in order to verify whether it is a valid function

    if (goodInput) { // Essentially if goodInput was ever returned after passing the conditional statements in validInput, then the letter will be pased on to makeGuess. Originally I had .length value as part of the conditional statement, [if (goodInput.length === 1)] this did present some erros popping up occasionally
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
        messages.innerText = "Too many characters to process, try guessing only one letter";
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
        messages.innerText = "That letter has already been guessed, try again."; // checks to see whether this guess has alread been made
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessedLetters();
        updateGuessesLeft(guess); // The important thing to remember is guess has been vetted to be a real letter, while it is proccesed in the "validInput" function. Guessed letters does not represent the guess made. It represent the array of guesses made.
        updateWord(guessedLetters); // guessedLetters must be passed as an argument so Update word can refer to its value in the function. 
    }
};

/* Started Part 3 */

const updateGuessedLetters = function () {
    guessedAlpha.innerHTML = "";

    for (const letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = letter;
        guessedAlpha.append(li);
    }
};

const updateWord = function (guessedLetters) {
    
    const wordUpper = word.toUpperCase(); // This line of code, take the word code and changes all the letter of "word" and gives them the value of Uppercase letter. This is important because the guessed letters in the guessedLetters array were also converted to uppercase, apples to apples right.

    const wordArray = wordUpper.split(""); // This line of code, transforms the string "word" and coverts it into an array. "wordArray" will now have that array.

    const revealWord = []; // I have to create a new array that will update with correct guesses made by the user. While keeping the circle for the letters that have not been guessed yet. 

    for (const letter of wordArray) // word became redefined as an array, every letter of wordArray will be compared to the guessedLetters
    if (guessedLetters.includes(letter)) { // Checks to see if guessedLetters includes a letter from the wordArray.
        revealWord.push(letter.toUpperCase()); // when I was writting the code I forgot to put brackets beside the .toUpperCase()
    } else {
        revealWord.push("●") // Since wordArray is a finite array, if a letter isn't pushed for a guessedLetter, the only other option to to keep it concealed with a circle. So every letter in wordArray that has not been guessed will push "●".
    }

    mysteryWord.innerText = revealWord.join(""); // The former circleLetters function is no longer valid for us, and so we must replace it with the new array created called "revealWord".

    checkForWin(); // Calls on another function to determine whether or not the word has been guessed.

    console.log(wordArray)
};

/* Part 3 */

const updateGuessesLeft = function (guess) {
    const wordCap = word.toUpperCase(); // This is similar to the variable in the other function called wordUpper

    if(!wordCap.includes(guess)) { // Send a message to the user telling them if there guess was correct or not.
        messages.innerText = `Sorry, the word does not contain the letter ${guess.toUpperCase()}, try again.`;
        guessesLeft -= 1; // Subtracts an incorrect guess from the total remaining guesses. This could have been placed in an earlier function in the code, but in this case were only subtracting from the guesses that were actuall letters.
    } else {
        messages.innerText = `Good guess the word has the letter ${guess.toUpperCase()}.`
    }

    if(guessesLeft === 0) {
        messages.innerHTML = `GAME OVER! The word is <span class="highlight">${word.toUpperCase()}</span>.`; // The message displayed to the user if the game defeats them.
        guessesLeftElement.innerText = `You have 0 guesses remaining`;
        startOver();
    } else if (guessesLeft === 1) {
        guessesLeftElement.innerText = `You have 1 guess remaining.`; // This else if statement was neccesary for grammar purposes. "You have 1 guesses remaining" is improper grammar.
    } else {
        guessesLeftElement.innerText = `You have ${guessesLeft} guesses remaining.`; // The template literal is used in this occasion, to give it's value to the string.
    }
};

/* Part 2 */

const checkForWin = function () {
    if (word.toUpperCase() === mysteryWord.innerText) { // keep including the .toUpperCase inorder to avoid silly errors. Also the mysteryWord.innerText was just updated an excuted in the function above. That is why it is being used for reference here.
        messages.classList.add("win"); // ERROR I forgot to put the brackets beside .toUpperCase
        messages.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>` // ERROR fix, I forgot to include the [``]. This statement is adding a congratulations message, to the empty paragraph. And is seperate for the mysteryWord inner text. 
        startOver();
    }
}; 

/* Part 4 */

const startOver = function () {
    guessButton.classList.add("hide");
    guessesLeftElement.classList.add("hide");
    guessedAlpha.classList.add("hide");

    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
    messages.classList.remove("win");
    messages.innerText = "";
    guessedAlpha.innerText = "";

    guessesLeft = 8;
    guessedLetters = [];
    guessesLeftElement.innerText = `You have ${guessesLeft} guesses remaining.`;

    guessButton.classList.remove("hide");
    guessesLeftElement.classList.remove("hide");
    guessedAlpha.classList.remove("hide");

    playAgainButton.classList.add("hide");

    getWord();
})

/* 
const circleLetters = function (word) { // this code works but does not preform the correct task.
    for(const letter of word) {
        console.log(letter);
        let p = document.createElement("p");
        p.innerText ="●";
        mysteryWord.append(p);
    }
}; */ 

