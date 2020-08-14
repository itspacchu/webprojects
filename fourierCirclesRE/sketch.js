const PI = 3.1415;

function setup() {
  width = 800;
  height = 800;
  t = 0
  
  sample = [1,1,1,1,1,1];
  createCanvas(width, height);
  cn = fourierCalculator(sample,0.01);
  tracer = []
  print(cn);
  circlecount = cn.length;
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
    rad = cn[n].mag();
    i += rad * cos(n*t + cn[n].ang());
    j += rad * sin(n*t + cn[n].ang());
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
  for(let n = tracer.length-1 ; n > 0  ; n--){
    stroke(map(n,0,tracer.length,255,42));
    line(tracer[n-1].x,tracer[n-1].y,tracer[n].x,tracer[n].y)
  }
  //ticking
  t+=0.01;
}


function EulerValues(rad,ph){
  this.rad = rad;
  this.phase = phase;
}


function fourierCalculator(arr,dt){
  // Calculates integral from 0-PI
  let cn = []
  let ct = 0;
  let st = 0;

  for(let n=0;n<arr.length;n++){
    for(let i=0;i<PI;i+=dt){
      ct+= cos(n*2*PI*i)
    }
    for(let i=0;i<PI;i+=dt){
      st+= sin(n*2*PI*i)
    }
    cn.push(new cmpx(ct/arr.length,st/arr.length));
  }
  
  return cn;
}

function cmpx(real,imag){
  this.real = real;
  this.imag = imag;

  this.mag = function(){
    return sqrt(this.real*this.real + this.imag*this.imag);
  }

  this.ang = function(){
    return atan2(this.imag,this.real);
  }
}