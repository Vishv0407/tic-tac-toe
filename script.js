const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector('.new-game-btn');

let currentPlayer;
let gameGrid;

const winPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create function for initialise the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });

    //remove new game btn
    newGameBtn.classList.remove("active");
    // update player turn
    gameInfo.innerText = `current Player - ${currentPlayer}`;

    //remove green color
    boxes.forEach((box,index) => {
        boxes[index].classList.remove("win");
    })

}

initGame();

boxes.forEach((box, index) => {
     box.addEventListener('click' , () => {
        handleClick(index);
     })
})

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // swap player
        swapTurn();

        // check win
        checkWinner();   
    }
}

function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //UI update
    gameInfo.innerText = `current Player - ${currentPlayer}`;
}

function checkWinner() {
    let winner = "";

    winPositions.forEach((position) => {
    
    // all box have same value/sign

        if( (gameGrid[position[0]] != "" && gameGrid[position[1]] != "" && gameGrid[position[2]] != "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            // check who is the winner
            if(gameGrid[position[0]] == "X")
                winner = "X";
            else
                winner = "O";

            // after win, no box should take input -> disable pointer
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // mark all winner box with green color
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
        
        
        if(winner != ""){
            gameInfo.innerText = `Winner🥳 - ${winner}`;
            newGameBtn.classList.add("active");
        }

        // if game tie

        let fillCount = 0;
        gameGrid.forEach((box) => {
            if(box !== ""){
                fillCount++;
            }
        })

        if(fillCount === 9){
            gameInfo.innerText = `Game tied!`;
            newGameBtn.classList.add("active");
        }
    
    })
}

newGameBtn.addEventListener('click', initGame);