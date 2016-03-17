/*
 *  Author: Emmanuel Lainas
 *  Exploring the canvas element with a simple animation
 */

//Good reading
//interesting Article: https://www.nczonline.net/blog/2011/05/03/better-javascript-animations-with-requestanimationframe/
//article on gameloops: http://gameprogrammingpatterns.com/game-loop.html

//Global Variables

//circles array to hold circle objects
var circles = new Array();
//geting the canvas html element so that we can draw on it use Javascript 
var canvas = document.getElementById("myCanvas");
//initializing canvas context
var ctx = canvas.getContext("2d");
//Calculate the X and Y center of canvas
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
//calculating canvas diagonal from center using "centerX" and "centerY" 
//to get half the size of the actual canvas diagonal so that we can use
//that value as the radius for the largest circle to be drawn from the center.
//This is beneficial when the canvas is resized as only the amount of circles
//necessary to fit the canvas will be drawn. NOTE: If we want to fill the 
//canvas with as many circles as possible centerX must be used when 
//initializing the array circles. canvasDiagonalFromCenter can be used if we want
//to fill the blank edges of the canvas whith more circles so that there are no
//blank edges but instead arcs of larger circles.
var canvasDiagonalFromCenter = Math.sqrt((Math.pow(centerX,2)+Math.pow(centerY,2)));
//initialize requestAnimationFrame based on browser (no callback function provided yet)
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
//speed input
var inputSpeed = 0.003*Math.PI;  //can be set with limits?? or not?
//speed in this case is essentially the angle to increment each circle at each frame drawn
//var speed = inputSpeed;
//acceleration input;
var inputAcceleration = 0.007*Math.PI; //can be set with limits
//decelerationPoint is the angle size from the end of a circle to start decelerating the speed when drawing clockwise
//the value will also be used to calculate when to start decelerating when drawing the circle counter clockwise
var decelerationPoint =1*Math.PI;//must be   0pi>x>1pi otherwise it will accelerates untill it completes Counter clockwise motion too .. must be half size of drawing arc
//delayIncreaments controls when inner circles are drawn
var delayIncrements = 0;
//Circle objects constructor
function Circle(radius, startingAngle, endingAngle, positiveIncrement, negativeIncrement, delay, speed, acceleration){
    this.radius = radius;
    this.startingAngle = startingAngle;
    this.endingAngle = endingAngle;
    this.positiveIncrement = this.startingAngle+speed;
    this.negativeIncrement = this.endingAngle-speed;
    this.delay = delay;
    this.speed = speed;
    this.acceleration = acceleration;
}
//Circle Animation logic. Start drawing circle clockwise increasing the size by "speed".
//If the drawing increment has reached the end, start drawing the circle by subtracting "speed" from drawing increment. 
Circle.prototype.animateClockwiseCircle = function(){

    if(this.positiveIncrement>this.endingAngle){
        ctx.beginPath();
        ctx.arc(centerX,centerY,this.radius,this.startingAngle,this.negativeIncrement);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'pink';
        ctx.stroke();
        ctx.closePath();
        if(this.negativeIncrement< this.startingAngle+decelerationPoint){
            //decelerate counter clockwise
            this.acceleration=(Math.sqrt(0)-Math.sqrt(this.speed))/(2*(this.endingAngle-decelerationPoint));
            this.negativeIncrement -= this.speed;
            this.speed += this.speed * this.acceleration;
            
            if(this.negativeIncrement<this.startingAngle){
                
                this.speed = inputSpeed;
                this.acceleration = inputAcceleration;
                this.positiveIncrement=this.startingAngle+this.speed;
                this.negativeIncrement=this.endingAngle-this.speed;
            }
            
        }
        else{
            //accelerate counter clockwise
            this.negativeIncrement -= this.speed;
            this.speed += this.speed * this.acceleration;            
        }
    }
    else{
        ctx.beginPath();
        ctx.arc(centerX,centerY,this.radius,this.startingAngle,this.positiveIncrement);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'pink';
        ctx.stroke();
        ctx.closePath();
        
        if(this.positiveIncrement > this.endingAngle-decelerationPoint){
            //decelerate clockwise
            this.acceleration=(Math.sqrt(0)-Math.sqrt(this.speed))/(2*(this.endingAngle-decelerationPoint));
            this.positiveIncrement += this.speed;
            this.speed += this.speed * this.acceleration;
            
            if(this.positiveIncrement>this.endingAngle){
                this.speed = inputSpeed;
                this.acceleration = inputAcceleration;
            }
            
        }
        else{
            //accelerate clockwise
            this.positiveIncrement += this.speed;
            this.speed += this.speed * this.acceleration;            
        }
    }
}
//Fill circles array with as many circles as possible given the centerX
//which will be used as the radius of the largest circle and decreasing 
//it by 10 at each iteration. Additianally the delay value of each circle is 
//increased at each iteration by "delayIncrements" in order to load inner circles with delay.
//NOTE: We can replace centerX in the for loop with canvasDiagonalFromCenter
//to fill the blank edges of the canvas with circle arcs that expand beyond the canvas.
function setupCircles(){

    var delay=0;
    var i = 0;
    for(var radius=canvasDiagonalFromCenter; radius>0; radius-=10){
        var circle = new Circle(radius, 0*Math.PI + i , 2*Math.PI + i ,0,0,delay,inputSpeed,inputAcceleration);
        circles.push(circle);
        delay+=delayIncrements;
  //      i+= 0.3*Math.PI;
    }
    drawAndUpdateCircles();
}
//function to draw circles. Each circle is drawn if its delay value is
//equal to zero. If not, delay is decreased by one. This is were the "delayIncrements"
//variable comes in the picture. The higher the delayIncrements value, the more 
//"requestAnimationFrame" will be called in order for an inner circle to reach a delay==0
//which results in the outer circle getting drawn first 
function drawAndUpdateCircles(){
    //clear canvas at each frame
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    for(var i=0; i<circles.length; i++){
        if(circles[i].delay==0)
            circles[i].animateClockwiseCircle();    
        else
            circles[i].delay-=1;
    }
    requestAnimationFrame(drawAndUpdateCircles);
}
//function call to start setting up circles and then animate
setupCircles();
//function call to the fibonacci function defined below
fibonacci();


