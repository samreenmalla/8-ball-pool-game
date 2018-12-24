function Score(position) {
  this.position = position;
  this.origin = new Vector(50, 50);
  this.value = 0;
}
Score.prototype.draw = function(color) {
  Canvas.drawText(this.value, this.position, this.origin, "#096834", "top", "Impact", "200px");
};

Score.prototype.drawLines = function(color) {
  for (var i = 0; i < this.value; i++) {
    var pos = this.position.add(new Vector(i * 15, 0));
    Canvas.drawText("I", pos, this.origin, color, "top", "Impact", "20px");
  }
};
Score.prototype.increaseScore = function() {
  this.value++;
};
