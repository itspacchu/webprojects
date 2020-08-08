function setup() {
  createCanvas(400, 400);
  scrib = [];
  s_smooth = [];
  sp = .25;
  canvas = true;
}

function draw() {
  background(42);
  stroke(125);
  fill(125);
  strokeWeight(2);
  if(scrib.length > 0){
    ellipse(scrib[0].x,scrib[0].y,10);
  }
  
  for(let i = 1;i < scrib.length;i++){
    ellipse(scrib[i].x,scrib[i].y,5);
    line(scrib[i-1].x,scrib[i-1].y,scrib[i].x,scrib[i].y);
  }

  

}

function mouseReleased(){
  console.log(typeof(scrib[0]));
  console.log("computing smoothness");
  for(let i=2;i<scrib.length;i++){
    s_smooth.push(createVector((1-sp)*scrib[i-1].x  + sp*scrib[i].x ,(1-sp)*scrib[i-1].y  + sp*scrib[i].y  ));
  }
  stroke(255);
  for(let i = 0;i < scrib.length;i++){
    ellipse(s_smooth[i].x,s_smooth[i].y,5);
    line(s_smooth[i-1].x,s_smooth[i-1].y,s_smooth[i].x,s_smooth[i].y);
  }
}

function mousePressed(){
  if(scrib.length > 2){
    background(42);
    scrib = [];
  }
  
}

function mouseDragged(){
  scrib.push(createVector(mouseX, mouseY));
  
}

function distance(v1,v2){
  return sqrt( pow(v1.x - v2.x,2) + pow(v1.y - v2.x ,2) );
}