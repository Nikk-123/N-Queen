document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const queensLeftSpan = document.getElementById("queensCount");
    const boardSizeInput = document.getElementById("boardSize");
    let n = parseInt(boardSizeInput.value, 10);
    let queens = [];

    function createBoard() {
        board.innerHTML = ""; // Clear existing board
        board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("data-row", i);
                cell.setAttribute("data-col", j);
        
                // Determine cell color
                if ((i + j) % 2 === 0) {
                    cell.classList.add("white-cell");
                } else {
                    cell.classList.add("black-cell");
                }
        
                cell.addEventListener("click", () => placeQueen(i, j));
                board.appendChild(cell);
            }
        }
        
        updateQueensLeft();
    }

    function updateQueensLeft() {
        const queensLeft = n - queens.length;
        if (queensLeft === 0) {
            const display = document.getElementById("display");
            // display.innerHTML = "<p>Congratulations! You've successfully placed all the queens!</p>";
            display.style.display = "block";
            display.textContent = "Congratulations! You've successfully placed all the queens!";
            console.log("congo")
        } else {
            const queensCountSpan = document.getElementById("queensCount");
            queensCountSpan.textContent = ""; 
            for (let i = 0; i < queensLeft; i++) {
                const queenIcon = document.createElement("span");
                queenIcon.innerHTML = "&#9813;"; // Unicode for chess queen
                queensCountSpan.appendChild(queenIcon);
            }
        }
    }    
    

    function placeQueen(row, col) {
        if (isValidPlacement(row, col)) {
            queens.push({ row, col });
            updateBoard();
            updateQueensLeft();
            clearInvalidPlacementMessage(); // Clear any existing invalid placement message
        } else {
            displayInvalidPlacementMessage(); // Display invalid placement message
        }
    }
    
    function displayInvalidPlacementMessage() {
        const display = document.getElementById("display");
        display.innerHTML = "Invalid queen placement!";
    }
    
    function clearInvalidPlacementMessage() {
        const display = document.getElementById("display");
        display.innerHTML = "";
    }
    
    function isValidPlacement(row, col) {
        for (const queen of queens) {
            if (
                queen.row === row ||
                queen.col === col ||
                queen.row + queen.col === row + col ||
                queen.row - queen.col === row - col
            ) {
                return false;
            }
        }
        return true;
    }

    function updateBoard() {
        clearBoard();
        queens.forEach((queen) => {
            const cell = document.querySelector(`[data-row="${queen.row}"][data-col="${queen.col}"]`);
            cell.innerHTML = "&#9813;"; // Unicode for chess queen
            cell.classList.add("queen");
        });
    }

    function clearBoard() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.innerHTML = "";
            cell.classList.remove("queen");
        });
    }

    function resetBoard() {
        queens = [];
        updateBoard();
        updateQueensLeft();
    }

    function undoMove() {
        queens.pop();
        updateBoard();
        updateQueensLeft();
    }

    function updateQueensLeft() {
        queensLeftSpan.textContent = n - queens.length;
    }

    window.updateBoardSize = function () {
        n = parseInt(boardSizeInput.value, 10);
        createBoard();
        resetBoard();
    };

    window.resetBoard = function () {
        queens = [];
        updateBoard();
        updateQueensLeft();
    };

    window.undoMove = function () {
        queens.pop();
        updateBoard();
        updateQueensLeft();
    };

    createBoard();
});
