let ageStage = 0;
let ageLabels = ["Baby", "Toddler", "Child", "Teen", "Adult", "Elder"];
let timer = 0;
let duration = 240; // frames per age stage (~4 sec)
let walkSpeed = 0.05;

function setup() {
  createCanvas(600, 400);
  frameRate(60);
  textAlign(CENTER, CENTER);
}

function draw() {
  // 🎨 Background color based on age stage
  background(getBackgroundColor(ageStage));

  // Timer and stage progression
  timer++;
  if (timer > duration) {
    timer = 0;
    ageStage = (ageStage + 1) % ageLabels.length;
  }

  // Draw figure
  drawStickFigure(ageStage);

  // Stage label
  fill(20);
  textSize(24);
  text(ageLabels[ageStage], width / 2, 30);

  // Timeline
  drawTimeline(ageStage, timer / duration);
}

function getBackgroundColor(stage) {
  switch (stage) {
    case 0: return color('#add8e6'); // light blue
    case 1: return color('#9b111e'); // ruby
    case 2: return color('#9370db'); // purple
    case 3: return color('#ffc0cb'); // pink
    case 4: return color('#fff176'); // light yellow
    case 5: return color('#b0b0b0'); // gray
    default: return color(255);
  }
}

function drawTimeline(stage, progress) {
  let stages = ageLabels.length;
  let margin = 60;
  let timelineY = height - 40;
  let timelineWidth = width - 2 * margin;
  let step = timelineWidth / (stages - 1);

  stroke(200);
  strokeWeight(4);
  line(margin, timelineY, width - margin, timelineY);

  for (let i = 0; i < stages; i++) {
    let x = margin + i * step;
    fill(0);
    noStroke();
    ellipse(x, timelineY, 10, 10);
    textSize(12);
    fill(50);
    text(ageLabels[i], x, timelineY + 20);
  }

  let markerX = margin + (stage + progress) * step;
  fill(0, 100, 255);
  noStroke();
  ellipse(markerX, timelineY, 14, 14);
}

function drawStickFigure(stage) {
  push();
  translate(width / 2, height * 0.75);

  let t = frameCount * walkSpeed;
  let swing = sin(t) * 10;

  let headSize, bodyLength, armLength, legLength;
  let colorSkin = color(0);
  let hairColor = color(0);
  let backHunch = 0;

  switch (stage) {
    case 0:
      headSize = 30;
      bodyLength = 20;
      armLength = 10;
      legLength = 10;
      hairColor = color(180, 120, 80);
      break;
    case 1:
      headSize = 28;
      bodyLength = 30;
      armLength = 15;
      legLength = 15;
      hairColor = color(120, 80, 50);
      break;
    case 2:
      headSize = 24;
      bodyLength = 40;
      armLength = 20;
      legLength = 25;
      hairColor = color(100, 50, 20);
      break;
    case 3:
      headSize = 22;
      bodyLength = 50;
      armLength = 25;
      legLength = 35;
      hairColor = color(50, 30, 10);
      break;
    case 4:
      headSize = 20;
      bodyLength = 60;
      armLength = 30;
      legLength = 40;
      hairColor = color(30);
      break;
    case 5:
      headSize = 22;
      bodyLength = 55;
      armLength = 28;
      legLength = 35;
      backHunch = 8;
      colorSkin = color(80);
      hairColor = color(200);
      break;
  }

  stroke(colorSkin);
  strokeWeight(3);
  fill(255);

  // Head
  ellipse(0, -bodyLength - headSize / 2, headSize, headSize);

  // Hair
  stroke(hairColor);
  strokeWeight(2);
  line(-headSize / 4, -bodyLength - headSize / 2, -headSize / 4, -bodyLength - headSize);
  line(0, -bodyLength - headSize / 2, 0, -bodyLength - headSize);
  line(headSize / 4, -bodyLength - headSize / 2, headSize / 4, -bodyLength - headSize);

  // Face
  stroke(0);
  strokeWeight(2);
  point(-5, -bodyLength - headSize / 2);
  point(5, -bodyLength - headSize / 2);
  noFill();
  if (stage == 0 || stage == 1) {
    arc(0, -bodyLength - headSize / 3, 10, 5, 0, PI);
  } else if (stage == 5) {
    arc(0, -bodyLength - headSize / 3, 10, 5, PI, 0);
  } else {
    line(-3, -bodyLength - headSize / 3, 3, -bodyLength - headSize / 3);
  }

  stroke(colorSkin);
  strokeWeight(3);

  // Body
  line(0, -bodyLength, backHunch, 0);

  // Arms
  line(backHunch, -bodyLength / 2, backHunch - armLength + swing, -bodyLength / 4);
  line(backHunch, -bodyLength / 2, backHunch + armLength - swing, -bodyLength / 4);

  // Legs
  line(backHunch, 0, backHunch - legLength + swing, legLength);
  line(backHunch, 0, backHunch + legLength - swing, legLength);

  pop();
}
