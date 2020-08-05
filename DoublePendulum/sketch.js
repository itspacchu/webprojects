// Code inspired from The Coding Train double pendullum challenge

function setup(){
    let width = 720;
    let height = 700;
    p = createGraphics(screen.width,height);
    p.clear();
    createCanvas(width,height);
    dcoeff = createSlider(0.9, 1, 100,0.001);
    dcoeff.position(10,15);
    gsl = createSlider(-1, 1, 100,0.01);
    gsl.position(10,45);
    theta1 = 0.5;
    theta2 = 0;
    t1_v = 0;
    t2_v = 0;
    t1_a = 0;
    t2_a = 0;
    
    m1 = 1;
    m2 = 1;
    l1 = 100;
    l2 = 100;
    
    tck = [];
    
}

function draw(){
    g = gsl.value();
    damping_coefficient = dcoeff.value();
    background(42);
    translate(width/2, 250);
    
    for(let i=1;i<tck.length;i++){ 
        stroke(map(i,0,tck.length,255,42));
        strokeWeight(1);
        line(tck[i].x,tck[i].y,tck[i-1].x,tck[i-1].y);
    }
    
    t1_v += t1_a;
    t2_v += t2_a;
    theta1 += t1_v;
    theta2 += t2_v;
    theta1 *= damping_coefficient;
    theta2 *= damping_coefficient;

    /** PHYSIX
    t1_a =   ((-g*(2*m1+m2)*sin(theta1) - m2*g*sin(theta1 - 2*theta2) + 2*sin(theta1 − theta2)*m2*(t1_v*t1_v*l2 + t1_v*t1_v*l2*l1*cos(theta1 − theta2)))/(l1*(2*m1 + m2 − m2*cos(2*theta1 − 2*theta2))));
    t2_a = (2*sin(theta1 - theta2)*(t1_v*t1_v*l1*(m1+m2) + g*(m1+m2)*cos(theta1) + t1_v*t1_v*l2*m2*cos(theta1-theta2)))/((l2*(2*m1 + m2 − m2*cos(2*theta1 − 2*theta2))));
    */
    f1 = -g * (2 * m1 + m2) * sin(theta1);
    f2 = -m2 * g * sin(theta1 - 2*theta2);
    f3 = -2*sin(theta1 - theta2) * m2;
    f4 = t2_v * t2_v * l2 + t1_v*t1_v * l1 * cos(theta1 - theta2);
    fdenom = l1 * (2 * m1 + m2 - m2*cos(2*theta1 - 2*theta2));

    t1_a = (f1 + f2 + f3*f4)/fdenom;

    f1 = 2*sin(theta1 - theta2);
    f2 = (t1_v * t1_v * l1 * (m1 + m2));
    f3 = g * (m1 + m2)* cos(theta1);
    f4 = t2_v * t2_v * l2 * m2 * cos(theta1 - theta2);
    fdenom = l2 * (2 * m1 + m2 - m2*cos(2*theta1 - 2*theta2));

    t2_a = (f1 * (f2 + f3 + f4))/fdenom;

    if(t1_v > 1000 || t2_v > 1000){
        t1_v = 100;
        t1_v = 100;
        t1_a -= 100;
        t2_a -=100;
    }
    
    
    let j1 = createVector(l1*cos(theta1+PI/2),l1*sin(theta1+PI/2));
    let j2 = createVector( j1.x + l2*cos(theta2+PI/2),j1.y + l2*sin(theta2+PI/2));
    //pendullum renderer
    stroke(255);
    strokeWeight(10);
    point(0,0);
    point(j1.x,j1.y);
    point(j2.x,j2.y)
    stroke(125);
    strokeWeight(20);
    line(0,0,j1.x,j1.y);
    stroke(255);
    line(j1.x,j1.y,j2.x,j2.y);
    image(p, 0, 0);

    tck.unshift(j2);
    console.log(tck);

    if(tck.length > 250){
        tck.pop(0);
    }
    translate(-width/2,-250);
    noStroke();
    textSize(16);
    text('Damping : '+ damping_coefficient, 150, 22);
    fill(255);
    textSize(16);
    text('Gravity y : '+ g, 150, 52);
    fill(255);
    
}

function setInitPos(currentx,currenty){
    for(let theta1 = currentx;theta1 < PI + currentx;theta1 += 0.01){
        for(let theta2 = currenty;theta2 < PI + currenty;theta2 += 0.01){
            let j1 = createVector(l1*cos(theta1+PI/2),l1*sin(theta1+PI/2));
            let j2 = createVector( j1.x + l2*cos(theta2+PI/2),j1.y + l2*sin(theta2+PI/2));
            if(j2.x == mouseX-width/2 && j2.y-100 == mouseY){
                return {
                    t1:theta1,
                    t2:theta2
                };
            }else{
                return {
                    t1:random(0,PI),
                    t2:random(0,PI)
                }
            }
        }
    }
}


function mousePressed(){
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(mouseX, mouseY,30);
    let k = setInitPos(theta1,theta2);
        theta1 = k.t1;
        theta2 = k.t2;
        tck = [];
        t1_v = 0;
        t2_v = 0;
        t1_a =0 ;
        t2_a = 0;
}
