images = ["images/dice-00.svg",
          "images/dice-01.svg",
          "images/dice-02.svg",
          "images/dice-03.svg",
          "images/dice-04.svg",
          "images/dice-05.svg",
          "images/dice-06.svg"];

claimImages = ["images/dice-01-claim.svg",
               "images/dice-02-claim.svg",
               "images/dice-03-claim.svg",
               "images/dice-04-claim.svg",
               "images/dice-05-claim.svg",
               "images/dice-06-claim.svg"];

playerOne = {
    name: "Player One",
    hand: [0,0,0,0,0],
    points: 0,
    html: "playerOneHand",
}

playerTwo = {
    name: "Player Two",
    hand: [0,0,0,0,0],
    points: 0,
    html: "playerTwoHand",
}

playerThree = {
    name: "Player Three",
    hand: [0,0,0,0,0],
    points: 0,
    html: "playerThreeHand",
}

playerFour = {
    name: "Player Four",
    hand: [0,0,0,0,0],
    points: 0,
    html: "playerFourHand",
}

window.players = [playerOne, playerTwo, playerThree, playerFour];

turnCount = 0;
amount = 1;
dieFace = 1;
claim = [0,0]

// Get the names of all players
function getNames()
{
	name1 = document.getElementById("player_1").value;
	if (name1 === "")
		name1 = "Player 1";
	document.getElementById("player_1").value = "";

	name2 = document.getElementById("player_2").value;
	if (name2 === "")
		name2 = "Player 2";
	document.getElementById("player_2").value = "";

	name3 = document.getElementById("player_3").value;
	if (name3 === "")
		name3 = "Player 3";
	document.getElementById("player_3").value = "";

	name4 = document.getElementById("player_4").value;
	if (name4 === "")
		name4 = "Player 4";
	document.getElementById("player_4").value = "";

	window.playerOne.name = name1;
	playerTwo.name = name2;
	playerThree.name = name3;
	playerFour.name = name4;

	players = [playerOne, playerTwo, playerThree, playerFour];
};

function roll() {
    document.querySelectorAll(".die").forEach(function(die) {
      die.classList.add("shake");
    });
    setTimeout(function() {
        document.querySelectorAll(".die").forEach(function(die) {
        die.classList.remove("shake");
      });
    },
    1000
    );
};

function onNewGame() {
    document.getElementById("downArrow").style.visibility = 'hidden';
    document.getElementById("downDiceArrow").style.visibility = 'hidden';
    //document.querySelector("#amountInput").setAttribute("min", 1);
    //document.querySelector("#dieFaceInput").setAttribute("min", 1);
    //document.querySelector("#amountInput").value = 1;
    //document.querySelector("#dieFaceInput").value = 1;
    claim[0] = 0;
    claim[1] = 0;
    amount = 1;
    dieFace = 1;

	window.players = [playerOne, playerTwo, playerThree, playerFour];
	for (let i = 0; i < 4; i++)
	{
		console.log(playerOne.name);
		console.log(players[i].name);
	}
	document.query(".playerOneBox .name").innerHTML = playerOne.name;
	document.getElementById("name2").innerHTML = players[1].name;
	document.getElementById("name3").innerHTML = players[2].name;
	document.getElementById("name4").innerHTML = players[3].name;


    document.getElementById("amount").innerHTML = amount;
    document.getElementById("dieFaceClaim").setAttribute("src", claimImages[dieFace-1]);

    roll();
    players.forEach(player => {
        player.hand.forEach(function(part, index) {
            this[index] = Math.floor(Math.random() * 6) + 1;
        }, player.hand);
        console.log(`${player.name}: ${player.hand}`);
    });
    for (let i = 0; i < 5; i++) {
        document.querySelector("." + players[turnCount % 4].html + " #die-" + (i+1)).setAttribute("src", images[players[turnCount % 4].hand[i]]);
    }
};

//All Functions for left side of action container below

function amountUp() {
    document.getElementById("downArrow").style.visibility = 'visible';
    if(amount + 1 > 20) {
        document.getElementById("upArrow").style.visibility = 'hidden';
        console.log("Amount too big");
        return;
    }
    else if (amount === 19) {
        document.getElementById("upArrow").style.visibility = 'hidden';
    }

    if (amount + 1 > claim[1] && claim[1] > 1) {
        document.getElementById("downDiceArrow").style.visibility = 'visible';
    }

    amount++;
    document.getElementById("amount").innerHTML = amount;
    console.log("Amount: " + amount);
}

