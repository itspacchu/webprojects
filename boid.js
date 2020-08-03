class Boid {
    constructor(){
        this.position = createVector(random(width),random(height));
        this.velocity = p5.Vector.random2D();
        this.acc = createVector()
        this.velocity.setMag(random(2,4));
        this.maxForce = 10;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acc);
    }

    edgewrap(){
        if(this.position.x > width){
            this.position.x = 0;
        }else if(this.position.x < 0){
            this.position.x = width;
        }

        if(this.position.y > height){
            this.position.y = 0;
        }else if(this.position.y < 0){
            this.position.y = height;
        }
    }

    align(flock){
        let check_dist = 70;
        let steer = createVector();
        let total = 0;
        for(let boid of flock){
            let distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if(distance < check_dist && boid != this){
                steer.add(boid.velocity);
                total+=1;
            }  
        }
        if(total>0){
            steer.div(total);
            steer.sub(this.velocity);  
            steer.limit(this.maxForce);
        }
        return steer;
    }

    flocking(flock){
        let alignment = this.align(flock);
        this.acc = alignment;
    }

    show(){
        strokeWeight(5);
        stroke(255);
        this.boidshape(this.position.x,this.position.y,this.position.angle);
    }
    
    boidshape(x,y,angle){
        rotate(angle);
        triangle(x, y, x-0.25, y-0.5, x+0.25, y-0.5);
    }
}