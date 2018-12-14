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