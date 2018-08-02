//Spark System
function Snow(){
  this.x = player.x + random(0,scl);
  this.y = player.y + scl;
  this.size = 7;
  this.velocityX = random(-10, 2);
  this.velocityY = random(-5, 5);

  this.update = function() {
    if (this.size < 1) {
      this.x = player.x;
      this.y = player.y + scl;
      this.size = 7;
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.size *= 0.9;
  }

  this.show = function() {
    //stroke(240, 140, 25);
    stroke(255);
    strokeWeight(2);
    fill(255);
    rect(this.x, this.y, this.size, this.size, this.size);
    strokeWeight(0);
  }

}
