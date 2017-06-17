"use strict";

//Get player names
function getName(name) {
	var playerName = prompt("Please enter your name.");
	return playerName;
}

//Dice rolls
function rollDice(){
    var diceRoll = Math.floor(Math.random() * 20) + 1;
	return diceRoll;
}

function attackDiceRoll() {
    var diceRoll = Math.floor(Math.random() * 6) + 1;
	return diceRoll;
}

function chanceDiceRoll() {
	var diceRoll = Math.floor(Math.random() * 10) + 1;
	return diceRoll;
}

//Each players turns to roll
function playerTurnToRoll(playerName) {
	var answer = confirm(playerName+" it's your turn.  Ready to roll?");
	var playerRolls;
	
	if (answer) {
		playerRolls = rollDice();
	}
	else {
		playerRolls = 0;
	}
	displayDiceRollAlert(playerRolls);
	return playerRolls;
}

//Display the result of the dice rolls for each turn
function displayDiceRollAlert(playerRolls) {
	
	if ((playerRolls >= 1) && (playerRolls <=5)) {
		alert("Ehh...that's a decent roll.  You rolled a "+playerRolls);
	}
	else if ((playerRolls >= 6) && (playerRolls <=12)) {
		alert("Not a bad roll.  You rolled a "+playerRolls);
	}
	else if ((playerRolls >= 13) && (playerRolls <=17)) {
		alert("Good.  You rolled a "+playerRolls);
	}
	else {
		alert("Great roll.  You rolled a "+playerRolls);
	}
}

//Update the score counter
function updateScore(playerLifePoints) {
	var score;
	
	if (playerLifePoints[1] > playerLifePoints[2]) {
		score = playerLifePoints[2];
	}
	else {
		score = playerLifePoints[1];
	}	
	return score;
}

//Give player choice to proceed or declice the chance option
function callChance () {
	var answer;
	var chance;
	
	answer = confirm("CHANCE!!! \n\nDo you want to take the chance to double your attack?  \n\nRoll the Chance Dice.  \nIf you get 7 or greater, double your attacks, otherwise, your opponent will GAIN life from the attacks instead.");
	
	if (answer) {
		chance = chanceDiceRoll();
	}
	else {
		alert("Chicken!!");
		chance = 0;
	}
	return chance;
}

//Display the chance dice roll
function displayChanceRollAlert(chanceRoll) {
	if (chanceRoll >= 7) {
		alert("NICE!! Your chance paid off. You rolled a "+chanceRoll+". \n\nAttacks Doubled");
	}
	else if ((chanceRoll >=1) && (chanceRoll < 7)) {
		alert("TOO BAD! You rolled a "+chanceRoll+". \n\nOpponet Gains Life");
	}
	else {
		return;
	}
}

//Display the attack dice roll
function displayAttackRollAlert(attackRoll) {
	
	alert("What's your attack?  Roll the attack dice.");
	
	if (attackRoll === 1) {
		alert("You rolled a "+attackRoll+". \n\nSMACK! Attacks with a Slap.");
	}
	else if (attackRoll === 2) {
		alert("You rolled a "+attackRoll+". \n\nBAM! Attacks with a Headbutt.");
	}
	else if (attackRoll === 3) {
		alert("You rolled a "+attackRoll+". \n\nBOING! Attacks was Blocked.");
	}
	else if (attackRoll === 4) {
		alert("You rolled a "+attackRoll+". \n\nPOW! Attacks with a Punch.");
	}
	else if (attackRoll === 5) {
		alert("You rolled a "+attackRoll+". \n\nKRUNCH! Attacks with a Kick.");
	}
	else {
		alert("You rolled a "+attackRoll+". \n\nWHAM! Attacks with a Body Slam.");
	}
}

//Determine and calculate the type of attack base of the attack dice roll	
function determineAttack(guess,lifePoints,player) {
	var attack;
	var chance = 0;
	
	attack = attackDiceRoll();
	displayAttackRollAlert(attack);
	
	if (guess == attack) {
		
		chance = callChance();			
		displayChanceRollAlert(chance);
		
		if (chance >= 7) {	
			lifePoints = calculateChanceAttack(attack, player, lifePoints);
		}
		else if ((chance >=1) && (chance < 7)) {
			lifePoints = calculateNonChanceAttack(attack, player, lifePoints);
		}
	}
	else {
		lifePoints = calculateRegularAttack(attack, player, lifePoints);
	}
	return lifePoints;
}

