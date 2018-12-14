function Board(){
  this.position = new Vector(60,30);
  this.origin = new Vector(0,0);
}
Board.prototype.draw = function(){
  Canvas.drawImage(images.board,this.position,this.origin,1200,600);
}