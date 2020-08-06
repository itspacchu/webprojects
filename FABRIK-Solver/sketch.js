function setup(){
    let width = 720;
    let height = 400;
    createCanvas(width,height);
    adjust = true;
    l1 = 100;
    a1 = 0;
    l2 = 100;
    a2 = 0;
    tc = [];
    
}
function draw(){
    lmouseX = mouseX-width/2;
    lmouseY = mouseY-100;
    translate(width/2, 100);
    background(42);
    for(let i = 1;i < tc.length;i++){
        stroke(120,120,120,map(i,1,tc.length,100,0));
        strokeWeight(3);
        line(tc[i].x,tc[i].y,tc[i-1].x,tc[i-1].y);
    }
    
    
    

    
    let elbow = createVector(l1*sin(a1),l1*cos(a1));

    let tip = createVector(elbow.x + l2*sin(a2),elbow.y + l2*cos(a2));
    
    //debug code
    stroke(100);
    stroke(100);

    //**********

    stroke(175);
    strokeWeight(10);
    line(0,0,elbow.x,elbow.y);
    stroke(255);
    line(elbow.x,elbow.y,tip.x,tip.y);
    dottedline(0,0,lmouseX,lmouseY,1);
    noStroke();
    ellipse(lmouseX,lmouseY,5);

    
    tc.unshift(tip);
    if(tc.length > 200){
        tc.pop();
    }

    //from http://www.ryanjuckett.com/programming/analytic-two-bone-ik-in-2d/
    f1 = lmouseX*lmouseX + lmouseY*lmouseY;
    f2 =l1*l1 + l2*l2;
    f3 = (l1 + l2*cos(a2));
    f4 = lmouseX*l2*sin(a2);
    f5  = lmouseX*(l1 + l2*cos(a2));
    f6 = lmouseY*(l2*sin(a2));
    
    //a2 = acos(f1 - f2)/2*l1*l2;
    // why tf it aint working
    //θ1=atan2(y(d1+d2cosθ2)−x(d2sinθ2),x(d1+d2cosθ2)+y(d2sinθ2))
   // a1 = atan(lmouseY * (f3 - f4) / (f5 + f6) );
   a1+=0.01;
   a2-=0.01;
   //placeholder animation


}

function distance(x1,y1,x2,y2){
    return sqrt(pow(x1-x2,2)+pow(y1-y2,2));
}

function dottedline(x1,y1,x2,y2,dist){
    strokeWeight(1);
    stroke(120);
    stroke(200);
    strokeWeight(2);
    for( let k = 0.1 ; k < dist ; k+=0.1){
        x_1 = lerp(x1,x2,k);
        x_2 = lerp(y1,y2,k);
        point(x_1,x_2);
    }
    
    
}