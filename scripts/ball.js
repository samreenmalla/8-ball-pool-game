function Ball(position, color) {
  this.position = position;
  this.velocity = new Vector();
  this.moving = false;
  this.image = getBallsByColor(color);
  this.color = color;
  this.onTable = true;
  this.inPocket = false;
  this.scored = false;
}

Ball.prototype.update = function(delta) {
  if (!this.onTable) {
    return;
  }

  this.position.addTo(this.velocity.mult(delta));
  //applying friction
  this.velocity = this.velocity.mult(0.984);

  if (this.velocity.distance() < 5) {
    this.velocity = new Vector();
    this.moving = false;
  }
};

Ball.prototype.shoot = function(power, rotation) {
  this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation));
  this.moving = true;
};

//collison with balls
Ball.prototype.collisionWithBalls = function(ball) {
  if (!this.onTable || !ball.onTable) {
    return;
  }
  // console.log(ball.position);
  //normal vector
  var n = this.position.subtract(ball.position);

  // var sound = new Audio();
  // sound.src = "../assets/sounds/BallsCollide.wav";
  // sound.play();

  //find distance
  var dist = n.distance();

  if (dist > CONSTANTS.ball_diameter) {
    return;
  }

  //minimum translation distance //to make balls not attach together after the collision
  var MTD = n.mult((CONSTANTS.ball_diameter - dist) / dist);

  //pushing and pulling the balls apart
  this.position = this.position.add(MTD.mult(1 / 2));
  ball.position = ball.position.subtract(MTD.mult(1 / 2));

  //unit normal vector
  var un = n.mult(1 / n.distance());

  //unit tangent vector
  var ut = new Vector(-un.y, un.x);

  //velocities on unit normal and unit tanget vectors
  var v1n = un.product(this.velocity);
  var v1t = ut.product(this.velocity);
  var v2n = un.product(ball.velocity);
  var v2t = ut.product(ball.velocity);

  //for new normal velocities
  var v1nPRIME = v2n;
  var v2nPRIME = v1n;

  //converting scalar normal and tangential velocities into vector
  v1nPRIME = un.mult(v1nPRIME);
  var v1tPRIME = ut.mult(v1t);
  v2nPRIME = un.mult(v2nPRIME);
  var v2tPRIME = ut.mult(v2t);

  //velocities after collision
  this.velocity = v1nPRIME.add(v1tPRIME);
  ball.velocity = v2nPRIME.add(v2tPRIME);

  this.moving = true;
  ball.moving = true;
};

//collsion with table border
Ball.prototype.collisionWithBorder = function(table) {
  var collided = false;

  if (!this.moving || !this.onTable) {
    return;
  }
  //collision

  if (this.position.y <= table.TopY + CONSTANTS.ball_radius) {
    this.position.y = table.TopY + CONSTANTS.ball_radius;
    this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    collided = true;
  }
  if (this.position.x >= table.RightX - CONSTANTS.ball_radius) {
    this.position.x = table.RightX - CONSTANTS.ball_radius;
    this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    collided = true;
  }
  if (this.position.y >= table.BottomY - CONSTANTS.ball_radius) {
    this.position.y = table.BottomY - CONSTANTS.ball_radius;
    this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    collided = true;
  }
  if (this.position.x <= table.LeftX + CONSTANTS.ball_radius) {
    this.position.x = table.LeftX + CONSTANTS.ball_radius;
    this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    collided = true;
  }

  if (this.collided) {
    this.velocity = this.velocity.mult(0.984);
  }
};

Ball.prototype.handleBallInPocket = function() {
  this.inPocket = CONSTANTS.pockets.some(pocket => {
    return this.position.distanceFrom(pocket) < CONSTANTS.pocket_radius;
  });

  if (!this.inPocket) {
    return;
  }

  this.onTable = false;
  this.moving = false;
  this.velocity = new Vector(0, 0);
};

Ball.prototype.draw = function() {
  if (!this.onTable) {
    return;
  }
  Canvas.drawImage(this.image, this.position, CONSTANTS.ballpos, 40, 40);
};