function amountDown() {
    document.getElementById("upArrow").style.visibility = 'visible';
    if(amount - 1 < 1 || (amount - 1) < claim[0]) {
        document.getElementById("downArrow").style.visibility = 'hidden';
        console.log("Amount too small");
        return;
    }
    else if (amount === 2 || (amount - 2) < claim[0]) {
        document.getElementById("downArrow").style.visibility = 'hidden';
    }

    amount--;
    document.getElementById("amount").innerHTML = amount;
    console.log("Amount: " + amount);
}

function diceFaceUp() {
    document.getElementById("downDiceArrow").style.visibility = 'visible';
    if(dieFace + 1 > 6) {
        document.getElementById("upDiceArrow").style.visibility = 'hidden';
        console.log("Diceface too big");
        return;
    }
    else if (dieFace === 5) {
        document.getElementById("upDiceArrow").style.visibility = 'hidden';
    }

    dieFace++;
    document.getElementById("dieFaceClaim").setAttribute("src", claimImages[dieFace-1]);
    console.log("Die Face: " + dieFace);
}

function diceFaceDown() {
    document.getElementById("upDiceArrow").style.visibility = 'visible';
    if(dieFace - 1 < 1 || (amount === claim[0] && dieFace - 1 < claim[1])) {
        document.getElementById("downDiceArrow").style.visibility = 'hidden';
        console.log("Diceface too small");
        return;
    }
    else if (dieFace === 2) {
        document.getElementById("downDiceArrow").style.visibility = 'hidden';
    }

    dieFace--;
    document.getElementById("dieFaceClaim").setAttribute("src", claimImages[dieFace-1]);
    console.log("Die Face: " + dieFace);
}

function claimAction() {

    if(amount === claim[0] && dieFace === claim[1]) {
        console.log("You need to increase one of the fields to make a claim!");
        return;
    }

    claim[0] = amount;
    claim[1] = dieFace;

    console.log("Player " + (turnCount % 4 + 1) + " claims " + claim[0] + " " + claim[1] + "s!");

    for (let i = 0; i < 5; i++) {
        document.querySelector("." + players[turnCount % 4].html + " #die-" + (i+1)).setAttribute("src", images[0]);
    };

    turnCount++;

    for (let i = 0; i < 5; i++) {
        document.querySelector("." + players[turnCount % 4].html + " #die-" + (i+1)).setAttribute("src", images[players[turnCount % 4].hand[i]]);
    };

    document.getElementById("downArrow").style.visibility = 'hidden';
    document.getElementById("downDiceArrow").style.visibility = 'hidden';
}

function glow() {
    players.forEach(player => {
        for (let i = 0; i < 5; i++) {
            if(player.hand[i] == claim[1]) {
                document.querySelector("." + player.html + " #die-" + (i+1)).classList.add("glow");
            }
        }
    });
    setTimeout(function() {
        document.querySelectorAll(".die").forEach(function(die) {
        die.classList.remove("glow");
      });
    },
    3000
    )
};

function challengeAction() {
    if(claim[0] === 0 || claim[1] === 0) {
        return;
    }

    let counter = 0;
    players.forEach(player => {
        for (let i = 0; i < 5; i++) {
            document.querySelector("." + player.html + " #die-" + (i+1)).setAttribute("src", images[player.hand[i]]);
            if(player.hand[i] == claim[1]) {
                counter++;
            }
        }
    })

    glow();

    setTimeout(function() {
        if (counter < claim[0]) {
            console.log("Player " + (turnCount % 4) + " is a liar! Player " + (turnCount % 4 + 1) + " gets a point!");
            players[turnCount % 4].points++
            console.log("Player " + (turnCount % 4 + 1) + " has " + players[turnCount % 4].points + " points.");
        }
        else {
            console.log("Player " + (turnCount % 4 + 1) + "'s challenge failed! Player " + (turnCount % 4) + " gets a point!");
            players[(turnCount-1) % 4].points++
            console.log("Player " + (turnCount % 4) + " has " + players[(turnCount-1) % 4].points + " points.");
        }

        players.forEach(player => {
            for (let i = 0; i < 5; i++) {
                document.querySelector("." + player.html + " #die-" + (i+1)).setAttribute("src", images[0]);
            }
        })

        const scoreBoard = document.querySelectorAll(".score");
        scoreBoard[0].innerHTML = playerOne.points;
        scoreBoard[1].innerHTML = playerTwo.points;
        scoreBoard[2].innerHTML = playerThree.points;
        scoreBoard[3].innerHTML = playerFour.points;

        onNewGame();
    }, 5000
    );
};
