( function() {
    "use strict";

    let start = document.querySelector("#start");
    let roll = document.querySelector("#roll");
    let pass = document.querySelector("#pass");
    let rollingArea = document.querySelector("#rollingArea");
    let currentRoll = document.querySelector("#currentRoll");
    let turn = document.querySelector("#turn");
    let playerScores = document.querySelector("#playerScores");
    let diceAmt1 = document.querySelector("#diceAmt1");
    let diceAmt2 = document.querySelector("#diceAmt2");
    let diceAmt3 = document.querySelector("#diceAmt3");
    let diceAmt4 = document.querySelector("#diceAmt4");
    let diceAmt5 = document.querySelector("#diceAmt5");
    let diceAmt6 = document.querySelector("#diceAmt6");
    let rollingDice1 = document.querySelector("#rollingDice1");
    let rollingDice2 = document.querySelector("#rollingDice2");
    let actions = document.querySelector("#actions");
    let diceInv = document.querySelector("#diceInv");
    let buttons = document.querySelector("#buttons");
    let ending = document.querySelector("#ending");
    let endingMsg = document.querySelector("#endingMsg");
    let playAgain = document.querySelector("#playAgain");

    const gameData = {
    dice: ["dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"],
    score: [0, 0],
    victory: 100,
    roll1: 1,
    roll2: 1,
    rollSum: 0,
    index: 0,
    diceInv1: [0, 0],
    diceInv2: [0, 0],
    diceInv3: [0, 0],
    diceInv4: [0, 0],
    diceInv5: [0, 0],
    diceInv6: [0, 0]
    };

    //start game

    start.addEventListener("click", function (event) {
        event.preventDefault();
        roll.style.display = "block";
        pass.style.display = "block";
        start.style.display = "none";

        gameData.index = Math.round(Math.random());
        turn.innerHTML = `<p>Player ${gameData.index + 1}'s Turn</p>`;
    });

    //roll

    roll.addEventListener("click", function (event) {
        event.preventDefault();

        roll.disabled = true;

        rollingDice1.className = "rolling";
        rollingDice2.className = "rolling";
        console.log(rollingDice1.className);

        setTimeout(function () {
            // random rolls and display
            gameData.roll1 = Math.floor((Math.random() * 6) + 1);
            gameData.roll2 = Math.floor((Math.random() * 6) + 1);

            rollingArea.innerHTML = `<img src="images/${gameData.dice[gameData.roll1 - 1]}" id="rollingDice1" class="notRolling"> <img src="images/${gameData.dice[gameData.roll2 - 1]}" id="rollingDice2" class="notRolling">`;

            rollingDice1.className = "notRolling";
            rollingDice2.className = "notRolling";
            console.log(rollingDice1.className);
            rollingDice1 = document.querySelector("#rollingDice1");
            rollingDice2 = document.querySelector("#rollingDice2");

            gameData.rollSum += gameData.roll1 + gameData.roll2;
            currentRoll.innerHTML = `<p>Current Roll: ${gameData.rollSum}</p>`;

            //check for doubles
            if (gameData.roll1 === 1 && gameData.roll2 === 1) {
                gameData.diceInv1[gameData.index] += 1;
                diceAmt1.innerHTML = `x${gameData.diceInv1[gameData.index]}`;
                double1();
            }
            else if (gameData.roll1 === 2 && gameData.roll2 === 2) {
                gameData.diceInv2[gameData.index] += 1;
                diceAmt2.innerHTML = `x${gameData.diceInv2[gameData.index]}`;

            }
            else if (gameData.roll1 === 3 && gameData.roll2 === 3) {
                gameData.diceInv3[gameData.index] += 1;
                diceAmt3.innerHTML = `x${gameData.diceInv3[gameData.index]}`;
            
            }
            else if (gameData.roll1 === 4 && gameData.roll2 === 4) {
                gameData.diceInv4[gameData.index] += 1;
                diceAmt4.innerHTML = `x${gameData.diceInv4[gameData.index]}`;
            
            }
            else if (gameData.roll1 === 5 && gameData.roll2 === 5) {
                gameData.diceInv5[gameData.index] += 1;
                diceAmt5.innerHTML = `x${gameData.diceInv5[gameData.index]}`;
            
            }
            else if (gameData.roll1 === 6 && gameData.roll2 === 6) {
                gameData.diceInv6[gameData.index] += 1;
                diceAmt6.innerHTML = `x${gameData.diceInv6[gameData.index]}`;
            }

            checkWin();

            roll.disabled = false;
        }, 2000);

    });

    //next turn

    pass.addEventListener("click", function(event) {
        event.preventDefault();
        nextTurn();
    })

    function nextTurn () {

        gameData.score[gameData.index] += gameData.rollSum;

        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        turn.innerHTML = `<p>Player ${gameData.index + 1}'s Turn</p>`;
        playerScores.innerHTML = `<p>Player 1: ${gameData.score[0]}pts</p> <p>Player 2: ${gameData.score[1]}pts</p>`;

        gameData.rollSum = 0;
        currentRoll.innerHTML = `<p>Current Roll: ${gameData.rollSum}</p>`;

        diceAmt1.innerHTML = `x${gameData.diceInv1[gameData.index]}`;
        diceAmt2.innerHTML = `x${gameData.diceInv2[gameData.index]}`;
        diceAmt3.innerHTML = `x${gameData.diceInv3[gameData.index]}`;
        diceAmt4.innerHTML = `x${gameData.diceInv4[gameData.index]}`;
        diceAmt5.innerHTML = `x${gameData.diceInv5[gameData.index]}`;
        diceAmt6.innerHTML = `x${gameData.diceInv6[gameData.index]}`;

        checkWin();
    };

    //dice inventory

    function double1 () {
        gameData.rollSum = 0;
        nextTurn();
    };

    //win check

    function checkWin () {
        if (gameData.score[0] >= gameData.victory) {
            turn.style.display = "none";
            diceInv.style.display = "none";
            buttons.style.display = "none";
            ending.style.display = "flex";
            endingMsg.innerHTML = "Player 1 has won!";
        }
        else if (gameData.score[1] >= gameData.victory) {
            turn.style.display = "none";
            diceInv.style.display = "none";
            buttons.style.display = "none";
            ending.style.display = "flex";
            endingMsg.innerHTML = "Player 2 has won!";
        }
    }

    //play again

    playAgain.addEventListener("click", function (event) {
        event.preventDefault();

        gameData.score[0] = 0;
        gameData.score[1] = 0;
        gameData.roll1 = 1;
        gameData.roll2 = 1;
        gameData.rollSum = 0;
        gameData.index = 0;
        gameData.diceInv1[0] = 0;
        gameData.diceInv1[1] = 0;
        gameData.diceInv2[0] = 0;
        gameData.diceInv2[1] = 0;
        gameData.diceInv3[0] = 0;
        gameData.diceInv3[1] = 0;
        gameData.diceInv4[0] = 0;
        gameData.diceInv4[1] = 0;
        gameData.diceInv5[0] = 0;
        gameData.diceInv5[1] = 0;
        gameData.diceInv6[0] = 0;
        gameData.diceInv6[1] = 0;

        rollingArea.innerHTML = `<img src="images/${gameData.dice[gameData.roll1 - 1]}" id="rollingDice1" class="notRolling"> <img src="images/${gameData.dice[gameData.roll2 - 1]}" id="rollingDice2" class="notRolling">`;

        playerScores.innerHTML = `<p>Player 1: ${gameData.score[0]}pts</p> <p>Player 2: ${gameData.score[1]}pts</p>`;

        turn.style.display = "flex";
        diceInv.style.display = "flex";
        buttons.style.display = "flex";
        ending.style.display = "none";

        });

    //quit



})();