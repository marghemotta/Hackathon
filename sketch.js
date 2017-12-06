var flakes = [];
var treeBalls = [];
var colorList = ['#cc272e', '#feea5c', '#e55266', '#002e93', '#85e5c7'];
var mic;
var vol;
var angolo;
var myImg;
var myImg2;
var myImg3;
var myImg4;
var myImg5;
var santax;

function preload() {
    myImg = loadImage("sock.png");
    myImg2 = loadImage("sock2.png");
    myImg3 = loadImage("moon.png");
    myImg4 = loadImage("santa.png");
    myImg5 = loadImage("tree.png");
    myImg6 = loadImage("star.png");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    angleMode(DEGREES);
    textAlign(CENTER);
    textFont('Helvetica',34)
    santax = width / 2;

    //get mic
    mic = new p5.AudioIn();
    mic.start();


    for (i = 0; i < 50; i++) {
        let x = random(width);
        let y = random(-height, height);
        let r = random(4, 12);
        let b = new Flake(x, y, r);
        flakes.push(b);
    }

    getBalls();
}


function draw() {
    background('#113047');

    //moon
    push();
    translate(width - width / 3, height - height / 1.05);
    if (width > height) {
        image(myImg3, 0, width / 10, width / 100 * 15, width / 100 * 15)
    } else {
        image(myImg3, 0, width / 10, height / 100 * 15, height / 100 * 15)
    }
    pop();

    //santa sled
    push();
    if (width > height) {
        image(myImg4, santax, 0 + height / 5.5, width / 100 * 24, width / 100 * 12)
    } else {
        image(myImg4, santax, 0 + height / 8.5, height / 100 * 24, height / 100 * 12)
    }

    if (vol > 0.01 && santax < width) {
        santax = santax + 2;
    } else if (vol < 0.01 && santax > width / 2.5) {
        santax = santax - 2;
    }
    pop();

    //call tree and socks function
    Trees();

    Socks()

    //get volume, map speed
    vol = mic.getLevel()
    var flakespeed = map(vol, 0, 1, 0, 15);

    //balls changing colors
    if (vol > 0.2) {
        for (i = 0; i < treeBalls.length; i++) {
            treeBalls[i].getTreeBallsColor();
        }
    }

    //flakes

    for (i = 0; i < flakes.length; i++) {
        flakes[i].display();
        flakes[i].move(flakespeed);
    }
    for (i = 0; i < treeBalls.length; i++) {
        treeBalls[i].display();
    }

    //stella
    push();
    translate(width / 2, height / 2 - 160);
    volstar = map(vol, 0, 1, 30, 100);
    image(myImg6, 0, 0, volstar, volstar);
    pop();
    
    push();
    fill(255);
    translate(width/2,height/1.2);
    text("Merry Christmas!",0,0)
    pop();
}


function Trees() {
    push();
    translate(width / 2, height / 2);
    image(myImg5, 0, 0, 230, 300)

    pop();

}


function Socks() {
    //first
    push();
    translate(width / 2 - 50, height / 2 + 50);

    rotate(10 + angolo * 120);
    angolo = vol;

    image(myImg, 0, 0, 40, 40)

    pop();

    //second
    push();
    translate(width / 2 - 20, height / 2 - 60);

    rotate(10 + angolo * 120);
    angolo = vol;
    image(myImg, 0, 0, 40, 40)

    pop();

    //third
    push();
    translate(width / 2 + 35, height / 2 - 25);

    rotate(10 + angolo * 120);
    angolo = vol;
    image(myImg, 0, 0, 40, 40)
    pop();
}


class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.getTreeBallsColor();
    }

    display() {
        noStroke();
        push();
        translate(width/2,height/2);
        fill(this.ballCol);
        ellipse(this.x, this.y, this.r);
        pop();

    }

    getTreeBallsColor() {
        var index = floor(random() * colorList.length);
        this.ballCol = colorList[index];
    }
}

class Flake {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.transparency = random(20, 255);
    }

    move(flakespeed) {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(0.1, 1) + flakespeed;
        if (this.y >= height) {
            this.y = random(-100, -10);
            this.x = random(width);
            this.transparency = random(20, 255)
        }
    }

    display() {
        noStroke();
        fill(255, this.transparency);
        ellipse(this.x, this.y, this.r);
    }
}


function getBalls() {
    treeBalls.push(new Ball(0, 10, 15));
    treeBalls.push(new Ball(25, -50, 10));
    treeBalls.push(new Ball(-35, -10, 20));
    treeBalls.push(new Ball(15, -95, 15));
    treeBalls.push(new Ball(-10, -110, 10));
    treeBalls.push(new Ball(35, 40, 25));
    treeBalls.push(new Ball(75, 60, 10));

}