//Calculate regular attacks
function calculateRegularAttack(attack, player, lifePoints) {
	var block = 1;
	var slap = 2;
	var headbutt = 4;
	var punch = 6;
	var kick = 8;
	var bodySlam = 10;
	
	console.log("Attack Roll is ",attack);
	
	if (attack === 1) {
		console.log("Attacks with Slap! ",player,"Loses ",slap," life");
		lifePoints = lifePoints - slap;
	}
	else if (attack === 2) {
		console.log("Attack with Headbutt! ",player," Loses ",headbutt," life");
		lifePoints = lifePoints - headbutt;
	}
	else if (attack === 3) {
		console.log("Attack was Blocked! ",player," Loses ",block," life");
		lifePoints = lifePoints - block;
	}
	else if (attack === 4) {
		console.log("Attacks with Punch! ",player," Loses ",punch," life");
		lifePoints = lifePoints - punch;
	}
	else if (attack === 5) {
		console.log("Attacks with Kick! ",player," Loses ",kick," life");
		lifePoints = lifePoints - kick;
	}
	else if (attack === 6) {
		console.log("Attacks with Body Slam! ",player," Loses ",bodySlam," life");
		lifePoints = lifePoints - bodySlam;
	}
	return lifePoints;
}

//Calculate a chance won attack
function calculateChanceAttack(attack, player, lifePoints) {
	var block = 1;
	var slap = 2;
	var headbutt = 4;
	var punch = 6;
	var kick = 8;
	var bodySlam = 10;
	
	console.log("Attack Roll is ",attack);

	if (attack === 1) {
		console.log("Attacks Doubled! Attacks with Slap! ",player," Loses ",slap*2," life");
		lifePoints = lifePoints - (slap*2);
	}
	else if (attack === 2) {
		console.log("Attacks Doubled! Attack with Headbutt! ",player," Loses ",headbutt*2," life");
		lifePoints = lifePoints - (headbutt*2);
	}
	else if (attack === 3) {
		console.log("Attacks Doubled! Attack was Blocked! ",player," Loses ",block*2," life");
		lifePoints = lifePoints - (block*2);
	}
	else if (attack === 4) {
		console.log("Attacks Doubled! Attacks with Punch! ",player," Loses ",punch*2," life");
		lifePoints = lifePoints - (punch*2);
	}
	else if (attack === 5) {
		console.log("Attacks Doubled! Attacks with Kick! ",player," Loses ",kick*2," life");
		lifePoints = lifePoints - (kick*2);
	}
	else if (attack === 6) {
		console.log("Attacks Doubled! Attacks with Body Slam! ",player," Loses ",bodySlam*2," life");
		lifePoints = lifePoints - (bodySlam*2);
	}
	return lifePoints;
}

//Calculate a chance lost attack
function calculateNonChanceAttack(attack, player, lifePoints) {
	var block = 1;
	var slap = 2;
	var headbutt = 4;
	var punch = 6;
	var kick = 8;
	var bodySlam = 10;
	
	console.log("Attack Roll is ",attack);
	
	if (attack === 1) {
		console.log("Chance lost! Attacks with Slap countered!",player," gains ",slap," life");
		lifePoints = lifePoints + slap;
	}
	else if (attack === 2) {
		console.log("Chance lost! Attack with Headbutt countered!",player," gains ",headbutt," life");
		lifePoints = lifePoints + headbutt;
	}
	else if (attack === 3) {
		console.log("Chance lost! Attack was Blocked countered!",player," gains ",block," life");
		lifePoints = lifePoints + block;
	}
	else if (attack === 4) {
		console.log("Chance lost! Attacks with Punch countered!",player," gains ",punch," life");
		lifePoints = lifePoints + punch;
	}
	else if (attack === 5) {
		console.log("Chance lost! Attacks with Kick countered!",player," gains ",kick," life");
		lifePoints = lifePoints + kick;
	}
	else if (attack === 6) {
		console.log("Chance lost! Attacks with Body Slam countered!",player," gains ",bodySlam," life");
		lifePoints = lifePoints + bodySlam;
	}
	return lifePoints;
}

//Display what the player rolls
function displayDiceRolls(player, playerDiceRoll) {
	console.log(player[1]," rolls ", playerDiceRoll[1]);
	console.log(player[2]," rolls ", playerDiceRoll[2]);
}

