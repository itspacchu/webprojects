const flock = [];

function setup() {
    createCanvas(1280,720);
    var boid_count = 200;
    for(let i=0;i<boid_count;i++){
        flock.push(new Boid());
    }
    
}

function draw() {
  background(51);
  for(let boid of flock){
      boid.edgewrap();
      boid.flocking(flock);
      boid.update();
      boid.show();

  }
}