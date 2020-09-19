var pc
var ground
var ground1
var pcImg           
var obs_img
var obstacles=[]
var powers=[]
var PlrName
var scored='score'

var button,input
var timer=0
var GameState=3
var score=2
var timer1 =0
var database
var futureName

function preload(){

  ground=loadImage("ground.jpg");
  
  pcImg=loadImage("a.png");
  
  mask_img=loadImage("mask.jpg");

  sneeze_img=loadImage("sneezing.png")

  corona_img=loadImage("corona.jpg")


}
function setup(){


  
  createCanvas(windowWidth,windowHeight)
   ground1= createSprite(250,-500,800,1500)
 
   ground1.scale=1
  
   database= firebase.database()


  pc=createSprite(200,-1)
  

  pc.scale=0.1

  
  
  
    button=createButton("play")
    button.position(500,350)
  
  input=createInput("your Name")
  input.position(500,300)
 
  
   


  

}

function draw(){
  
  background("cyan");
// rectMode(CENTER)
 // imageMode(CENTER)


 
 
button.mousePressed(()=>{

GameState=0


button.hide()
input.hide()
PlrName=input.value()
    
})


 if(GameState!==3){
 if(pc.x>500)
{pc.x=500

 }

 if(pc.x<40){

  pc.x=40
 }



  
  pc.setVelocity(0,-6)

  if(GameState!==4){
  if(frameCount%120===0){

    score=score+1
    obstacles.push(createSprite(pc.x,pc.y-500,50,50))



  }
} 

  if(frameCount%500===0){

    powers.push(createSprite(random(50,500),pc.y-500,50,50))




  }

  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
    timer1--;


  }

  for (var index = 0; index < powers.length; index++) {

    powers[index].addImage(mask_img)
    powers[index].scale=0.05
    

    if(  powers[index].isTouching(pc)){//console.log("powers")
  

    powers[index].destroy()

    GameState=1
 
    timer=timer+10


   
   

   

  }

  
  
  //var timeIt
  //setInterval(timeIt, 1000);
//console.log(timeIt)

  }  

  if(GameState===1){
  if(timer===0){

    GameState=0


  }
}
  
  //console.log(timer)
  if(frameCount%120===0){
  for (var index = 0; index < obstacles.length; index++) {
   
    if(frameCount%120===0){
    var rand = Math.round(random(1,2));
    }

   
    switch(rand){

      case 1:

        obstacles[index].addImage(corona_img)
  
        break;
      case 2:
    
           obstacles[index].addImage(sneeze_img)

           break;
           
           default : break;
    

  }


  if(obstacles[index].y>camera.y+500){
    //console.log("destroyed")  
    obstacles[index].destroy()

    }


 
   
    obstacles[index].scale=0.09

  }
  
    



   // console.log(obstacles[index].lifetime)
  

  
  }
 
  for (var index = 0; index < obstacles.length; index++) {
  if(GameState===0){
    if(obstacles[index].isTouching(pc)){

      database.ref(''+PlrName).update({
 
        score:""+score        
        
    
        })
    
      GameState=4
      pc.destroy();
      obstacles[index].destroy();

    



    }

  }
}

//console.log(GameState)


//ground1.depth=
 ground1.addImage(ground)
pc.addImage(pcImg)

if(keyDown(RIGHT_ARROW))
pc.x=pc.x+10

if(keyDown(LEFT_ARROW))
pc.x=pc.x-10






 //console.log(camera.position.y) 
 if(pc.y<ground1.y-25&&pc.y<ground1.y-10)//pc.y<ground.y-20 )
 
 {


  
//console.log("chk")
  ground1.y=pc.y-1000
  

 }


  //camera.position.x=pc.x
  camera.position.y=pc.y

  
  
 




 

  pc.setVelocity(0,-score)


 

  drawSprites()

  

    database.ref(PlrName).on("value",function(data){
     
      futureName = data.val();
      

      

   })


   console.log(futureName)
  
   

  
  
  
  textSize(100)
  fill("red")
  text("check score in console",300,camera.position.y)

  textSize(25)
  fill("cyan")
  text( "your score aginst covid is "+score ,100,pc.y-300)


 
  if(GameState===1){



  fill("blue")
  text("power up time"+timer,pc.x,pc.y-100)
  textSize(25)


    if(frameCount%50===0){
      
      pc.visible=false


  }
  else{

     pc.visible=true
    }

    
  }else{


    pc.visible=true


  }

}

if(GameState===3){

  textSize(50)
  text("Covid Warriors🎮",500,50)
  textSize(100)
  fill("red")
  text("check score in console",500,700)



} 

}