$(function($) {
    $(".acceleration").knob({
        change : function (value) {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            value = value/10000;
            inputAcceleration = value * Math.PI;
            circles = [];
            setupCircles();
        //    console.log("change : " + value);
        //    console.log("Input Acceleration:" +inputAcceleration);
        },
        release : function (value) {
            //console.log(this.$.attr('value'));
            console.log("release : " + value);
        },
        cancel : function () {
            console.log("cancel : ", this);
        },
        /*format : function (value) {
            return value + '%';
        },*/
        draw : function () {

        // "tron" case
            if(this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                , pa                   // Previous arc
                , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
                
        }
        
    });
    
});

$(function($) {
    $(".delay").knob({
        change : function (value) {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            delayIncrements = Math.round(value);
            circles = [];
            setupCircles();
      //      var delay = 0;
            
    //        for(var i=0; i<circles.length; i++){
    //            circles[i].delay = delay;
    //            console.log(circles[i].delay);
    //            delay += delayIncrements;
    //        }  
         //   drawAndUpdateCircles();
            
            
       //     console.log("change : " + value);
        //    console.log("Input Acceleration:" +inputAcceleration);
        },
        release : function (value) {
            //console.log(this.$.attr('value'));
            console.log("release : " + value);
        },
        cancel : function () {
            console.log("cancel : ", this);
        },
        /*format : function (value) {
            return value + '%';
        },*/
        draw : function () {

        // "tron" case
            if(this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                , pa                   // Previous arc
                , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
                
        }
        
    });
    
});






/**************************************************************************************************/


//EXTRA STUFF

//A simple fibonacci counter
//The purpose of this is to investigate dynamic loading of HTML nodes,
//in this case paragraph nodes with the value of a fibonacci number as soon as its calculated
function fibonacci() {
    var a = 0;
    var b = 1;
    //create paragraph element
    var para = document.createElement("p");
    //create a text node with the value of variable "a"
    var node = document.createTextNode(a);
    //append the text node as a child to the paragraph element
    para.appendChild(node);
    //get the element with id "fibonacciCounter"
    var element = document.getElementById("fibonacciCounter");
    //append the paragraph element to the element
    element.appendChild(para);
    para = document.createElement("p");
    node = document.createTextNode(b);
    para.appendChild(node);
    element = document.getElementById("fibonacciCounter");
    element.appendChild(para);
    var c = 0;
    
    while (a<1000){
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


