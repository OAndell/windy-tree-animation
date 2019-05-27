
var angle;
var randomness = 0.1; //0.1
var randomnessL = 3.5; //3.5
var wind = -0.5;

var windVector = [1,0];
var windstr =1;
var windangle;

var swayList = []
var windList = []
var windstrList = []


var treeroot;


function setup() {
  createCanvas(1200, 700);
	angle = PI/10;
  translate(600, height);
  treeroot = generateBranch(90, 30, color(255,255,255),PI/2,0,0, null);
  generateWindVectors();
}

function generateWindVectors(){
  var w = 0;
  for (let i = -PI/30; i < PI/30; i=i+0.0001) {
    swayList.push(i);
    windList.push(map(noise(0,w),0,1,0,PI));
    windstrList.push(noise(w));
    w=w+0.01;
  }
}


function draw() {
  translate(600, height);
  background(51);
  animateTree(treeroot,globalsway);
  updateGlobalSway();
  stroke(255);
  strokeWeight(5);
  line(500,-600, 500 + windstr*100*cos(windangle ), -600 - windstr*100*sin(windangle));

}


var globalsway;
var swayIndex = 0;
function updateGlobalSway(){
  if(swayIndex === swayList.length){
    swayList.reverse();
    windList.reverse();
    windstrList.reverse();
    swayIndex=0;
  }
  globalsway = swayList[swayIndex];
  windangle=windList[swayIndex];
  //windangle=atan2(width/2 +mouseX,mouseY);
  windstr=windstrList[swayIndex];
  swayIndex++;
}

function modifyColor(c){
  return color(red(c), green(c), blue(c))
}

function animateTree(node,sway){
  node.draw();
  sway=sway*1.2;
  for (let i = 0; i < node.children.length; i++) {
     var child = node.children[i];
     if(!child.falling && !child.landed){
      if(child.width>=1){
        blowangle = child.rotation+(windangle-child.rotation)*windstr/child.width;
      } 
      else{
        blowangle = child.rotation+(windangle-child.rotation)*windstr;
      }
      child.x1 = node.x2;
      child.y1 = node.y2;
      child.x2 = child.x1 + child.len*cos(blowangle+sway);
      child.y2 = child.y1 + (-child.len*sin(blowangle+sway));

     }
     animateTree(child,sway);
  }
}

function generateBranch(len, width, c ,rotation, x1, y1, parent) {
  len = len + random(-randomnessL, randomnessL);
  var x2 = x1 + (len*cos(rotation));
  var y2 = y1 + (-len*sin(rotation));
  var branch = new Branch(len,width,c,x1,y1,x2,y2,rotation,parent);
  if (len > 20) {
    generateBranch(len * 0.85, width*0.67,  modifyColor(c), rotation + angle + random(-randomness, randomness),x2,y2,branch);
    generateBranch(len * 0.85, width*0.67,  modifyColor(c), rotation - angle + random(-randomness, randomness),x2,y2,branch);
  }else{//leaf
    if(random(1) >  0.7){
      new Leaf(color(255,random(0,50),0),x2,y2,random(3,7),random(4,9),branch);
   }
  }
  return branch;
}
