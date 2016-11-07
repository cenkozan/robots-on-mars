INPUT
The  first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0,0.
The remaining input consists of a sequence of robot positions and instructions (two lines per robot). 
Position = x + space + y + space + orientation
Instruction = String of the letters L, R and F on one line.
Max value for any coordinate is 50.
Instruction strings will be less than 100 characters in length.  


OUTPUT
For each robot position/instruction in the input, the output should position and orientation of the robot. If a robot falls off the edge of the grid the word "LOST" should be printed after the position and orientation.
Sample Input
// 53
// 11E RFRFRFRF
// 32N FRRFLLFFRRFLL
// 03W LLFFFLFLFL
// Sample Output
// 11E 
// 33NLOST 
// 23S
