let ballpos = new Vector(25,25);

function Ball(position, color){
  this.position = position;
  this.velocity = new Vector();
  this.moving = false;
  this.image = getBallsByColor(color);
}
Ball.prototype.update = function(delta){
  this.position.addTo(this.velocity.mult(delta));

  this.velocity = this.velocity.mult(0.98);

  if(this.velocity.distance() < 5){
    this.velocity = new Vector();
    this.moving = false;

  }
}

Ball.prototype.shoot = function(power, rotation){
  this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation));
  this.moving = true;
}

Ball.prototype.draw = function(){
  Canvas.drawImage(this.image, this.position, ballpos,40,40);
}