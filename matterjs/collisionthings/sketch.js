var Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;

var engine;
var world;


function setup() {
  createCanvas(720, 400);
  engine = Engine.create();
  world = engine.world;
  //bx = new PBox(200,100,10,10);
  bx = [];
  Engine.run(engine);
  ground = Bodies.rectangle(720/2,height,720,20 , {isStatic:true});
  World.add(world,ground);

  for(let i=0;i<100;i++){
    bx.push(new PBox(720/2 + random(-50,50),100 + random(-50,50),20,20));
  }
  
}

function mousePressed(){
  bx.push(new PBox(mouseX,mouseY,50,50));
}

function draw() {
  background(42);
  
  fill(125);
  rectMode(CENTER);
  rect(720/2,400,720,20);
  
  for(let i =0;i<bx.length;i++){
    fill(map(i,0,bx.length,100,255));
    bx[i].show();
  }
  
}
