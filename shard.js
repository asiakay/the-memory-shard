import { audio } from './sound.js';

let shardImg;
let hoverX, hoverY;
let noiseOffset = 0;
let glitchMode = false;

function preload() {
  shardImg = loadImage('https://cdn.glitch.global/da5ab1ea-ed7c-4e18-ac7e-ca8a1904b825/memory-shard-removebg-preview.png?v=1743627918480');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize position (center)
  hoverX = width/2 - shardImg.width/2;
  hoverY = height/2 - shardImg.height/2;
  
  // Cold aesthetic
  colorMode(HSB, 360, 100, 100);
  
    // Audio activation button (required for browsers)
  const audioBtn = createButton('🎵 Activate Sound');
  audioBtn.position(20, 20);
  audioBtn.mousePressed(() => audio.startHum());
}

function draw() {
  // Fading background trail
  background(210, 70, 15, 0.1);
  const moveSpeed = constrain(dist(mouseX, mouseY, pmouseX, pmouseY) / 50, 0, 1);
  
    // Update audio
  audio.reactToMovement(moveSpeed);
  
  // Organic hovering using Perlin noise
  noiseOffset += 0.02;
  let driftX = map(noise(noiseOffset), 0, 1, -30, 30);
  let driftY = map(noise(noiseOffset + 100), 0, 1, -20, 20);
  
  // Draw shard with icy glow
  drawingContext.shadowColor = color(190, 80, 90, 50);
  drawingContext.shadowBlur = 15;
  
  if (glitchMode && frameCount % 3 === 0) {
    // Glitch distortion
    tint(200, 50, 100, random(150, 220));
    image(shardImg, 
      hoverX + driftX + random(-15, 15), 
      hoverY + driftY + random(-10, 10),
      shardImg.width * random(0.9, 1.1),
      shardImg.height * random(0.9, 1.1)
    );
  } else {
    // Normal display
    tint(190, 40, 100, 220);
    image(shardImg, hoverX + driftX, hoverY + driftY);
  }
  
  // Cold ambient particles
  if (frameCount % 2 === 0) {
    fill(190, 80, 100, random(30, 60));
    noStroke();
    circle(
      width/2 + random(-200, 200),
      height/2 + random(-150, 150),
      random(1, 3)
    );
  }
}

function mousePressed() {
  // Toggle glitch mode on click
  glitchMode = !glitchMode;
  
  // Visual feedback
  if (glitchMode) {
    background(190, 80, 30);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Re-center on resize
  hoverX = width/2 - shardImg.width/2;
  hoverY = height/2 - shardImg.height/2;
}

function mousePressed() {
  glitchMode = !glitchMode;
  if (glitchMode) audio.triggerGlitch();
}