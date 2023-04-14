img="";
checkbox = "";
keyboard= [];


function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400)
}

function start(){
    objectDetection = ml5.objectDetector('cocossd',Modelloaded);
     document.getElementById('status').innerHTML="status : object detecting";
    nam = document.getElementById('data').value;
}
function Modelloaded(){
    console.log('model loaded**');
    checkbox = true;

  
    
}

function gotresults(error,result){
    if(error){
        console.log(error);

    }

    else{
        console.log(result);

        keyboard = result;
    }
}

function draw(){
  
    image(video,0,0,650,450);
    if (checkbox != ""){
        r= random(100);
        g = random(150);
        b = random(95);
        objectDetection.detect(video,gotresults);
        for(i=0;i<keyboard.length;i++){
         document.getElementById("status").innnerHTML="status : object detected";
            fill(r,g,b);
            percent = floor(keyboard[i].confidence * 100);
            whatsup = keyboard[i].label;
            text(whatsup,keyboard[i].x + 10,keyboard[i].y+10);
            console.log(whatsup+" "+percent+"%"); 
            noFill();
            stroke(r,g,b);
            
            rect(keyboard[i].x,keyboard[i].y,keyboard[i].width,keyboard[i].height);
           

            if(keyboard[i].label == nam){
            video.stop();
                document.getElementById("de").innnerHTML = nam+" detected";

            }

            else{
               
                document.getElementById("de").innnerHTML = nam+" not detected";
            }

        }

    }

}