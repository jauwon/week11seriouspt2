console.log($('body'));


const gameboard = document.getElementById("gameboard");
const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restartBtn");
const playText = document.getElementById("playText");
//to start with blank sheet 
const spaces = [null, null, null, null, null, null, null, null, null];
//to refer back to O = human 
const O_TEXT = "O";
// //to refer back to x = robo 
const X_TEXT = "X";
//player is human who starts first 
let currentPlayer = O_TEXT;



const drawBoard = () => {
    boxes.forEach((box, index) => {
      let styleString = "";
      //means the boxes are on top, we want then a border to be on the bottom
      if (index < 3) {
        styleString += `border-bottom: 3px solid var(--purple);`;
      }
      //looking for element on the left,we want to make a border on the right
      if (index % 3 === 0) {
        styleString += `border-right: 3px solid var(--purple);`;
      }
      //if element is on the the right, we want to make a border on the left
      if (index % 3 === 2) {
        styleString += `border-left: 3px solid var(--purple);`;
      }
      //if the element on the bottom row, we want the border on top.
      if (index > 5) {
        styleString += `border-top: 3px solid var(--purple);`;
      }
      //to call our styleString
      box.style = styleString;
      //added eventListener so we know when the boxes are clicked 
      box.addEventListener("click", boxClicked);
    });
  };

  //boxClicked function takes e=event 
  function boxClicked(e) {
      //to tell which box is clicked 
    const id = e.target.id;
    //if the space is free add to it
    if (!spaces[id]) {
      spaces[id] = currentPlayer;
      e.target.innerText = currentPlayer;
      //to figure out if wins hasPlayerWon is put into place
      if (hasPlayerWon(currentPlayer)) {
        playText.innerHTML = `${currentPlayer} wins!!`;
        return;
      }
      //flipping turns between the two 
      currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    }
  }

  const hasPlayerWon = (player) => {
    //from top left, check across, down, and diagonal
    if (spaces[0] === player) {
      if (spaces[1] === player && spaces[2] === player) {
        console.log(`${player} wins up top`);
        return true;
      }
      if (spaces[3] === player && spaces[6] === player) {
        console.log(`${player} wins on the left`);
        return true;
      }
      if (spaces[4] === player && spaces[8] === player) {
        console.log(`${player} wins on the diagonal`);
        return true;
      }
    }
    //from bottom check up and across
    if (spaces[8] === player) {
      if (spaces[2] === player && spaces[5] === player) {
        console.log(`${player} wins on the right`);
        return true;
      }
      if (spaces[7] === player && spaces[6] === player) {
        console.log(`${player} wins on the bottom`);
        return true;
      }
    }
    //from middle check middle vertical and middle horizontal
    if (spaces[4] === player) {
      if (spaces[3] === player && spaces[5] === player) {
        console.log(`${player} wins on the middle horizontal`);
        return true;
      } }
      //from middle check middle vertical and middle horizontal
      if (spaces[2] === player) {
        if (spaces[4] === player && spaces[6] === player) {
          console.log(`${player} wins on the right middle horizontal`);
          return true;
        }
      if (spaces[1] === player && spaces[7] === player) {
        console.log(`${player} wins on the middle vertical`);
        return true;
      }
    }
  };



restartBtn.addEventListener("click", () => {
    spaces.forEach((space, index) => {
      spaces[index] = null;
    });
    boxes.forEach((box) => {
      box.innerText = "";
    });
    playText.innerHTML = `Let's Play!!`;

    currentPlayer = O_TEXT;
});



drawBoard();