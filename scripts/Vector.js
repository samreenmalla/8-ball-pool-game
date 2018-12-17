function Vector(x = 0,y = 0){

  this.x = x;
  this.y = y;
}

Vector.prototype.copy = function(){
  return new Vector(this.x, this.y);
}
Vector.prototype.addTo = function(vector){
  this.x += vector.x;
  this.y += vector.y;
}

Vector.prototype.mult = function(scalar){
  return new Vector(this.x * scalar, this.y * scalar);
}

Vector.prototype.distance =  function(){
  var dv = Math.pow(this.x , 2) + Math.pow(this.y, 2);
  return (Math.sqrt(dv));
}

//for collision
Vector.prototype.add = function(v){
  return new Vector(this.x + v.x, this.y + v.y);
}

Vector.prototype.subtract = function(v){
  return new Vector(this.x - v.x, this.y - v.y);
}

Vector.prototype.product = function(v){
  return(this.x * v.x + this.y * v.y);
}