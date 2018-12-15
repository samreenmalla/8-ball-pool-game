let delta = 1/180;
function GameWorld(){

  this.board = new Board();

  this.balls = [
    [new Vector(880,340), Color.Green],
    [new Vector(920,320), Color.Green],
    [new Vector(960,300),Color.Red],
    [new Vector(1000,280), Color.Green],
    [new Vector(1040,260), Color.Red],

    [new Vector(920,360), Color.Red],
    [new Vector(960,380), Color.Green],
    [new Vector(1000,400), Color.Red],
    [new Vector(1040,420),Color.Green],

    [new Vector(960, 338), Color.Black],
    [new Vector(1000,322), Color.Red],
    [new Vector(1000,360),Color.Green],

    [new Vector(1040,300),Color.Red],
    [new Vector(1040,340),Color.Green],
    [new Vector(1040,380),Color.Red],
    [new Vector(368,300), Color.White]


  ].map(params => new Ball(params[0], params[1]))

  this.whiteBall = this.balls[this.balls.length -1];
  this.stick = new Stick(new Vector(368,300),this.whiteBall.shoot.bind(this.whiteBall));
  //determining table borders
  this.table = {
    TopY: 73,
    RightX: 1220,
    BottomY: 590,
    LeftX: 82
  };
}

//collision detection
GameWorld.prototype.handleCollisions = function(){

  for(var i = 0; i< this.balls.length; i++){
    this.balls[i].collision(this.table);
    for(var j = i+1; j < this.balls.length; j++){
      var firstBall = this.balls[i];
      var secondBall = this.balls[j];

      firstBall.collision(secondBall);
    }
  }
}

GameWorld.prototype.update = function(){

  //check for collisions
  this.handleCollisions();

  this.stick.update();

  for(var i = 0; i < this.balls.length; i++){
    this.balls[i].update(delta);
  }

  if(!this.movingBalls() && this.stick.shot){
    this.stick.reposition(this.whiteBall.position);
  }
}

GameWorld.prototype.movingBalls = function(){
  let movingBalls = false;

  for(i = 0; i< this.balls.length; i++){
    if(this.balls[i].moving){
      movingBalls = true;
      break;
    }
  }
  return movingBalls;
}

GameWorld.prototype.draw = function(){
  this.board.draw();
  this.stick.draw();

  for(var i = 0; i < this.balls.length; i++){
    this.balls[i].draw();
  }
}