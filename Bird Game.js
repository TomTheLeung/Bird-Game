let bird;
let pipe;
let pipes = [];
let health = 300;
let hittingPipe = -1;
let timer = 120;
let interval = 60;

function setup() {
  createCanvas(640, 480);
  bird = new Bird();
  pipe = new Pipe();
}

function draw() { 
  background(255,200,200);
  textSize(25);
  text('Health:'+health,10,20);
  text("Countdown: " + timer, 180, 20);
  if (frameCount % interval == 0) { // if the frameCount is divisible by the interval, then the interval (in seconds) has passed
    timer--;
  }
  bird.show();
  bird.update();
  if (frameCount % 400 == 0) {
    //console.log(frameCount);
    pipes.push(new Pipe());

  }

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].show();
    pipes[i].update();

    // if the current pipe hits the bird using this.hits in pipe.js
    
    if (hittingPipe == i && pipes[i].hits(bird) == false)
    {
      hittingPipe = -1;
      health = health -100;
      console.log("HIT ENDED");
    }
    
    if (pipes[i].hits(bird)){
      console.log(i);
      hittingPipe = i;
    }
      
  }
  
  if (timer <= 60){
    textSize(20);
    text('You did well thus far, but you need to try a little harder than that!',10,40);
  }
  
  if (health <= 0){
    background(255,0,0);
    textSize(100);
    text('Game Over!',10,200);
  }
  
  if (health > 0 && timer <= 0){
    background(255,255,0);
    textSize(100);
    text('You Win!',10,200);
    health++;
  }
  
}
  // commented out the old use of pipe.show() and pipe.update()
  //pipe.show();
  //pipe.update();



function keyPressed() {
  if (key == ' ') {
    console.log("pressed space");
    bird.up();
  }
}


function Bird() {
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.6;
  this.velocity = 0;
  this.lift = -8;

  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  this.up = function() {
    this.velocity += this.lift;
  }
    

  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    // hits the bottom of the screem
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    // hits the top of the screen
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    if(this.velocity > 10) {
      this.velocity = 10;
    }
    //console.log(this.velocity, this.gravity);
  }
}

function Pipe() {
  // start off screem
  this.x = width-50;
  this.origin = random(height-300);
  this.gap = 180;
  // add a width for your bars
  this.w = 60;
  // add the top of the gap
  if (timer <= 60){
    this.gap = 120;
    this.w = 90;
  }
  this.top = this.origin - (this.gap/2);
  // add the bottom of the gap
  this.bottom = this.origin + (this.gap/2);

  // set a boolean for a hit
  this.highlight = false;

  // create a hit function
  // check if bird is within this.top or this.bottom 
  // and with the width of the bar
  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
   fill(220);
    // rect(x, y, w, h);
    fill(0,255,255);
    // top bar with this.w and this.top
    rect(this.x, 0, this.w, this.top);
    // bottom bar with this.w and this.bottom 
    rect(this.x, this.bottom, this.w, height);
  }

  this.update = function(){
    // move across screen
    this.x --;
  }
}