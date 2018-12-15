let images = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback){

  if(assetsStillLoading){
    requestAnimationFrame(assetsLoadingLoop.bind(this,callback));
  }else{
    callback();
  }
}

function loadAssets(callback){

  function loadImage(fileName){
    assetsStillLoading++;

    let newImage = new Image();
    newImage.src = "assets/images/" + fileName;

    newImage.onload = function (){
      assetsStillLoading--;
    }
    return newImage;
  }

  images.board = loadImage('table1.png');
  images.stick = loadImage('stick2.png');
  images.whiteBall = loadImage('whiteball.png');
  images.blackBall = loadImage('black-ball8.png');
  images.blueBall = loadImage('blue-ball.png');
  images.redBall = loadImage('red-ball1.png');
  images.greenBall = loadImage('green-ball.png');


  assetsLoadingLoop(callback);

}

function getBallsByColor(color){

  switch(color){
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



