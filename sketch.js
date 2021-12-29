var back, backImg
var spaceship, shipImg
var b1, b2
var mImg, cImg, sImg, vImg
var score, life
var gameState="play"
var k, kImg
var g, gImg

function preload(){
  backImg=loadImage("outer-space.png")
  shipImg=loadImage("ship.png")
  mImg=loadImage("rock.png")
  cImg=loadImage("coin.png")
  kImg=loadImage("ship2.png")
  gImg=loadImage("game.png")
  vImg=loadImage("vik.png")

}


function setup() {
  createCanvas(1200,800);

  back=createSprite(600,400,10,10)
  back.addImage(backImg)
  back.velocityY=2
  back.scale=1.5

  b1=createSprite(100,400,10,1000)
  b1.visible=false

  b2=createSprite(1100,400,10,1000)
  b2.visible=false

  spaceship=createSprite(580,600,20,20)
  spaceship.addImage(shipImg)
  spaceship.scale=0.2

 

  laserGroup= new Group()
  metGroup= new Group()
  coinGroup= new Group()
  monsterGroup= new Group()
  laser2Group= new Group()

  score=0
  life=5
}

function draw() {
  background(backImg);

if(gameState=="play"){
  drawSprites();
  textSize(30)
  fill("white")
  text("Score: "+ score, 200,100)
  text("Life: "+ life, 205,150)

  if(back.y>700){
    back.y=back.height/10
  }
  if(keyDown("right")){
    spaceship.x=spaceship.x+14
  }

  if(keyDown("left")){
    spaceship.x=spaceship.x-14
  }
  spaceship.collide(b1)
  spaceship.collide(b2)

  if(keyDown("space")){
    laser ()
  }
  if(keyDown(DOWN_ARROW)){
    laser2 ()
  }
  if(laserGroup.isTouching(metGroup)){
    laserGroup.destroyEach()
    metGroup.destroyEach()
    score=score+2
  }

  if(spaceship.isTouching(coinGroup)){
    coinGroup.destroyEach()
    score=score+1
  }

  if(metGroup.isTouching(spaceship)){
    life=life-1
    metGroup.destroyEach()
  }
  var select=Math.round(random(1,3))
 if(World.frameCount%80==0){
   if(select==1){
     met()
   }
   else if(select==2){
     monster()
   }
   else {
     coin()
   }
 }

 if(score==5 || laserGroup.isTouching("monsterGroup")){
    gameState="victory"
 }
  if(life==0){
    gameState="gameOver"
  }
}

  if(gameState=="gameOver"){

    metGroup.destroyEach()
    spaceship.destroy()
    coinGroup.destroyEach()
    coinGroup.setVelocityYEach(0)
    metGroup.setVelocityYEach(0)
    back.velocityY=0
    background(gImg)
    monsterGroup.destroyEach()
  }

  if(gameState=="victory"){
    metGroup.destroyEach()
    spaceship.destroy()
    coinGroup.destroyEach()
    coinGroup.setVelocityYEach(0)
    metGroup.setVelocityYEach(0)
    back.velocityY=0
    background(vImg)
    monsterGroup.destroyEach()
  }

}
// how to make the border?

function laser(){
  var laser=createSprite(540,540,5,30)
  laser.shapeColor="yellow"
  laser.x=spaceship.x+2
  laser.velocityY=-20
  laser.lifetime=300
  laserGroup.add(laser)
  }

  function met(){
    var m=createSprite(Math.round(random(100,1000)),0,10,10)
    m.addImage(mImg)
    m.scale=0.2
    m.velocityY=+18
    m.lifetime=300
    metGroup.add(m)
  }
  function coin(){
    var c=createSprite(Math.round(random(100,1000)),0,10,10)
    c.addImage(cImg)
    c.scale=0.2
    c.velocityY=+15
    c.lifetime=300
    coinGroup.add(c)
  }
  function monster(){
    var k=createSprite(0,Math.round(random(100,500)),10,10)
    k.addImage(kImg)
    k.scale=0.2
    k.velocityX=+9  
    k.lifetime=300
    monsterGroup.add(k)
  }
  function laser2(){
    var laser1=createSprite(540,540,5,30)
    laser1.shapeColor="yellow"
    //laser1.y=k.y+2
    laser1.velocityY=+20
    laser1.lifetime=300
    laser2Group.add(laser1)
    }
// building levels
// after win score