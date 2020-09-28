
function preload(){
  
  backgroundimg = loadImage("backgroundforgame.png");

  playerimg = loadAnimation("Picture1.png","Picture2.png","Picture3.png","Picture4.png","Picture5.png","Picture6.png");
 
  stoneimg = loadImage("stone.png");

  logimg = loadImage('log.png')

  playerdied = loadImage('player crying.png')

  playerjump = loadAnimation("jump1.png","jump2.png","jump3.png")

   gameoverimg = loadImage("GAMEOVER.jpg")
}

function setup(){
  createCanvas(500,400);
  
  
  backgd = createSprite(390,200,20,50);
  backgd.addImage(backgroundimg);
  backgd.velocityX = 6;

  player = createSprite(400,375,20,20);
  player.addAnimation("player", playerimg);
  player.scale = 0.8;

  invisibleground = createSprite(250,388,609,5);
  invisibleground.visible = false;

  gameover1 = createSprite(240,200,20,20);
  gameover1.addImage(gameoverimg);
  gameover1.visible = false;

  gameover = new Group()

  
}

function draw(){

  background(backgroundimg);

  spawnStone();
  spawnLogs();

  player.collide(invisibleground)

  player.velocityY = player.velocityY + 1;

  if(backgd.x > 392) {
    backgd.x = 100
  }

  if(keyDown("space")) {
    player.velocityY = -10;
    player.addAnimation("playerjump", playerjump)
    player.addImage(playerdied)
  } else {
    //player.addAnimation("playerimg", playerimg)
  } 

  if(player.isTouching(gameover)) {
    player.addImage(playerdied);
    backgd.velocityX = 0;
    player.destroy();
    gameover.destroyEach()
    gameover1.visible = true;
    gameover1.scale = 0.7;
    createCanvas(200,200)


  
  }

  drawSprites();

}

function spawnStone() {
  
  if (frameCount % 100 === 0) {
    var stone = createSprite(-5,350,40,10);
    
    stone.addImage(stoneimg);
    stone.scale = 0.2;
    stone.velocityX = 3;
    
     //assign lifetime to the variable
    stone.lifetime = 200;
    
    gameover.add(stone);
  }
  
}

function spawnLogs() {
  
  if (frameCount % 250 === 0) {
    var log1 = createSprite(-5,360,40,10);
    
    log1.addImage(logimg);
    log1.scale = 0.3;
    log1.velocityX = 3;
    
     //assign lifetime to the variable
    log1.lifetime = 200;
    player.collide(log1)
  
    player.depth = log1.depth;
    log1.depth = log1.depth-1

  }
  
}