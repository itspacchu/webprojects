function setup() {
  width = 720;
  height = 400;
  createCanvas(width, height);
  mic = new p5.AudioIn();
  mic.start();
  loc = [];
}

function draw() {
  translate(width / 2, height / 2);
  background(42);
  amp = mic.getLevel();
  amp = lerp(amp,2,0.8);
  console.log(amp);
  loc.unshift(amp);
  noStroke();
  ellipse(mouseX - width / 2, mouseY - height / 2, 20);
  stroke(255);
  strokeWeight(4);
  for (let i = 1; i < loc.length; i++) {
    line(i, loc[i], i - 1, loc[i - 1]);
  }
  if (loc.length > 200) {
    loc.pop()
  }

}