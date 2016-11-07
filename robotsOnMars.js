// INPUT
// The  first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0,0.
// The remaining input consists of a sequence of robot positions and instructions (two lines per robot). 
// Position = x + space + y + space + orientation
// Instruction = String of the letters L, R and F on one line.
// Max value for any coordinate is 50.
// Instruction strings will be less than 100 characters in length.

// OUTPUT
// For each robot position/instruction in the input, the output should position and orientation of the robot. If a robot falls off the edge of the grid the word "LOST" should be printed after the position and orientation.
//
// Sample Input
// 53
// 11E RFRFRFRF
// 32N FRRFLLFFRRFLL
// 03W LLFFFLFLFL
// Sample Output
// 11E 
// 33NLOST 
// 23S
 
Input = function (incoming) {
	var topRightX, topRightY,
		inputLines = incoming.split('\n'), 
		upperRight = inputLines[0].split(' '),
		topRightX = Number(upperRight[0]),
		topRightY = Number(upperRight[1]),
		positionsAndInstructionsForRobots = inputLines.slice(1),
		lost = 'LOST';
	this.robots = [];
	for (var i = 0; i < positionsAndInstructionsForRobots.length - 1; i = i + 3) {
		if (positionsAndInstructionsForRobots[i] !== '')
			this.robots.push(new Robot(positionsAndInstructionsForRobots[i].trim(), positionsAndInstructionsForRobots[i + 1].trim(), {topRightX: topRightX, topRightY: topRightY, lost: lost}));
	}
}

Input.prototype.go = function (callback) {
	for (var i = 0; i < this.robots.length; i++) {
		//console.log('**************************************************');
		//console.log('robot ', i, ' go!');
		this.robots[i].go();
	}
	callback(this);
}

Robot = function (location, instruction, stats) {
	this.startLocation = location;
	this.positionX = Number(this.startLocation.split(' ')[0]);
	this.positionY = Number(this.startLocation.split(' ')[1]);
	this.direction = this.startLocation.split(' ')[2];
	this.lost = false;
	this.instruction = instruction;
	this.stats = stats;
}

Robot.prototype.turnLeft = function () {
	if (this.lost === true) {
		//console.log('robot lost, not moving');
		return;
	} else {
		switch (this.direction) {
			case 'N':
				this.direction = 'W';
				break;
			case 'W':
				this.direction = 'S';
				break;
			case 'S':
				this.direction = 'E';
				break;
			case 'E':
				this.direction = 'N';
				break;
		}
	}
	//console.log('new location: ', this.printLocation());
}

Robot.prototype.turnRight = function () {
	if (this.lost === true) {
		//console.log('robot lost, not moving');
		return;
	} else {
		switch (this.direction) {
			case 'N':
				this.direction = 'E';
				break;
			case 'E':
				this.direction = 'S';
				break;
			case 'S':
				this.direction = 'W';
				break;
			case 'W':
				this.direction = 'N';
				break;
		}
	}
	//console.log('new location: ', this.printLocation());
}

Robot.prototype.moveForward = function () {
	debugger;
	if (this.lost === true) {
		//console.log('robot lost, not moving');
		return;
	} else 
		switch (this.direction) {
			case 'N':
				if (this.stats.topRightY >= this.positionY + 1) {
					this.positionY += 1;
				}
				else 
					this.lost = true;
				break;
			case 'E':
				if (this.stats.topRightX >= this.positionX + 1)
					this.positionX += 1;
				else 
					this.lost = true;
				break;
			case 'S':
				if (this.positionY - 1 >= 0)
					this.positionY -= 1;
				else 
					this.lost = true;
				break;
			case 'W':
				if (this.positionX - 1 >= 0)
					this.positionX -= 1;
				else 
					this.lost = true;
				break;
		}
}

Robot.prototype.go = function () {
	var i = 0, totalMoves = this.instruction.length;
	for (var i = 0; i <= totalMoves; i++) {
		switch (this.instruction[i]) {
			case 'L':
				this.turnLeft();
				break;
			case 'R':
				this.turnRight();
				break;
			case 'F':
				this.moveForward();
				break;
		}
	}
}

Robot.prototype.printLocation = function () {
	var lostStr;
	if (this.lost === true)
		lostStr = ' ' + this.stats.lost;
	else lostStr = '';
	return (this.positionX + ' ' + this.positionY + ' ' + this.direction + lostStr);
}

toString = function (input) {
	var solution = '';
	for (var i = 0; i < input.robots.length; i++) {
		debugger;
		solution += input.robots[i].printLocation() + '\n';
	}
	console.log('solution: ', solution);
}

var houstonInput = "5 3 \n 1 1 E \n RFRFRFRF \n \n 3 2 N \n FRRFLLFFRRFLL \n \n 0 3 W \n LLFFFLFLFL";
var input = new Input(houstonInput);
input.go(toString);
