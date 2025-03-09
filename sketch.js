var canvas;
var backgroundImage, track, car1_img, car2_img;
var fireAuth, db;
var game, welcome, teacher, student, singlePlayer;
var secret_word;
var player, allPlayers;
var gameState = null;
var playerCount;
var isSinglePlayer = false;

function preload() {
  backgroundImage = loadImage("./assets/bg.jpg");
  track = loadImage("./assets/track.jpg");
  car1_img = loadImage("./assets/car1.png");
  car2_img = loadImage("./assets/car2.png");
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  fireAuth = firebase.auth();
  db = firebase.database();
  game = new Game();
  welcome = new Welcome();
  teacher = new Teacher();
  student = new Student();
  player = new Player();
  singlePlayer = new SinglePlayer();

  // Add single player button
  let singlePlayerBtn = createButton('Single Player Mode');
  singlePlayerBtn.position(width/2 - 90, height/2 + 200);
  singlePlayerBtn.mousePressed(() => {
    isSinglePlayer = true;
    singlePlayerBtn.hide();
    singlePlayer.start();
  });

  car1 = createSprite(width / 2, 200);
  car1.addImage("car1", car1_img);
  car2 = createSprite(width - 300, 200);
  car2.addImage("car2", car2_img);

  cars = [car1, car2];
}

function draw() {
  background(backgroundImage);
  
  if (isSinglePlayer) {
    singlePlayer.play();
  } else {
    if (gameState === null || gameState === 0) {
      game.start();
    }
    if (playerCount === 2) {
      game.update(1);
    }

    if (gameState === 1) {
      clear();
      student.greeting.hide();
      student.greeting2.hide();
      student.playButton.hide();

      teacher.greeting.hide();
      teacher.greeting2.hide();
      teacher.playButton.hide();
      teacher.secretWord.hide();

      game.play();
    }
    if (gameState === 2) {
      game.end();
    }
  }
}

function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
}
