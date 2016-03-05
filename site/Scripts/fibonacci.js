/* function fibonacci() {
    var a = 1;
    console.log(a);
    var b = 1;
    console.log(b);
    
    var para = document.createElement("p");
    var node = document.createTextNode(a);    
    para.appendChild(node);
    var element = document.getElementById("fibonacciCounter");
    element.appendChild(para);
    
    para = document.createElement("p");
    node = document.createTextNode(b);
    para.appendChild(node);
    
    element = document.getElementById("fibonacciCounter");
    element.appendChild(para);
    
    var c = 0;
    while (a<100000000000){
        c = a+b;
        
        para = document.createElement("p");
        node = document.createTextNode(c);
        para.appendChild(node);
    
        element = document.getElementById("fibonacciCounter");
        element.appendChild(para);
        
        a=b;
        b = c;
    }
}

*/
function fibonacci2() {
    var a = 1;
    var b = 1;
    var c = 0;
    while (a<100000000000){
        c = a+b;    
        a=b;
        b = c;
    }
}

//above not needed

//global vars

var circles = new Array();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var arcAnimationIncreament = 0.01*Math.PI;
var finalEndingAngle = 0;
var finalStartingAngle = 0;
//var startingAngle = 0*Math.PI;
//var endingAngle = 2*Math.PI;
//var endingAngleIncrements = 0;
//var startingAngleDicrements = 0;
//var carriedArcSize = 0;
var canvasDiagonalFromCenter = Math.sqrt((Math.pow(centerX,2)+Math.pow(centerY,2)));
console.log(canvasDiagonalFromCenter);
console.log("ha");
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;


var time;
var dt;
var smallDt;
var animate = true;
function Circle(radius, startingAngle, endingAngle, arcAnimationIncreament){
    this.radius = radius;
    this.startingAngle = startingAngle;
    this.endingAngle = endingAngle;
    this.arcAnimationIncreament = arcAnimationIncreament;
}

Circle.prototype.updateClockwise = function(){
    var endingAngleIncreaments = this.startingAngle+this.arcAnimationIncreament; 
    ctx.beginPath();
    ctx.arc(centerX,centerY,this.radius,this.startingAngle,endingAngleIncreaments);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
    this.arcAnimationIncreament += (dt/1000)*Math.PI;
    console.log(this.arcAnimationIncreament);
    console.log("test1");
     if(endingAngleIncreaments>this.endingAngle){
        animate=false;
    }
}

Circle.prototype.updateAntiClockwise = function(){
    var startingAngleDicrements = this.endingAngle-this.arcAnimationIncreament;
    ctx.beginPath();
    ctx.arc(centerX,centerY,this.radius,startingAngleDicrements,this.endingAngle);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();
    this.arcAnimationIncreament += (dt/1000)*Math.PI;
    console.log("test2");
    if(startingAngleDicrements<this.startingAngle){
        animate=false;
    }
}

function setupCircles(){
    for(var radius=canvasDiagonalFromCenter; radius>0; radius-=10){
        
        var circle = new Circle(radius,0.5*Math.PI,2.5*Math.PI,0);
        circles.push(circle);
    }
    drawAndUpdateCircles();
}

setupCircles();

var bigDt=0;
function drawAndUpdateCircles(){
    var now = new Date().getTime();
    dt = now - (time || now);
    time = now;
    bigDt+=dt;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    for(var i=0; i<circles.length-1; i++){
        var myCircle = circles[i];
   //     console.log(myCircle);
        myCircle.updateClockwise();
        console.log("boooo");
        console.log(myCircle.arcAnimationIncreament);
        var temp = myCircle.arcAnimationIncreament
        console.log(temp);
      var  myCircle2 = circles[i+1];
        myCircle2.arcAnimationIncreament = temp;
        console.log(myCircle2);
         myCircle.updateClockwise();
    }
    if(animate==true){
    requestAnimationFrame(drawAndUpdateCircles);
    }
}
















function drawClockwiseCircle(){
    var now = new Date().getTime(),
    dt = now - (time || now);
    time = now;
    ctx.clearRect(0,0,1300,1000);
    finalEndingAngle = endingAngle;
    endingAngleIncreaments = startingAngle+arcAnimationIncreament;
        
    ctx.beginPath();
    ctx.arc(centerX,centerY,10,startingAngle,endingAngleIncreaments);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(centerX,centerY,30,startingAngle,endingAngleIncreaments);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();

    arcAnimationIncreament += (dt/500)*Math.PI;
    console.log("test1");
    if(endingAngleIncreaments<finalEndingAngle){
        requestAnimationFrame(drawClockwiseCircle);
    }
}

function drawCounterClockwiseCircle(){
    var now = new Date().getTime(),
    dt = now - (time || now);
    time = now;
    ctx.clearRect(0,0,1300,1000);
    finalStartingAngle = startingAngle;
    startingAngleDicrements = endingAngle-arcAnimationIncreament;
    console.log(startingAngleDicrements);
    
    ctx.beginPath();
    ctx.arc(centerX,centerY,20,startingAngleDicrements,endingAngle);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.arc(centerX,centerY,400,startingAngleDicrements,endingAngle);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();
    
    arcAnimationIncreament += (dt/500)*Math.PI;
    console.log("test1");
    if(startingAngleDicrements>finalStartingAngle){
        requestAnimationFrame(drawCounterClockwiseCircle);
    }
}


//drawClockwiseCircle();
//drawCounterClockwiseCircle();

//fibonacci();
//drawSpiral(2);
//drawSpiral(4);
//drawSpiral(6);


