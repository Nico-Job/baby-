harry = "";
object = [];
status="";
function preload() {
harry = loadSound("harry_potter.mp3");
}
function setup(){    
canvas = createCanvas(600, 400);
canvas.center();
video = createCapture(VIDEO);
video.size(600,400);
video.hide();
objectdetector=ml5.objectDetector("cocossd",Modelloaded);
document.getElementById("status").innerHTML = "status: Detecting objects";
}
function Modelloaded(){
    console.log("Modelloaded");
    status = true;
    
}
function gotresults(error, results){
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
}
function draw(){
image(video,0,0,600,400);
if(status != "")
{
objectdetector.detect(video, gotresults);
for(i=0 ; i<object.length; i++)
{
document.getElementById("status").innerHTML="status : objects detected";
fill("red");
percent= floor(object[i].confidence * 100);
text(object[i].label + " " + percent + "%",object[i].x+15, object[i].y+15);
noFill();
stroke("blue");
rect(object[i].x, object[i].y, object[i].width-20, object[i].height);

if (object[i].label == "person")
{
    document.getElementById("status").innerHTML= "status : baby detected";
    console.log("stop please");
    harry.stop();
}
else
{
    document.getElementById("status").innerHTML= "status : baby not detected";
    console.log("keep going");
    harry.play();
}

}
if (object.length < 0)
{
    document.getElementById("status").innerHTML= "status : baby not detected";
    console.log("keep going");
    harry.play();  
}
}
}
