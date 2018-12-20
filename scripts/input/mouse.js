function handleMouseMovement(event) {
  let x = event.pageX;
  let y = event.pageY;

  Mouse.position = new Vector(x, y);
}

// function handleClick(event){

//   handleMouseMovement(event);

//   Mouse.onclick =  true;
// }

function handleMouseDown(event) {
  handleMouseMovement(event);

  if (event.which === 1) {
    if (!Mouse.left.down) Mouse.left.pressed = true;
    Mouse.left.down = true;
  } else if (event.which === 2) {
    if (!Mouse.right.down) Mouse.right.pressed = true;
    Mouse.right.down = true;
  }
}

function handleMouseUp(event) {
  handleMouseMovement(event);

  if (event.which === 1) {
    Mouse.left.down = false;
    // console.log(Mouse.left.down);
  } else if (event.which === 2) {
    Mouse.right.down = false;
  }
}

function MouseHandler() {
  this.left = new ButtonState();
  this.right = new ButtonState();

  this.position = new Vector();

  document.onmousemove = handleMouseMovement;
  document.onmousedown = handleMouseDown;
  document.onmouseup = handleMouseUp;
  // document.onclick = handleClick;
}

//reseting any kind of mouse event
MouseHandler.prototype.reset = function() {
  this.left.pressed = false;
  // this.left.down = false;
};

let Mouse = new MouseHandler();
