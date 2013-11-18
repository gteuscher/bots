
//FightCode can only understand your robot
//if its class is called Robot
var Robot = function(robot) {

};

var enemyLoc = {
  enemy : {
    x:0,
    y:0,
    relPos:''
  },
  clone : {
    x:0,
  	y:0,
  	relPos:''
  }
};

Robot.prototype.onIdle = function(ev) {
    var robot = ev.robot;
  	robot.clone();
    if(enemyLoc.enemy.relPos == 'left') {
      robot.turnLeft(25);
    } else {
      robot.turnRight(25);
    }
  	robot.move(30);

};

Robot.prototype.onScannedRobot = function(ev) {
    var robot = ev.robot;
    var scanned = ev.scannedRobot;
    if(scanned.id !== robot.parentId && scanned.parentId !== robot.id) {
      if (scanned.parentID == null) {
        enemyLoc.enemy.x = scanned.position.x;
        enemyLoc.enemy.y = scanned.position.y;
      } 
      if (enemyLoc.enemy.x > robot.position.x) {
        enemyLoc.enemy.relPos = 'right';
      } else if (enemyLoc.enemy.x > robot.position.x) {
				enemyLoc.enemy.relPos = 'left';
			} else if (enemyLoc.enemy.x == robot.position.x) {
				if(enemyLoc.enemy.y < robot.position.y) {
					robot.turn(180);
				}
				robot.ahead(100);
			}
		}
      robot.fire();
      if(enemyLoc.enemy.relPos == 'left') {
      	robot.turnGunRight(25);
      } else { 
        robot.turnGunLeft(25);
      }
};

Robot.prototype.onHitByBullet = function(ev) {
    var robot = ev.robot;
    robot.disappear();
  	robot.ahead(100);
};

Robot.prototype.onWallCollision = function(ev) {
  robot.back(100);
};
