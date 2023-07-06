function ShapeCircle(x, y, r, opts){
    this.radius = r;
    this.m_body = Matter.Bodies.circle(x, y, r, opts);
    Matter.World.add(WORLD, this.m_body);
    this.draw = function(){
        push();
        translate(this.m_body.position.x, this.m_body.position.y);
        rotate(this.m_body.angle);
        stroke(66,173,55);
        strokeWeight(4);
        fill(239, 182, 129);
        ellipse(0, 0, this.radius * 2);
        pop();
    }
}

function ShapeRect(x, y, w, h, opts){
    this.width = w;
    this.height = h;
    this.m_body = Matter.Bodies.rectangle(x, y, w, h, opts);
    Matter.World.add(WORLD, this.m_body);
    this.draw = function(){
        push();
        rectMode(CENTER);
        imageMode(CORNER);
        translate(this.m_body.position.x, this.m_body.position.y);
        rotate(this.m_body.angle);
        fill(239, 182, 129);
        stroke(139, 82, 29);
        rect(0, 0, this.width, this.height);
        let imgsize = 32;
        for(let i = 0; (i * imgsize) < this.width; i++){
            let x_off = (-this.width/2) + (i * imgsize);
            let y_off = (-this.height/2) + (0 * imgsize);
            let adjw = imgsize;
            let adjh = imgsize;
            if((i*imgsize) + imgsize > this.width){
                adjw = this.width % imgsize;
            }
            image(img_dirt, x_off, y_off, adjw, adjh);
        }
        pop();
    }
}


function ShapeShura(x, y, size){
    if(size == undefined){
        size = 1;
    }
    let group = Matter.Body.nextGroup(true);
    let bike = Matter.Composite.create({ label: 'Bike' });

    this.shura = {
        x_off: 45 * size,
        y_off: -45 * size,
        width: 45 * size,
        height: 45 * size,
        radius: 0 * size,
        m_body: undefined,
        m_opts: {
            collisionFilter: {
                group: group
            },
            density: P_BIKE_SHURA_DENSITY
        }

    }
    this.shura.m_body = Matter.Bodies.rectangle(x + this.shura.x_off,
                                                y + this.shura.y_off,
                                                this.shura.width,
                                                this.shura.height,
                                                this.shura.m_opts);
    this.bikeBody = {
        x_off: 0 * size,
        y_off: 15 * size,
        width: 120 * size,
        height: 45 * size,
        radius: 0 * size,
        m_body: undefined,
        m_opts: {
            collisionFilter: {
                group: group
            }
            ,
            restitution: P_BIKE_BODY_RESTITUTION,
            density: P_BIKE_BODY_DENSITY
        }

    };
    this.bikeBody.m_body = Matter.Bodies.rectangle(x + this.bikeBody.x_off,
                                                   y + this.bikeBody.y_off,
                                                   this.bikeBody.width,
                                                   this.bikeBody.height,
                                                   this.bikeBody.m_opts);

    this.wheelRear = {
        x_off: -55 * size,
        y_off: 13 * size,
        radius: 22 * size,
        m_body: undefined,
        m_opts: {
            collisionFilter: {
                group: group
            },
            friction: P_BIKE_WHEEL_REAR_FRICTION,
            restitution: P_BIKE_WHEEL_REAR_RESTITUTION,
            density: P_BIKE_WHEEL_REAR_DENSITY
        }
    }

    this.wheelRear.m_body = Matter.Bodies.circle(x + this.wheelRear.x_off,
                                                 y + this.wheelRear.y_off,
                                                 this.wheelRear.radius,
                                                 this.wheelRear.m_opts);
    this.wheelFront = {
        x_off: 55 * size,
        y_off: 13 * size,
        radius: 22 * size,
        m_body: undefined,
        m_opts: {
            collisionFilter: {
                group: group
            },
            friction: P_BIKE_WHEEL_FRONT_FRICTION,
            restitution: P_BIKE_WHEEL_FRONT_RESTITUTION,
            density: P_BIKE_WHEEL_FRONT_DENSITY
        }
    }
    this.wheelFront.m_body = Matter.Bodies.circle(x + this.wheelFront.x_off,
                                                  y + this.wheelFront.y_off,
                                                  this.wheelFront.radius,
                                                  this.wheelFront.m_opts);

    var axelRear = Matter.Constraint.create({
        bodyB: this.bikeBody.m_body,
        pointB: { x: this.wheelRear.x_off, y: this.wheelRear.y_off },
        bodyA: this.wheelRear.m_body,
        stiffness: P_BIKE_AXEL_REAR_STIFFNESS,
        length: P_BIKE_AXEL_REAR_LENGTH
    });

    var axelFront = Matter.Constraint.create({
        bodyB: this.bikeBody.m_body,
        pointB: { x: this.wheelFront.x_off, y: this.wheelFront.y_off },
        bodyA: this.wheelFront.m_body,
        stiffness: P_BIKE_AXEL_FRONT_STIFFNESS,
        length: P_BIKE_AXEL_FRONT_LENGTH
    });

    var jointBikeShura1 =  Matter.Constraint.create({
       bodyB: this.bikeBody.m_body,
       pointB: {x: 25, y: -30},
       bodyA: this.shura.m_body ,
       pointA: {x: 5, y: 5},
       stiffness: 0.7,
       length: 0
    });

    var jointBikeShura2 =  Matter.Constraint.create({
       bodyB: this.bikeBody.m_body,
       pointB: {x: 5, y: -30},
       bodyA: this.shura.m_body ,
       pointA: {x: -5, y: 5},
       stiffness: 1,
       length: 0
    });

    Matter.Composite.addBody(bike, this.bikeBody.m_body);
    Matter.Composite.addBody(bike, this.wheelRear.m_body);
    Matter.Composite.addBody(bike, this.wheelFront.m_body);
    Matter.Composite.addBody(bike, this.shura.m_body);
    Matter.Composite.addConstraint(bike, axelRear);
    Matter.Composite.addConstraint(bike, axelFront);
    Matter.Composite.addConstraint(bike, jointBikeShura1);
    Matter.Composite.addConstraint(bike, jointBikeShura2);
    Matter.World.add(WORLD, bike);

    this.bike = bike;
    this.draw = function(){
        rectMode(CENTER);
        imageMode(CENTER);
        // Draw bike
        [this.wheelRear, this.wheelFront, this.bikeBody].forEach( (el) =>{
            push();
            fill(255,255,255, 100);
            translate(el.m_body.position.x, el.m_body.position.y);
            rotate(el.m_body.angle);
            if(el.m_body.label == 'Rectangle Body'){
                image(img_bike, 0, -20, 140, 80);
                if(drawBodies){
                    rect(0, 0, el.width, el.height);
                }
            }
            if(el.m_body.label == 'Circle Body'){
                image(img_wheel, 0, 0, 42, 42);
                if(drawBodies){
                    ellipse(0, 0, el.radius*2);
                    stroke(255, 0, 0);
                    line(0, 0, 0, el.radius);
                }
            }
            pop();
        });

        // Draw shura
        push();
        let el = this.shura;
        translate(el.m_body.position.x, el.m_body.position.y);
        fill(255,0,0, 100);
        rotate(el.m_body.angle);
        if(drawBodies){
            rect(0, 0, el.width, el.height);
        }
        pop();
    }
}
