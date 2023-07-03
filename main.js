const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");



let currentPlayer;
let gameGrid;


const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// Let's create a function to initialise the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // UI empty kro
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Initialise box with CSS properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Call initGame funcion
initGame();


function swapTurn() {
    if(currentPlayer == "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }

    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}



function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        // All three boxes should be non-empty and exactly same in value.
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // check if winner is X
            if(gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "0";
            }

            // We know that we got a winner now so disable the pointer event for all indexs/boxes
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // Now we have a winner so change the BGC
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });


    // If we have a winner then active new game button and declare on top
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }


    // check Tie Condition
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" ){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerText = `"Game Tied !"`;
        newGameBtn.classList.add("active");
    }
}


function handleClick(index) {
    if(gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // Swap the turn
        swapTurn();

        // Check whether game over or not
        checkGameOver();
    }
}


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


// Restart the game
newGameBtn.addEventListener("click", initGame);