function Stick(position, onShoot) {
  this.position = position;
  this.rotation = 0;
  this.origin = CONSTANTS.stickpos.copy();
  this.power = 0;
  this.onShoot = onShoot;
  this.shot = false;
  this.onTable = true;
}

Stick.prototype.update = function() {
  //to stop the stick from moving the ball after shooting
  if (this.shot) {
    return;
  }

  if (Mouse.left.down) {
    this.increasePower();
  } else if (this.power > 0) {
    console.log(this.power);

    this.shoot();
  }

  this.updateRotation();
};

Stick.prototype.updateRotation = function() {
  //to make the stick move with the mouse pointer
  let oppositeSide = Mouse.position.y - this.position.y;
  let adjacentSide = Mouse.position.x - this.position.x;

  this.rotation = Math.atan2(oppositeSide, adjacentSide);
};

Stick.prototype.increasePower = function() {
  if (this.power > CONSTANTS.Max_Power) {
    return;
  }
  this.power += 140;
  this.origin.x += 10;
};

//shooting the balls
Stick.prototype.shoot = function() {
  this.onShoot(this.power, this.rotation);
  this.power = 0;
  this.origin = CONSTANTS.stick_shot_pos.copy();
  this.shot = true;
  // Mouse.reset();
  console.log(this.power);
  console.log(this.shot);
};

Stick.prototype.reposition = function(position) {
  this.position = position.copy();
  this.origin = CONSTANTS.stickpos.copy();
  this.shot = false;
};

Stick.prototype.draw = function() {
  Canvas.drawImage(images.stick, this.position, this.origin, 938, 22, this.rotation);
};
