var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage
var cloudImg,ob1,ob2,ob3,ob4,ob5,ob6,gameOverImg,RestartImg 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0
var gameover
var restart
var ObstaclesGroup
var CloudsGroup
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudImg=loadImage("cloud.png")
  ob1 =loadImage ("obstacle1.png")
  ob2 = loadImage ("obstacle2.png")
  ob3 =loadImage ("obstacle3.png")
  ob4 = loadImage ("obstacle4.png")
  ob5 =loadImage ("obstacle5.png")
  ob6 = loadImage ("obstacle6.png")
  gameOverImg = loadImage("gameOver.png")
  RestartImg = loadImage ("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,90)
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.scale = 0.5
  restart = createSprite(300,120)
  restart. addImage("restart",RestartImg)
  restart. scale = 0.5
  
  ObstaclesGroup=createGroup()
  CloudsGroup=createGroup()
  
  
}

function draw() {
   background("white");
  //display score
  text("Score: "+ count, 500, 50);
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count + Math.round(World.frameRate/60);
    
    if (count>0 && count%100 === 0){
     
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 100){
      trex.velocityY = -12 ;
     
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
     gameOver.visible = false;
    restart.visible = false;
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
     
      gameState = END;
      
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addImage(trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
     
  
  
}


function reset(){
  count = 0
  gameOver.visible= false
  restart.visible = false
  gameState = PLAY
  ObstaclesGroup.destroyEach()
  CloudsGroup.destroyEach()
  trex.changeAnimation("running",trex_running)
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
     obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = - 6 ;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1 : obstacle.addImage(ob1)
       break 
        case 2 : obstacle.addImage(ob2)
       break 
        case 3 : obstacle.addImage(ob3)
       break 
        case 4: obstacle.addImage(ob4)
       break 
        case 5 : obstacle.addImage(ob5)
       break 
        case 6 : obstacle.addImage(ob6)
       break 
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
     cloud = createSprite(600,200,40,10);
    cloud.y = Math.round(random(10,90));
    cloud.addImage("cloud",cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
