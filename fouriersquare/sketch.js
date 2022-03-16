function setup() {
  
    createCanvas(720, 400);
    
    cSlider = createSlider(3,15,4,2);
    cSlider.position(20,380);
    time = 0;
  }
  
  function draw() {
    const sinecomps = cSlider.value()+1;
    background(42);
    fill(255);
    textSize(25);
    text('no of Sines '+ str(sinecomps-3), cSlider.x * 2 + cSlider.width, cSlider.y +5);
    sinusoids(sinecomps);
    time+=1;
  
  }
  
  function sinusoids(sinecomps){
    noStroke();
    fill(70);
    for(let i = 50 ; i < 670 ; i+=2){
        ellipse(i,200+30*sinedSquareWave((i+time)/100),2);
    }
    fill(255);
    for(let i = 50 ; i < 670 ; i+=1){
      for(let ss = 2; ss < sinecomps ; ss+=2){
        fill(map(ss,0,sinecomps,50,255));
        ellipse(i,200+30*(4/PI)*noOfSines((i+time)/100,ss) - (sinecomps - ss)*50 + 100 ,5);
      }
        
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
  
  