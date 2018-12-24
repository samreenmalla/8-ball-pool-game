function Canvas2D() {
  var that = this;
  this.canvas = document.getElementById("canvas");
  canvas.setAttribute("width", "1500");
  canvas.setAttribute("height", "825");
  this.ctx = this.canvas.getContext("2d");
}
Canvas2D.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas2D.prototype.drawImage = function(image, position, origin, width, height, rotation = 0) {
  this.ctx.save();
  this.ctx.translate(position.x, position.y);
  this.ctx.rotate(rotation);
  this.ctx.drawImage(image, -origin.x, -origin.y, width, height);
  this.ctx.restore();
};

let Canvas = new Canvas2D();
