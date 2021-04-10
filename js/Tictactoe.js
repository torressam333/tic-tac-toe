class Tictactoe {

    constructor() {
        //Used to keep track of the game status
        this.gameStatus = document.querySelector('.ttt-status');

        //Status to ensure game is still active (has not ended)
        this.active = true;

        //Current player
        this.currentLetter = "X";

        //State of the game - default is empty
        this.currentStateOfGame = ["", "", "", "", "", "", "", "", ""];

        this.win = () => `Team ${this.currentLetter} is the winner :)`;
        this.tie = () => `Looks like its a cats game`;
        this.whosTurn = () => `It is ${this.currentLetter}'s turn`;

        this.winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        this.initializeMethods();
    }

    initializeMethods() {
        //Set initial game status
        this.gameStatus.innerHTML = this.whosTurn();
        //this.nextLettersTurn();

        //Add an event listener to each tic-item
        document.querySelectorAll('.tic-item')
            .forEach(item => item.addEventListener('click', this.getLetterClicked.bind(this)));

        //Restart game
        document.querySelector('.ttt-restart').addEventListener('click', this.restartTheGame.bind(this));
    }

    currentLetterPlayed(clickedSquare, clickedSquareId) {
        //Update the currentStateOfGame array to store current move
        this.currentStateOfGame[clickedSquareId] = this.currentLetter;
        clickedSquare.innerHTML = this.currentLetter;
    }

    nextLettersTurn() {
        this.currentLetter = this.currentLetter === "X" ? "O" : "X"
        this.gameStatus.innerHTML = this.whosTurn();
    }

    handleResults() {
        let alreadyWon = false;

        for (let i = 0; i <= 7; i++) {
            const winningCombo = this.winningCombinations[i];
            let first = this.currentStateOfGame[winningCombo[0]];
            let second = this.currentStateOfGame[winningCombo[1]];
            let third = this.currentStateOfGame[winningCombo[2]];


            if (first === '' || second === '' || third === '') {
                continue;
            }

            if (first === second && second === third) {
                alreadyWon = true;
                break
            }
        }

        if (alreadyWon) {
            this.gameStatus.innerHTML = this.win();
            this.active = false;
            return;
        }

        let tieGame = !this.currentStateOfGame.includes("");

        if (tieGame) {
            this.gameStatus.innerHTML = this.tie();
            this.active = false;
            return;
        }

        this.nextLettersTurn();
    }

    //Logic to handle which square is clicked
    getLetterClicked(squareClickedEvent) {
        //Store specific clicked square ELEMENT in a variable
        const clickedSquare = squareClickedEvent.target;

        //Get int value of id of square that was clicked (1-9)
        const clickedSquareId = Number(clickedSquare.getAttribute('id'));

        //Ignore clicked square if it has been clicked already i.e. already has an O or X value
        if (this.currentStateOfGame[clickedSquareId] !== "" || !this.active) {
            return;
        }

        //If all good then keep playing
        this.currentLetterPlayed(clickedSquare, clickedSquareId);
        this.handleResults();
    }


    restartTheGame() {
        this.active = true;
        this.currentLetter = "X";
        this.currentStateOfGame = ["", "", "", "", "", "", "", "", ""];
        this.gameStatus.innerHTML = this.whosTurn();
        document.querySelectorAll('.tic-item').forEach((item => item.innerHTML = ""));
    }
}

let gameOne = new Tictactoe();