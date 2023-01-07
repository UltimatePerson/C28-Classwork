class CannonBall {
    constructor(x, y) {
        var options = {
            isStatic: true
        };
        this.r = 30;
        this.speed = 0.05;
        this.body = Bodies.circle(x, y, this.r, options);
        this.image = loadImage("./assets/cannonball.png");
        this.animation = [this.image];
        this.isSink = false;
        World.add(world, this.body);
        this.t = []
    }

    animate(){
        this.speed += 0.05;
    }
    
    remove(index){
        this.isSink = true;
        Matter.Body.setVelocity(this.body, {x:0, y:0});

        this.animation = waterSplashAnimation;
        this.speed = 0.05;
        this.r = 150;
        setTimeout(()=>{
            Matter.World.remove(world, this.body);
            delete balls[index];
        }, 1000);
    }
    
    shoot() {
        var newAngle = cannon.angle - 28;
        newAngle = newAngle * (3.14 / 180)
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
            x: velocity.x * (180 / 3.14),
            y: velocity.y * (180 / 3.14)
        })
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.position
        var index = floor(this.speed % this.animation.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, 0, this.r, this.r);
        pop();

        if(this.body.position.x>10 && this.body.velocity.x>0){
            var p = [pos.x, pos.y]
            this.t.push(p)
        }
        for(var i = 0; i< this.t.length;i++){
            image(this.image, this.t[i][0], this.t[i][1],5,5);
        }
    }
}