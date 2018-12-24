let images = {};
let sounds = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback) {
  if (assetsStillLoading) {
    requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
  } else {
    callback();
  }
}

function loadAssets(callback) {
  function loadImage(fileName) {
    assetsStillLoading++;

    let newImage = new Image();
    newImage.src = "assets/images/" + fileName;

    newImage.onload = function() {
      assetsStillLoading--;
    };
    return newImage;
  }

  function loadSound(fileName) {
    let newSound = new Audio();
    newSound.src = "assets/sounds/" + fileName;

    return newSound;
  }

  images.board = loadImage("table1.png");
  images.stick = loadImage("stick2.png");
  images.whiteBall = loadImage("white-ball1.png");
  images.blackBall = loadImage("black-ball8.png");
  images.blueBall = loadImage("blue-ball.png");
  images.redBall = loadImage("red-ball1.png");
  images.greenBall = loadImage("green-ball.png");

  assetsLoadingLoop(callback);

  sounds.collide = loadSound("BallsCollide.wav");
  sounds.inPocket = loadSound("Hole.wav");
  sounds.strike = loadSound("Strike.wav");
}

function getBallsByColor(color) {
  switch (color) {
    case Color.Red:
      return images.redBall;
    case Color.Blue:
      return images.blueBall;
    case Color.Black:
      return images.blackBall;
    case Color.White:
      return images.whiteBall;
    case Color.Green:
      return images.greenBall;
  }
}
