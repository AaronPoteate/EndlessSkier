function Player() {
  this.x = 150;
  this.y = 0;
  this.xaccel = 10;
  this.yaccel = 10;
  this.grav = 1.25;
  this.onPlat = false;
  this.plat = -1;
  this.hitWall = false;
  this.round = 10;

  this.show = function() {
    //Construct person

    //Body
    fill(25,100,25);
    rect(this.x, this.y - 10, scl, scl, 5);
    rect(this.x + 10, this.y + 20, 8, 10);

    //Eye
    fill(255);
    rect(this.x + 18, this.y - 5,10, 10, 10);
    fill(0);
    rect(this.x + 21, this.y  - 2, 6, 6, 6);

    //Ski
    //fill(0);
    stroke(0);
    strokeWeight(3);
    if(this.onPlat) {
      line(this.x - 5, this.y + scl, this.x + 45, this.y +scl);
    } else {
      line(this.x - 5, this.y + scl + 5, this.x + 45, this.y + scl - 5);
    }
    strokeWeight(0);
  }

  this.update = function(platforms) {
    this.yaccel += this.grav;
    this.yaccel = constrain(this.yaccel, -20, 10);

    if(this.died(platforms)) {
      console.log("Game Over");
      reset();
    } else if(this.onPlatform(platforms)) {
      this.onPlat = true;
      this.y += this.yaccel;
      this.y = constrain(this.y, 0, platforms[this.plat].y - scl);
    } else {
      //console.log("falling!!!");
      this.onPlat = false;
      this.y += this.yaccel;
    }
  }

  this.died = function(platforms) {
    for(var i = 0; i < platforms.length; i++) {
      if (this.y > platforms[i].y && this.x + scl > platforms[i].x && this.x < platforms[i].x + platforms[i].len) {
        console.log("Ran into platform");
        return true;
      }
    }
    return false;
  }

  this.onPlatform = function(platforms) {
    for(var i = 0; i < platforms.length; i++) {
      if(this.x + scl > platforms[i].x && this.x < (platforms[i].x + platforms[i].len) && abs((this.y + scl) - platforms[i].y) < 10) {
        this.plat = i;
        return true;
      }
    }
  }

  this.autoRun = function(platforms) {
    if(this.onPlat && abs((this.x + scl) - ( platforms[this.plat].x + platforms[this.plat].len)) <= 100) {
      this.yaccel = -20;
    }
  }

}
