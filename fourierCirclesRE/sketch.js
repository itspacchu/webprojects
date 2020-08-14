

function setup() {
  width = 800;
  height = 800;
  t = 0
  timescaler = 1;
  scal = 0.1;
  x = [];
  for(let i = 0;i< 50;i++){
    x[i] = new cmpx(1000*sin(i),1000*cos(i));
  }
  cn = fourierCalculator(x);
  createCanvas(width, height);

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

  for(let n = 0; n < cn.length;n++){
    i_old = i;
    j_old = j;
    rad = cn[n].mag * scal;
    i += rad * cos(cn[n].freq*t + cn[n].ang + HALF_PI);
    j += rad * sin(cn[n].freq*t + cn[n].ang + HALF_PI);
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
  t+= TWO_PI * timescaler / cn.length;
}


function EulerValues(rad,ph){
  this.rad = rad;
  this.phase = phase;
}


function fourierCalculator(x,dt){
  const fX = [];
  const N = x.length;
  for(let k=0;k<N;k++){
    let sum = new cmpx(0,0);
    let re = 0;
    let im = 0;
    for(let n =0 ;n<N;n++){
      let phi = TWO_PI * k * n / N;
      const c = new cmpx(cos(phi) , -sin(phi));
      sum.add(x[n].mult(c));

    }

    sum.re = sum.re / N;
    sum.im = sum.im / N;
    
    let mag = sqrt(sum.re*sum.re + sum.im*sum.im);
    let ang = atan2(sum.im,sum.re);
    let freq = k;
    fX[k] = {re:sum.re , im:sum.im , mag , ang , freq};

  }
  return fX;
}

class cmpx {
  constructor(a,b){
    this.re = a;
    this.im = b;
  }

  add(c){
    this.re += c.re;
    this.im += c.im;
  }

  mult(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new cmpx(re,im);
  }
}