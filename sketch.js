var balloon,backgroundImg;
var mydatabase,balloonPosition;

function preload() {
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonAnimation = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
  mydatabase = firebase.database();
  balloonPosition = mydatabase.ref('Balloon/Position');
  balloonPosition.on("value",readpos,error);
}

function setup() {
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.scale = 0.3;
  balloon.addAnimation("Flying",balloonAnimation);
}

function draw() {
  background(backgroundImg);
  fill("black");
  textSize(15);
  text("Use the Arrow Keys to move the Hot Air Balloon!",25,50);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.x = balloon.x - 10;
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.x = balloon.x + 10;
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.y = balloon.y - 10;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.y = balloon.y + 10;
  }

  drawSprites();
}

function readpos(data){
  mypos = data.val();
  balloon.x = mypos.x;
  balloon.y = mypos.y;
}

function updateHeight(a,b){
  mydatabase.ref('Balloon/Position').set({
    'x' : mypos.x + a,
    'y' : mypos.y + b
  })
}

function error(){
  console.log("Error in Writing to the Database");
}