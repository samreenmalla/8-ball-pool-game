let stickpos = new Vector(968,8);
let stick_shot_pos = new Vector(950,11);

function Stick(position,onShoot){
  this.position = position;
  this.rotation = 0;
  this.origin = stickpos.copy();
  this.power = 0;
  this.onShoot = onShoot;
  this.shot = false;
}

Stick.prototype.update = function(){

  if(Mouse.left.down){
    console.log("left down");
    this.increasePower();

  }else if(this.power > 0) {
    this.shoot();
  }

  this.updateRotation();
}

Stick.prototype.updateRotation = function(){

  //to make the stick move with the mouse pointer
  let oppositeSide = Mouse.position.y  - this.position.y;
  let adjacentSide = Mouse.position.x - this.position.x;

  this.rotation = Math.atan2(oppositeSide,adjacentSide);
}

Stick.prototype.increasePower = function(){
  this.power += 100;
  this.origin.x += 10;
}

//shooting the balls
Stick.prototype.shoot = function(){
  // this.power = power;
  // this.rotation = rotation;
  this.onShoot(this.power,this.rotation);
  this.power = 0;
  this.origin = stick_shot_pos.copy();
  this.shot = true;
}

Stick.prototype.reposition = function(position){
  this.position = position.copy();
  this.origin = stickpos.copy();
  this.shot = false;
}

Stick.prototype.draw = function(){
  Canvas.drawImage(images.stick,this.position,this.origin,938,22,this.rotation);
}