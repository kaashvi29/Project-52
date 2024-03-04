var path,fighter,life,monster1,po, satellite;
var pathImg,fighterImg,lifeImg,monster1Img,poImg,satelliteImg;
var PointsObtained = 0;
var satelliteG,lifeG,monster1G,poGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("path.png");
  fighterImg = loadImage("SpaceGuardian.png");
  lifeImg = loadImage("Boost Power Up.png");
  satelliteImg = loadImage("Asteroid.png");
  poImg = loadImage("Bullet.png");
  monster1Img = loadImage("Alien.png");
  
  
}

function setup(){
  
  createCanvas(400,400);
  // Moving path
  path=createSprite(400,400);
  path.addImage(pathImg);

//creating fighter running
fighter = createSprite(100,380,5,5);
fighter.addImage(fighterImg);
fighter.scale=0.12;
  
  
lifeG=new Group();
satelliteG=new Group();
poGroup=new Group();
monster1G=new Group();

}

function draw() {

  if (gameState === PLAY) {
    background(51);
    fighter.x = World.mouseX;

    edges = createEdgeSprites();
    fighter.collide(edges);

    //code to reset the path
    if (path.y > 400) {
      path.y = height / 2;
    }

    createlife();
    createSatellite();
    createpo();
    createmonster1();

    if (lifeG.isTouching(fighter)) {
      lifeG.destroyEach();
      PointsObtained += 50;
    } else if (satelliteG.isTouching(fighter)) {
      satelliteG.destroyEach();
      PointsObtained += 100;
    } else if (poGroup.isTouching(fighter)) {
      poGroup.destroyEach();
      PointsObtained += 150;
    } else {
      if (monster1G.isTouching(fighter)) {
        gameState = "end";

        lifeG.destroyEach();
        satelliteG.destroyEach();
        poGroup.destroyEach();
        monster1G.destroyEach();

        lifeG.setVelocityYEach(0);
        satelliteG.setVelocityYEach(0);
        poGroup.setVelocityYEach(0);
        monster1G.setVelocityYEach(0);
      }
    }
  }
    drawSprites();
    textSize(20);
    fill(255);
    text("Points: " + PointsObtained, 10, 30);
    if (gameState === "end"){
      stroke("white");
      fill("white");
      textSize(30);
      text("Game Over", 230,250)
  }
}

function createlife() {
  if (World.frameCount % 200 == 0) {
  var life = createSprite(Math.round(random(50, 350),40, 10, 10));
  life.addImage(lifeImg);
  life.scale=0.07;
  life.velocityY = 3;
  life.lifetime = 150;
  lifeG.add(life);
  }
}

function createSatellite() {
  if (World.frameCount % 320 == 0) {
  var Satellite= createSprite(Math.round(random(50, 350),40, 10, 10));
  Satellite.addImage(satelliteImg);
  Satellite.scale=0.12;
  Satellite.velocityY = 3;
  Satellite.lifetime = 150;
  satelliteG.add(Satellite);
}
}

function createpo() {
  if (World.frameCount % 410 == 0) {
  var po = createSprite(Math.round(random(50, 350),40, 10, 10));
  po.addImage(poImg);
  po.scale=0.05;
  po.velocityY = 3;
  po.lifetime = 150;
  poGroup.add(po);
  }
}

function createmonster1(){
  if (World.frameCount % 530 == 0) {
  var monster1 = createSprite(Math.round(random(50, 100),40, 10, 10));
  monster1.addImage(monster1Img);
  monster1.scale=0.25;
  monster1.velocityY = 3;
  monster1.lifetime = 150;
  monster1G.add(monster1);
  }
}