//Display the status of each player's life points
function displayLifeTotal(player, playerLifePoints) {
	console.log("");
	console.log("Life Points Status");
	console.log(player[1],"'s Life = ",playerLifePoints[1]);
	console.log(player[2],"'s Life = ",playerLifePoints[2]);
	console.log("");
}

//Determine the result
function gameResult(player,playerLifePoints) {
	var result = [];
	
	if (playerLifePoints[1] > playerLifePoints[2]) {
		result[1] = player[1];
		result[2] = playerLifePoints[1];
		result[3] = player[2];
	}
	else {
		result[1] = player[2];
		result[2] = playerLifePoints[2];
		result[3] = player[1];
	}
	return result;
}

//Display the result of the winner
function displayWinner(result) {
	alert(result[3]+" is down for the count.\n\nGAME OVER");
	alert(result[1]+" is the Winner with "+result[2]+" life points left.");
	console.log(result[1]," is the Winner with ",result[2]," life points left.");	
}

//Compare each player's dice roll to determine who won
function compareDiceRolls(playerDiceRoll, playerLifePoints, player) {
	var guess;
	
		if (playerDiceRoll[1] === playerDiceRoll[2]) {
			alert("It's a tie.  Roll again");
			console.log("It's a tie.  Roll again");
		}		
		else if (playerDiceRoll[1] > playerDiceRoll[2]) {
			alert(player[1]+" wins the roll with "+playerDiceRoll[1]);
			console.log(player[1]," wins the roll",playerDiceRoll[1]);
			guess = prompt("Pick a number between 1 and 6 for a chance to double your attacks.");
			playerLifePoints[2] = determineAttack(guess,playerLifePoints[2], player[2]);
		}
		else {
			alert(player[2]+" wins the roll with "+playerDiceRoll[2]);
			console.log(player[2]," wins the roll",playerDiceRoll[2]);
			guess = prompt("Pick a number between 1 and 6 for a chance to double your attacks.");
			playerLifePoints[1] = determineAttack(guess,playerLifePoints[1], player[1]);
		}
	return playerLifePoints;
}

//Display result to the html webpage
function displayHTML(player, playerLifePoints, result) {
	document.getElementById("playerOne").innerHTML = player[1];
	document.getElementById("playerTwo").innerHTML = player[2];	
	
	document.getElementById("playerOneLife").innerHTML = playerLifePoints[1];
	document.getElementById("playerTwoLife").innerHTML = playerLifePoints[2];	

	document.getElementById("winner").innerHTML = result[1];	
}

//Display intro message
function displayIntro() {
	console.log("Welcome Players.  Make sure you strecth.  Don't pull a muscle.");
	console.log("")
	console.log("Both players will start with 20 points.  First one to knock the other one to 0 life points WINS.");
	console.log("LET'S GET READY TO PLAY.");
	console.log("")
}

//Display player's name
function displayPlayers(player) {
	console.log("Player One = ",player[1]);
	console.log("Player Two = ",player[2]);
	console.log("");
	alert(player[1]+" vs "+player[2]+"\n\nLETS PLAY!");
}

//Convert the negative score to zero for the webpage
function convertNegativeToZero(playerLifePoints) {
	if (playerLifePoints[1] > playerLifePoints[2]) {
		playerLifePoints[2] = Math.max(0, playerLifePoints[2]);
	}
	else {
		playerLifePoints[1] = Math.max(0, playerLifePoints[1]);
	}
	return playerLifePoints;
}

//Main function to play the game	
function playGame() {
	var player = [];
	var playerLifePoints = [];
		playerLifePoints[1] = 20;
		playerLifePoints[2] = 20;
	var playerDiceRoll = [];
	var score = 1;
	var winnerResult = [];
	 
	displayIntro();
	
	player[1] = getName();
	player[2] = getName();

	displayPlayers(player);
	
	while (score > 0) {
		playerDiceRoll[1] = playerTurnToRoll(player[1]);
		playerDiceRoll[2] = playerTurnToRoll(player[2]);
		
		displayDiceRolls(player, playerDiceRoll);
		
		playerLifePoints = compareDiceRolls(playerDiceRoll, playerLifePoints, player);
		displayLifeTotal(player, playerLifePoints);
		
		score = updateScore(playerLifePoints);
	}
	
	winnerResult = gameResult(player,playerLifePoints);
	displayWinner(winnerResult);
	
	playerLifePoints = convertNegativeToZero(playerLifePoints);
	displayHTML(player, playerLifePoints, winnerResult);
}

playGame();

