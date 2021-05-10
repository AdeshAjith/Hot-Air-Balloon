var balloon,backgroundImg,balloonAnimation;
var mydatabase,balloonPositionRef,myposition;

function preload() {
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonAnimation = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(500,500);

  mydatabase = firebase.database();
  balloonPositionRef = mydatabase.ref('Balloon/Position');
  balloonPositionRef.on("value",readpos,error);

  balloon = createSprite(150, 400, 150, 150);
  balloon.addAnimation("Flying",balloonAnimation);
  balloon.scale = 0.3;
}

function draw() {
  background(backgroundImg);
  fill("black");
  textSize(15);
  text("Use the Arrow Keys to move the Hot Air Balloon!",25,50);

   if(myposition !== undefined){
    if(keyDown(LEFT_ARROW)){
      updateHeight(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      updateHeight(10,0);
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
      updateHeight(0,10);
    }
  }
  drawSprites()
}

function updateHeight(a,b){
  mydatabase.ref('Balloon/Position').set({
    'x' : myposition.x + a,
    'y' : myposition.y + b
  })
}

function readpos(mydata){
  myposition = mydata.val()
  balloon.x = myposition.x
  balloon.y = myposition.y
}

function error(){
  console.log("Error in Writing to the Database");
}
