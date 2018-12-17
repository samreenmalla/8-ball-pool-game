let ballpos = new Vector(25,25);
let ball_diameter = 38;
let ball_radius = ball_diameter/2;

function Ball(position, color){
  this.position = position;
  this.velocity = new Vector();
  this.moving = false;
  this.image = getBallsByColor(color);
  this.onTable = true;
  this.insideHole = false;
}

Ball.prototype.update = function(delta){
  this.position.addTo(this.velocity.mult(delta));
  //applying friction
  this.velocity = this.velocity.mult(0.984);

  if(this.velocity.distance() < 5){
    this.velocity = new Vector();
    this.moving = false;

  }
}

Ball.prototype.shoot = function(power, rotation){
  this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation));
  this.moving = true;
}

//collison with balls
Ball.prototype.collisionWithBalls = function(ball){
  // console.log(ball.position);
  //normal vector
  var n = this.position.subtract(ball.position);

  //find distance
  var dist = n.distance();

  if(dist > ball_diameter){
    return;
  }

  //minimum translation distance //to make balls not attach together after the collision
  var MTD = n.mult((ball_diameter - dist)/dist);

  //pushing and pulling the balls apart
  this.position = this.position.add(MTD.mult(1/2));
  ball.position = ball.position.subtract(MTD.mult(1/2));


  //unit normal vector
  var un = n.mult(1/n.distance());

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

}

//collsion with table border
Ball.prototype.collisionWithBorder = function(table){

  if(!this.moving){
    return;
  }

  var collided = false;
  //collision

  if(this.position.y <= table.TopY + ball_radius){
    this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    collided = true;
  }
  if(this.position.x >= table.RightX - ball_radius){
    this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    collided = true;
  }
  if(this.position.y >= table.BottomY - ball_radius){
    this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    collided = true;
  }
  if(this.position.x <= table.LeftX + ball_radius){
    this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    collided = true;
  }

  if(this.collided){
    this.velocity = this.velocity.mult(0.984);
  }
}
//inside hole
Ball.prototype.insideHole = function(){
  insideHole = true;
}

Ball.prototype.collision = function(object){
  if(object instanceof Ball){
    this.collisionWithBalls(object);
  }else{
    this.collisionWithBorder(object);
  }
}

Ball.prototype.draw = function(){
  Canvas.drawImage(this.image, this.position, ballpos,40,40);
}
