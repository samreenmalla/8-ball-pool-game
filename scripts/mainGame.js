function mainGame() {
  var that = this;

  this.board = new Board();
  this.player1 = new Player();
  this.player2 = new Player();
  this.flag = 0;
  this.turn = 0;
  this.score = 0;
  this.balls = CONSTANTS.ball_params.map(params => new Ball(...params));
  this.whiteBall = this.balls.find(ball => ball.color === Color.White);
  this.stick = new Stick(new Vector(368, 300), this.whiteBall.shoot.bind(this.whiteBall));
  this.player1Score = 0;
  this.player2Score = 0;

  //determining table borders
  this.table = {
    TopY: 73,
    RightX: 1220,
    BottomY: 590,
    LeftX: 106
  };
}

mainGame.prototype.togglePlayer = function() {
  if (this.turn == 0) {
    this.turn = 1;
  } else {
    this.turn = 0;
  }
};

mainGame.prototype.handleCollisions = function() {
  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].handleBallInPocket();
    this.balls[i].collisionWithBorder(this.table);

    for (var j = i + 1; j < this.balls.length; j++) {
      var firstBall = this.balls[i];
      var secondBall = this.balls[j];

      firstBall.collisionWithBalls(secondBall);
    }
  }
};

mainGame.prototype.update = function() {
  this.handleCollisions();

  var nextTurn = true;
  this.stick.update();

  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].update(CONSTANTS.delta);
  }
  if (this.movingBalls() && this.stick.shot) {
    this.stick.position = new Vector(0, 0);
  }
  if (!this.movingBalls() && this.stick.shot && this.whiteBall.onTable) {
    this.stick.reposition(this.whiteBall.position);

    for (var i = 0; i < this.balls.length; i++) {
      if (this.balls[i].inPocket && !this.balls[i].scored) {
        if (this.turn == 0) this.player1Score += 100;
        else this.player2Score += 100;
        nextTurn = false;
        this.balls[i].scored = true;
      }
    }
    if (nextTurn) this.togglePlayer();
  }
  if (!this.whiteBall.onTable) {
    this.stick.position = new Vector(0, 0);
    Mouse.reset();
    this.whiteBall.position = Mouse.position;
    this.whiteBall.onTable = true;
  }
};
mainGame.prototype.movingBalls = function() {
  let movingBalls = false;

  for (i = 0; i < this.balls.length; i++) {
    if (this.balls[i].moving) {
      movingBalls = true;
      break;
    }
  }
  return movingBalls;
};

mainGame.prototype.draw = function() {
  this.board.draw();
  this.stick.draw();
  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].draw();
  }
  Canvas.ctx.font = "20px Georgia";
  Canvas.ctx.fillStyle = "black";
  Canvas.ctx.fillText("Player 1 Score: " + this.player1Score, 200, 100);
  Canvas.ctx.fillText("Player 2 Score: " + this.player2Score, 950, 100);

  if (this.turn == 0) {
    Canvas.ctx.font = "60px Georgia";
    Canvas.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    Canvas.ctx.fillText("Player1", 600, 200);
  } else if (this.turn == 1) {
    Canvas.ctx.font = "60px Georgia";
    Canvas.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    Canvas.ctx.fillText("Player2", 600, 200);
  }
};
