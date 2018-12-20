function Game() {}
Game.prototype.init = function() {
  this.mainGame = new mainGame();
};

Game.prototype.start = function() {
  PoolGame.init();
  PoolGame.mainLoop();
};

Game.prototype.mainLoop = function() {
  Canvas.clear();
  PoolGame.mainGame.update();
  PoolGame.mainGame.draw();
  Mouse.reset();

  requestAnimationFrame(PoolGame.mainLoop);
};

let PoolGame = new Game();
