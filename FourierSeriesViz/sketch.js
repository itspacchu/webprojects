function setup() {
  
    createCanvas(720, 400);
    
    cSlider = createSlider(1,10,10);
    cSlider.position(20,20);
  }
  
  function draw() {
    const sinecomps = cSlider.value()+1;
    background(42);
    fill(255);
    text('no of Sine '+ str(sinecomps-1), cSlider.x * 2 + cSlider.width, 35);
    sinusoids(sinecomps);
  
  }
  
  function sinusoids(sinecomps){
    noStroke();
    fill(70);
    for(let i = 50 ; i < 670 ; i+=0.1){
        ellipse(i,200+30*sinedSquareWave(i/100),2);
    }
    fill(255);
    for(let i = 50 ; i < 670 ; i+=0.1){
        ellipse(i,200+30*noOfSines(i/100,sinecomps),5);
    }
  }
  
  function noOfSines(i,x){
    let result =  0;
    for(let t=1;t<x;t+=2){
      result+=(1/t)*sin(i*PI*t);
    }
    return result;
  }
  
  
  function sinedSquareWave(i){
    if(sin(i*PI) > 0){
      return 1;
    }else{
      return -1;
    }
  }
  
  