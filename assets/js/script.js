let word = [
    "becode",
    "javascript",
    "html",
    "css",
    "programmation",
    "windows",
    "linux",
    "language",
    "ordinateur",
    "android",
    "ios",
    "souris",
    "clavier",
    "smartphone",
    "casque",
    "tablette",
]
let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let numLetterWord = 0;
let dash = [];

//Fonction qui choisit un mot aléatoire dans le tableau word.
function randomWord() {
    answer = word[Math.floor(Math.random() * word.length)];
}

//Fonction qui génère un boutton par lettre.
function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button
        class="btn btn-lg btn-warning m-2"
        id='` + letter + `'
        onClick="guess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

//fonction qui envoie le nombre nécessaire de tiret dans le fichier HTML.
function transformWord() {
    numLetterWord = answer.length;
    while (numLetterWord > 0) {
        dash.push('_ ');
        numLetterWord = numLetterWord - 1;
    }
    document.getElementById('wordToGuess').innerHTML = dash.join('');
}

//Fonction qui regarde quand le mot est deviné. Si il
function guess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        gameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes = mistakes + 1;
        image();
        updateMistakes();
        gameLost();
    }
}

//Fonction qui remplace un ou plusieurs "_" par la bonne lettre trouvée.
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordToGuess').innerHTML = wordStatus;
}

//Fonction qui affiche you won si l'utilisateur a gagné.
function gameWon() {
    if (wordStatus === answer) {
        alert('congratulations ! You found by making ' + mistakes + ' mistakes');
        reset();
    }
}

//Fonction qui affiche you lost si l'utilisateur a perdu.
function gameLost() {
    if (mistakes === maxWrong) {
        alert('You lost. The word is : ' + answer);
        reset();
    }
}

//Fonction qui met à jours le nombre d'erreur(s) dans la page HTML.
function updateMistakes() {
    if (mistakes < 4) {
        document.getElementById('mistakes').innerHTML = `<b>${mistakes}</b>`;
        document.getElementById('mistakes').style.color = '#00B204';
    } else if (mistakes < 7) {
        document.getElementById('mistakes').innerHTML = `<b>${mistakes}</b>`;
        document.getElementById('mistakes').style.color = '#FBD100';
    } else {
        document.getElementById('mistakes').innerHTML = `<b>${mistakes}</b>`;
        document.getElementById('mistakes').style.color = '#FF0000';
    }
}

//Fonction qui change l'image en fonction du nombre d'erreur(s).
function image() {
    document.getElementById('hangman').src = 'assets/img/hangman' + mistakes + '.png';
}

//Fonction qui reset le jeu.
function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangman').src = 'assets/img/hangman0.png'
    generateButtons();
    randomWord();
    guessedWord();
    updateMistakes();
}


document.getElementById('maxWrong').innerHTML = maxWrong;





randomWord();
transformWord();
generateButtons();
image();