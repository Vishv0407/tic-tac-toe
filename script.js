const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector('.new-game-btn');
const onePlayer = document.querySelector(".onePlayer");
const twoPlayer = document.querySelector(".twoPlayer");
const homeContainer = document.querySelector(".home-container");
const mainContainer = document.querySelector(".main-container");
const homeBtn = document.querySelector(".homeBtn");
const gamePlayerStatus = document.querySelector(".playerGameStatus");
const resetBtn = document.querySelector(".resetBtn");

let currentPlayer;
let gameGrid;
let isOver = false;

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
function initGame(mode) {

    // homeContainer.classList.add("active");
    mainContainer.classList.remove("active");
    resetBtn.style.display = "flex";

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

    isOver = false;

     // Custom initialization based on game mode
     if (mode === "onePlayer") {
        playOnePlayer();
    } else if (mode === "twoPlayer") {
        playTwoPlayer();
    }

}

initGame();

function playOnePlayer() {
    // initGame();
    gamePlayerStatus.innerText = `1 player game`;

    boxes.forEach((box, index) => {
        box.addEventListener('click' , () => { 
           handleClick2(index);
        })
   })
}

function playTwoPlayer() {
    // initGame();
    gamePlayerStatus.innerText = `2 player game`;

    boxes.forEach((box, index) => {
        box.addEventListener('click' , () => { 
           handleClick(index);
        })
   })
}



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


function handleClick2(index){

    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        
        // swap player
        swapTurn();
        
        checkWinner(); 

        if (currentPlayer === "O" && isOver === false) {
            let arrCheck = [];
            gameGrid.forEach((element, index) => {

              if (element === "") {
                arrCheck.push(index);
              }
            });
            
            // Use async/await for a cleaner pause and code flow
            setTimeout(() => {
                let tempCompIndex = arrCheck[Math.floor(Math.random() * arrCheck.length)];
                gameGrid[tempCompIndex] = "O";
                boxes[tempCompIndex].innerHTML = "O";
                swapTurn();
                checkWinner();
              }, 400); // Pause for 1 second
        }
        // check win
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
            resetBtn.style.display = "none";
            gameGrid.style.pointerEvents = "none";
            
            isOver = true;
        }

        // if game tie
        let fillCount = 0;
        gameGrid.forEach((box) => {
            if(box !== ""){
                fillCount++;
            }
        })

        if(fillCount === 9 && winner === ""){
            gameInfo.innerText = `Game tied!`;
            newGameBtn.classList.add("active");
            resetBtn.style.display = "none";
            gameGrid.style.pointerEvents = "none";
            isOver = true;
        }
    
    })
}

function resetGrid(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });
    gameInfo.innerText = `current Player - ${currentPlayer}`;

     //remove green color
     boxes.forEach((box,index) => {
        boxes[index].classList.remove("win");
    })

    //remove new game btn
    newGameBtn.classList.remove("active");
}

newGameBtn.addEventListener('click', () => {
    initGame();
});

onePlayer.addEventListener('click', () => {
    initGame("onePlayer");  // Call the function with "onePlayer" mode
    homeContainer.classList.add("active");
    mainContainer.classList.add("active");
});

twoPlayer.addEventListener('click', () => {
    initGame("twoPlayer"); // Call the function with "twoPlayer" mode
    homeContainer.classList.add("active");
    mainContainer.classList.add("active");
});

  
homeBtn.addEventListener('click', () => {
    location.reload();
});

resetBtn.addEventListener('click', () => {
    resetGrid();

});