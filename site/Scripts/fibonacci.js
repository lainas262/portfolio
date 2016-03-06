 function fibonacci() {
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
//var arcAnimationIncreament = 0.01*Math.PI;
var finalEndingAngle = 0;
var finalStartingAngle = 0;
//var startingAngle = 0*Math.PI;
//var endingAngle = 2*Math.PI;
//var endingAngleIncrements = 0;
//var startingAngleDicrements = 0;
//var carriedArcSize = 0;
var canvasDiagonalFromCenter = Math.sqrt((Math.pow(centerX,2)+Math.pow(centerY,2)));
//console.log(canvasDiagonalFromCenter);
//console.log("ha");
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;


var time;
var dt;
//var smallDt;
var animate = true;
function Circle(radius, startingAngle, endingAngle, arcAnimationIncreament, positiveDelay, negativeDelay,endingAngleIncrement, startingAngleDecrement){
    this.radius = radius;
    this.startingAngle = startingAngle;
    this.endingAngle = endingAngle;
    this.arcAnimationIncreament = arcAnimationIncreament;
    this.positiveDelay = positiveDelay;
    this.negativeDelay = negativeDelay;
    this.endingAngleIncrement = endingAngleIncrement;
    this.startingAngleDecrement = startingAngleDecrement;
}

Circle.prototype.updateClockwise = function(){
    if(this.positiveDelay > 0){
        this.positiveDelay-=1000
  //      console.log("do i ever come here??");
//        console.log(this);
    }
    else{
        this.endingAngleIncrement = this.startingAngle+this.arcAnimationIncreament; 
        ctx.beginPath();
        ctx.arc(centerX,centerY,this.radius,this.startingAngle,this.endingAngleIncrement);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
  //      console.log("test1");

 //       console.log(this.arcAnimationIncreament);
        this.arcAnimationIncreament += 0.03*Math.PI;
 //       console.log("test1");
        if(this.endingAngleIncrement>this.endingAngle){
         //   animate=false;
         //   this.arcAnimationIncreament = 0;
            this.updateAntiClockwise();
        }
    }
   
 //       console.log(this);
        
    
}

Circle.prototype.updateAntiClockwise = function(){
    if(this.negativeDelay < 0){
        this.negativeDelay+=1000
   //     console.log("do i ever come here??");
    //    console.log(this);
    }
    else{
        this.startingAngleDecrement = this.endingAngle-this.arcAnimationIncreament;
        ctx.beginPath();
        ctx.arc(centerX,centerY,this.radius,this.startingAngleDecrement,this.endingAngle);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.closePath();
        this.arcAnimationIncreament += 0.03*Math.PI;
   //     console.log("test2");
        if(this.startingAngleDecrement<this.startingAngle){
        //    animate=false;
            this.arcAnimationIncreament = 0;
            this.updateClockwise();
        }
    }
}

function setupCircles(){
    var positiveDelay = 0;
    var negativeDelay = 0;
 //   time = now;
    for(var radius=centerX; radius>0; radius-=10){
        positiveDelay+=1000;
        negativeDelay-=1000;
        var circle = new Circle(radius,0.5*Math.PI,2.5*Math.PI,0,positiveDelay,negativeDelay,0,0);
        circles.push(circle);
    }
    
    console.log(circles[0]);
    console.log(circles[1]);
    console.log(circles[2]);
    console.log(circles[4]);
    
    drawAndUpdateCircles();
}

setupCircles();
fibonacci();

function drawAndUpdateCircles(){
    var now = new Date().getTime();
    dt = (now - (time || now));
    time = now;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var negativeDelay = 0;

    for(var i=0; i<circles.length; i++){
        var myCircle = circles[i];
        myCircle.updateAntiClockwise();  
    }
    
    //May need this
/*    var positiveDelay = 0;
    var negativeDelay = 0;
    for(var i=0; i<circles.length; i++){
        positiveDelay+=1000;
        negativeDelay-=1000;
        myCircle.positiveDelay = positiveDelay;
        myCircle.negativeDelay = negativeDelay;
    }
*/
    
    if(animate==true){
    requestAnimationFrame(drawAndUpdateCircles);
    }
}














// trial Methods below not being used

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



