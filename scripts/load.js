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

  assetsLoadingLoop(callback);

}



