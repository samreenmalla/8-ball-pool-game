let ballpos = new Vector(25,25);

function Ball(position){
  this.position = position;
  this.velocity = new Vector();
}
Ball.prototype.update = function(){
  this.position.addTo(this.velocity);
}

Ball.prototype.shoot = function(power, rotation){
  this.velocity = new Vector(Math.cos(rotation), Math.sin(rotation));
}

Ball.prototype.draw = function(){
  Canvas.drawImage(images.whiteBall, this.position, ballpos,40,40);
}