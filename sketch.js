var scl = 30, acceleration = 10;
var score = 0, highscore = 0, deaths = 0, run = true;
var snow = [], platforms = [];
var snowMax = 30, snowSpot = 0, platformsMax = 100, platformsSpot = 0;
function preload() {
	fontRetro = loadFont('assets/PressStart2P-Regular.ttf');
}

function setup() {
	createCanvas(600, 400);
	player = new Player();
	platforms[0] = new Platform(-400, 500, 600, 100);
	for(var i = 1; i < platformsMax; i++) {
		platforms[i] = new Platform(platforms[i-1].x + platforms[i-1].len + platforms[i-1].spacing, random(height - 200, height - 60), random(100,800), random(100,200));
	}
	for(var i = 0; i < snowMax; i++) {
		snow[i] = new Snow();
	}
	textFont(fontRetro, 20);
	textAlign(RIGHT);
}

function draw() {
	if(player.y > height) {
		reset();
	}

	//GUI
	background(200);
	fill(0);
	if(run) {
		textAlign(CENTER);
		text('AUTO JUMP ACTIVE!!!', width/2, 390);
	}
	textAlign(RIGHT);
	text('HIGH SCORE: '+ ('000'+ highscore).slice(-3), width - 5, 25);
	text('SCORE: ' + ('000'+ score).slice(-3), width - 5, 50);
	text('FALLS: ' + ('000'+ deaths).slice(-3), width - 5, 75);

	//Platforms
	for (i = 0; i < platforms.length; i++) {
		platforms[i].update(platforms);
	}
	for (i = 0; i < platforms.length; i++) {
		platforms[i].show();
	}

//Player
	player.update(platforms);
	if(run) {
	  player.autoRun(platforms);
	}
	player.show();
	acceleration += 0.0001

	//snow
	if(player.onPlat) {
		snow[snowSpot] = new Snow();
		if(snowSpot === snowMax) {
			snowSpot = 0;
		} else {
			snowSpot++;
		}
		for (i = 0; i < snow.length; i++) {
			snow[i].update();
		}
		for (i = 0; i < snow.length; i++) {
			snow[i].show();
		}
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW && player.onPlat === true ||keyCode === 32 && player.onPlat === true) {
		player.yaccel = -20;
	}
	if(keyCode === ENTER) {
		run = !run;
	}
}

function reset() {
  console.log("Game Over");
	if(score> highscore) { highscore = score;}
	score = 0;
	deaths++;
  player.y = 0;
	player.round = 0;
	platforms[0] = new Platform(-400, 500, 600, 100);
	for(var i = 1; i < platformsMax; i++) {
		platforms[i] = new Platform(platforms[i-1].x + platforms[i-1].len + platforms[i-1].spacing, random(height - 200, height - 60), random(100,800), random(100,200));
	}
}
