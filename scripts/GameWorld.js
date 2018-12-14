function GameWorld(){

  this.board = new Board();
  this.whiteBall = new Ball(new Vector(368,300));
  this.stick = new Stick(new Vector(368,300),this.whiteBall.shoot.bind(this.whiteBall));

}

GameWorld.prototype.update = function(){
  this.stick.update();
  this.whiteBall.update();
}

GameWorld.prototype.draw = function(){
  this.board.draw();
  this.stick.draw();
  this.whiteBall.draw();
}