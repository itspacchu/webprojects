function setup(){
    let width = 720;
    let height = 400;
    createCanvas(width,height);
    
}
function draw(){
    background(42);
    x = 100;
    y = 100;
    let parent = createVector(width/2,100);

    let elbow = createVector(width/2,200);

    let tip = createVector(width/2,300);

    //debug code
    stroke(100);
    line(mouseX,mouseY,tip.x,tip.y);
    stroke(100);

    //**********

    stroke(175);
    strokeWeight(10);
    line(width/2,parent.y,elbow.x,elbow.y);
    stroke(255);
    line(elbow.x,elbow.y,tip.x,tip.y);
    dottedline(parent.x,parent.y,mouseX,mouseY,1);
    noStroke();
    ellipse(mouseX,mouseY,20);

}

function distance(x1,y1,x2,y2){
    return sqrt(pow(x1-x2,2)+pow(y1-y2,2));
}

function dottedline(x1,y1,x2,y2,dist){
    strokeWeight(1);
    stroke(120);
    line(x1,y1,x2,y2);
    stroke(200);
    strokeWeight(10);
    for( let k = 0.1 ; k < dist ; k+=0.1){
        x_1 = lerp(x1,x2,k);
        x_2 = lerp(y1,y2,k);
        point(x_1,x_2);
    }
    
    
}