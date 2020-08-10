function setup() {
  width = 400;
  height = 400;
  t = 0
  cn = [20,55,30,55,20,3,4,12,4,3,1,5,4,3,1,5,3,2,1,6,4,3]
  createCanvas(width, height);
  tracer = []

  circlecount = 6;
}

function draw() {
  translate(width/2, height/2)
  background(42);
  let i = 0;
  let i_old = 0;
  let j = 0;
  let j_old = 0;

  for(let n = 0; n < circlecount;n++){
    i_old = i;
    j_old = j;
    rad = cn[n];
    i += rad * cos(n*t);
    j += rad * sin(n*t);
    stroke(map(n,0,circlecount,50,125));
    strokeWeight(1);
    noFill();
    ellipse(i_old,j_old,rad*2);
    iv = createVector(i_old, j_old);
    jv = createVector(i, j)
    //drawArrow(iv,jv,'white');
    line(iv.x,iv.y,jv.x,jv.y);
    fill(map(n,0,6,50,125));
    ellipse(i, j, 5);
    
  }
  fill(255);
  ellipse(i, j, 5);


  //tracing action
  tracer.unshift(createVector(i,j));
  if(tracer.length > 300){
    tracer.pop();
  }

  stroke(255);
  for(let n = 1 ; n < tracer.length ; n++){
    line(tracer[n-1].x,tracer[n-1].y,tracer[n].x,tracer[n].y)
  }
  //ticking
  t+=0.01;
}


function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}