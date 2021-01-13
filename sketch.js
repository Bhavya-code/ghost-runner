var gameState="play";

var spookey;
var ghost_s,climb,doorImg,towerImg;
var climbs,door,ghost,invBlock;
var doorGroup,climbGroup,invGroup;

function preload(){
  ghost_s=loadImage("ghost-standing.png");
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climb=loadImage("climber.png");
  
  spookey=loadSound("spooky.wav");
  
  doorGroup = new Group();
  climbGroup = new Group();
  invGroup = new Group();
}

function setup(){
  createCanvas(600,600);

  spookey.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghost_s);
  ghost.scale=0.3;
}

function draw(){
  background(310);
  
  if(gameState==="play"){
  
  if(tower.y>400){
    tower.y=300
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climbGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  doors();
  
  drawSprites();
  }
  if(gameState==="end"){
    stroke("blue");
    fill("black");
    textSize(24);
    text("GAME OVER",230,300);
  }
}

function doors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorImg);
    
    climbs=createSprite(200,10);
    climbs.addImage(climb);
    
    invBlock=createSprite(200,15);
    invBlock.width=climb.width;
    invBlock.height=2;
    
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    
    climbs.x=door.x;
    climbs.velocityY=1;
    
    invBlock.x=door.x;
    invBlock.velocityY=1;
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    climbs.lifetime=800;
    door.lifetime=800;
    
    doorGroup.add(door);
    climbGroup.add(climbs);
    invGroup.add(invBlock)
  }
}