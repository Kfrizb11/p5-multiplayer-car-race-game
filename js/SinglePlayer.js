class SinglePlayer {
  constructor() {
    this.player = {
      x: width / 2 - 680,
      y: height - 100,
      distance: 0,
      name: "Player 1",
      sprite: null
    };
    this.gameState = "PLAY";
    this.finishLine = -height * 4;
  }

  start() {
    // Create car sprite for single player
    this.player.sprite = createSprite(this.player.x, this.player.y);
    this.player.sprite.addImage("car", car1_img);
    this.player.sprite.scale = 0.07;
  }

  play() {
    background("#464646");
    image(track, 0, -height * 4, width, height * 5);

    // Update camera position to follow the player
    camera.position.x = width/2;
    camera.position.y = this.player.sprite.y;

    // Car controls
    if (keyIsDown(UP_ARROW) && this.gameState === "PLAY") {
      this.player.sprite.y -= 10;
      this.player.distance += 10;
    }
    if (keyIsDown(LEFT_ARROW) && this.player.sprite.x > width/4) {
      this.player.sprite.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.player.sprite.x < width/2 + 300) {
      this.player.sprite.x += 5;
    }

    // Check if player reached finish line
    if (this.player.sprite.y < this.finishLine + 100) {
      this.gameState = "END";
      swal({
        title: "Game Complete!",
        text: `Congratulations! You finished the race!\nDistance covered: ${this.player.distance}m`,
        imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Play Again"
      }, function(isConfirm) {
        if (isConfirm) {
          window.location.reload();
        }
      });
    }

    drawSprites();
  }
} 