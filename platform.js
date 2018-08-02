function Platform(x, y, len, spacing) {
  this.plat = 1;
  this.x = x;
  this.y = y;
  this.len = len;
  this.spacing = spacing;
  this.color = [random(0, 25), random(0, 25), random(50, 255)];
  this.onPlatY = this.y + 5;

  this.show = function() {
    fill(this.color[0],this.color[1],this.color[2] );
    stroke(255, 90);
    strokeWeight(10);
    rect(this.x, this.y, this.len, 25, 20);
    strokeWeight(0);
  }

  this.update = function(platform) {
    this.x -= acceleration;
    if(this.x + this.len < 0) {
      score++;
      this.reset(platform[platform.length - 1]);
    }
  }

  this.reset = function(platform) {
    this.x = platform.x + platform.len + platform.spacing;
    this.y = random(height - 200, height - 60);
    this.len = random(400,800);
    this.spacing = random(100,200);
  }
}
