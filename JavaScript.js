/*
    Brendon So
    Copyright 2024
    Umass Lowell
    email: Brendon_So@student.uml.edu



	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
	find() function**
*/

//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//

const data = {
	"pieces": [
		{ "letter": "A", "value": 1, "amount": 9 },
		{ "letter": "B", "value": 3, "amount": 2 },
		{ "letter": "C", "value": 3, "amount": 2 },
		{ "letter": "D", "value": 2, "amount": 4 },
		{ "letter": "E", "value": 1, "amount": 12 },
		{ "letter": "F", "value": 4, "amount": 2 },
		{ "letter": "G", "value": 2, "amount": 3 },
		{ "letter": "H", "value": 4, "amount": 2 },
		{ "letter": "I", "value": 1, "amount": 9 },
		{ "letter": "J", "value": 8, "amount": 1 },
		{ "letter": "K", "value": 5, "amount": 1 },
		{ "letter": "L", "value": 1, "amount": 4 },
		{ "letter": "M", "value": 3, "amount": 2 },
		{ "letter": "N", "value": 1, "amount": 5 },
		{ "letter": "O", "value": 1, "amount": 8 },
		{ "letter": "P", "value": 3, "amount": 2 },
		{ "letter": "Q", "value": 10, "amount": 1 },
		{ "letter": "R", "value": 1, "amount": 6 },
		{ "letter": "S", "value": 1, "amount": 4 },
		{ "letter": "T", "value": 1, "amount": 6 },
		{ "letter": "U", "value": 1, "amount": 4 },
		{ "letter": "V", "value": 4, "amount": 2 },
		{ "letter": "W", "value": 4, "amount": 2 },
		{ "letter": "X", "value": 8, "amount": 1 },
		{ "letter": "Y", "value": 4, "amount": 2 },
		{ "letter": "Z", "value": 10, "amount": 1 }
	] //tried parse/fetch but it didn't work to extract the data from the json file 
};

//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//

function Game(score) {
	this.score = this.score;


}

function Tile(letter, value, amount) {
	this.letter = letter;
	this.value = value;
	this.amount = amount;
	this.image = `images/Scrabble_Tiles/Scrabble_Tile_${letter}.jpg`;
}
var total = 0;
var gamesplayed = 1;
var points = 0;
var tpoints = 0;
var val;

function draw(letter) {

	const obj = data.pieces[letter];

	const tile = new Tile(obj.letter, obj.value, obj.amount);

	const img = document.createElement('img');
	img.src = tile.image;
	img.classList.add('box');
	total += tile.value;

	
	//https://stackoverflow.com/questions/1324044/how-do-i-disable-a-jquery-ui-draggable
	//original method x/y axis breaks the generate
	//https://jqueryui.com/draggable/#revert https://jqueryui.com/droppable/ 
	//https://api.jquery.com/data/ ** review
	val = tile.value;
	$(img).draggable({ revert: true });
	$(img).data('val', tile.value);
	$(".board").data('val', tile.value);
	$(".double").data('val', tile.value);

	$("double").droppable({ //2x not working
		drop: function (event, ui) {
			val = ui.draggable.data('val');
			tpoints += val * 2; //current
			points += val * 2; //total

			document.getElementById("cscore").innerHTML = tpoints;
			tile.draggable('disable')
		}
	});

	$(".board").droppable({
		drop: function (event, ui) {
			val = ui.draggable.data('val');
			tpoints += val; //current
			points += val; //total
			
			document.getElementById("cscore").innerHTML = tpoints;
			tile.draggable('disable')
		}
	});



	return img;
}


//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function generate() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const randomIndex = Math.floor(Math.random()*26); //a-z w/ 27 max
	return randomIndex;
}

var key = false;
var extra = true;

function print() { 
	const tileRack = document.getElementById('rack');
	tpoints = 0;

	if (key == true) {
		deletetiles(extra);
		drawtiles();

	}
	else {
		drawtiles();
		key = true;
	}
	document.getElementById("score").innerHTML = total;
	document.getElementById("tscore").innerHTML = points;
	document.getElementById("cscore").innerHTML = tpoints;
	document.getElementById("Games").innerHTML = gamesplayed;

	total = 0;
	
	gamesplayed++;
}

function deletetiles() {
	const tileRack = document.getElementById('rack');
	for (var i = 0; i < 7; i++) {
		tileRack.removeChild(tileRack.firstChild);
	}
	if (extra == true) {
		tileRack.removeChild(tileRack.firstChild);
		extra = false; 
    }

}

function drawtiles() {
	const tile = document.getElementById('rack');
	const tileA = draw(generate());
	tile.appendChild(tileA);
	const tileB = draw(generate());
	tile.appendChild(tileB);
	const tileC = draw(generate());
	tile.appendChild(tileC);
	const tileD = draw(generate());
	tile.appendChild(tileD);
	const tileE = draw(generate());
	tile.appendChild(tileE);
	const tileF = draw(generate());
	tile.appendChild(tileF);
	const tileG = draw(generate());
	tile.appendChild(tileG);
}
