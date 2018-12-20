function mainGame() {
  var that = this;

  this.board = new Board();

  this.balls = CONSTANTS.ball_params.map(params => new Ball(...params));

  this.whiteBall = this.balls.find(ball => ball.color === Color.White);
  this.stick = new Stick(new Vector(368, 300), this.whiteBall.shoot.bind(this.whiteBall));

  //determining table borders
  this.table = {
    TopY: 73,
    RightX: 1220,
    BottomY: 590,
    LeftX: 106
  };
}

//collision detection
mainGame.prototype.handleCollisions = function() {
  // console.log(this.whiteBall.position);

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
  //check for collisions
  this.handleCollisions();

  this.stick.update();

  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].update(CONSTANTS.delta);
  }
  if (!this.movingBalls() && this.stick.shot && this.whiteBall.onTable) {
    // this.stick.onTable = false;
    // console.log(this.whiteBall);
    this.stick.reposition(this.whiteBall.position);
  }

  //test
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
};
