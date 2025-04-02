let shard;
let glitchMode = false;
let hoverRadius = 50; // Orbit radius around mouse

function preload() {
  shard = loadImage('https://cdn.glitch.global/da5ab1ea-ed7c-4e18-ac7e-ca8a1904b825/memory-shard-removebg-preview.png?v=1743627918480');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor(); // Hide default mouse cursor
}

function draw() {
  // Semi-transparent background for motion trails
  background(0, 10, 30, 25);
  
  // Calculate smooth orbiting position
  let angle = frameCount * 0.05;
  let hoverX = cos(angle) * hoverRadius;
  let hoverY = sin(angle * 1.3) * hoverRadius;
  
  // Glitch effects
  if (glitchMode) {
    // Random distortions
    for (let i = 0; i < 3; i++) {
      push();
      translate(
        mouseX - shard.width/2 + hoverX + random(-15, 15),
        mouseY - shard.height/2 + hoverY + random(-10, 10)
      );
      rotate(random(-0.2, 0.2));
      tint(200, 100, 255, random(150, 220));
      image(shard, 0, 0);
      pop();
    }
    
    // Optional: Add crackling particles
    fill(150, 200, 255, random(50, 100));
    noStroke();
    circle(random(width), random(height), random(1, 4));
  } 
  else {
    // Normal display
    push();
    translate(mouseX - shard.width/2 + hoverX, mouseY - shard.height/2 + hoverY);
    tint(170, 200, 255); // Icy blue tint
    image(shard, 0, 0);
    pop();
  }
}

function mousePressed() {
  glitchMode = !glitchMode;
  hoverRadius = glitchMode ? 80 : 50; // Expand orbit during glitch
  
  // Optional: Add sound trigger here
  // if (glitchMode) audio.triggerGlitch();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}