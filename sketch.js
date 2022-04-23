const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var bg, food, rabbit;
var bunny;
var button;
var blink,eat,sad;
var airSound,eatingSound,ropecutSound,bgSound;
var balloon;


function preload(){
  bg=loadImage("background.png");
  rabbit=loadImage("Rabbit-01.png");
  food = loadImage("melon.png");
  balloon = loadImage("balloon.png")
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  
  airSound= loadSound("air.wav");
  eatingSound = loadSound("eating_sound.mp3");
  ropecutSound=loadSound("rope_cut.mp3");
  bgSound= loadSound("sound1.mp3");

  blink.playing=true;
  eat.playing=true;
  eat.looping = false;
  sad.looping =false;

}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  blink.frameDelay=20
  sad.frameDelay=20
  eat.frameDelay=30
  bunny=createSprite(250,630,100,100)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("sad",sad)
  bunny.addAnimation("eat",eat)
  bunny.scale=0.2

  button=createImg("cut_btn.png")
  button.position(220,40)
  button.size(50,50)
  button.mouseClicked(drop)
  ground = new Ground(200,710,600,30);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg,width/2,height/2,width,height)

  rope.show();
  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,75,75);
  }
  
  Engine.update(engine);
  ground.show();
  
  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eat")
  }

  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("sad")
    //console.log("bunnysad")
  }
 
   drawSprites()
}

function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con=null

}
function collide(body,sprite){
  if(body != null){

    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<80){
      World.remove(world,fruit)
      
      fruit=null
      return true
    }
    else{
      return false
    }
  }

}