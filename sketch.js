var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Jet;
var bground, invisibleGround, bgroundImage;

var eaglesGroup, eagleImage;
var obstaclesGroup, obstacleImg;

var score=0;

var gameOver, restart;


function preload(){
  Jet_running =   loadImage("Images/jet.png");
  //Jet_collided = loadAnimation("Jet_collided.png");
  
  bgroundImage = loadImage("Images/Sky.png");
  
  eagleImage = loadAnimation("Images/Eagle0.png","Images/Eagle1.png","Images/Eagle2.png","Images/Eagle4.png","Images/Eagle5.png","Images/Eagle6.png","Images/Eagle8.png","Images/Eagle9.png","Images/Eagle10.png")
  
  obstacleImg = loadAnimation("Images/Enemy jet1.png","Images/Enemy jet3.png","Images/Enemy jet5.png");
  
  /*gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");*/
  
}

function setup() {
  createCanvas(1750, 700);

  bground = createSprite(750,height/2,width,height);
  bground.addImage(bgroundImage);
  
  Jet = createSprite(150,180,20,50);
  Jet.addImage(Jet_running);
  //Jet.addAnimation("collided", Jet_collided);
  Jet.scale = 0.5;
  

  bground.x = bground.width /2;
  bground.velocityX = -(6 + 3*score/100);
  
  /*gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;*/
  
  invisibleGround = createSprite(width/2,height - 20,width,20);
  invisibleGround.visible = false;
  
  eaglesGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space") && Jet.y >= 159) {
     
      Jet.velocityY = -14;
    }
  
    Jet.velocityY = Jet.velocityY + 0.8
  
    if (bground.x < 0){
      bground.x = bground.width/2;
    }
  
    Jet.collide(invisibleGround);
    spawneagles();
    spawnObstacles();
    
    /*if (score>0 && score%100 === 0){
      checkPointSound.play();
    }*/
  
    if(obstaclesGroup.isTouching(Jet)){
      
      gameState = END;
        
    }
  }
  else if (gameState === END) {
   /* gameOver.visible = true;
    restart.visible = true;*/
    
    //set velcity of each game object to 0
    bground.velocityX = 0;
    Jet.velocityY =0;
    obstaclesGroup.setVelocityXEach(0);
    eaglesGroup.setVelocityXEach(0);
    
    //change the Jet animation
   // Jet.changeAnimation("collided",Jet_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    eaglesGroup.setLifetimeEach(-1);
    
    /*if(mousePressedOver(restart)) {
      reset();
    }*/
  }
  
  
  drawSprites();
}

function spawneagles() {
  //write code here to spawn the eagles
  if (frameCount % 200 === 0) {
    var eagle = createSprite(width,random(400,height-50),40,10);
    eagle.addAnimation("eagle",eagleImage);
    eagle.scale = 0.4;
    eagle.velocityX = -(3 + 3*score/100);
    
     //assign lifetime to the variable
    eagle.lifetime = width/6;
    
    //adjust the depth
    eagle.depth = Jet.depth;
    Jet.depth = Jet.depth + 1;
    
    //add each eagle to the group
    eaglesGroup.add(eagle);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(width,random(150,height-150),10,40);
    obstacle.addAnimation("enemy jet",obstacleImg);
    obstacle.velocityX = -(6 + 3*score/100);
  
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = width/6;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  eaglesGroup.destroyEach();
  
  //Jet.changeAnimation("running",Jet_running);
  
  score = 0;
  
}
