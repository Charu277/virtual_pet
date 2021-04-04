var dog,sadDog,happyDog;
var foodS,database,foodStock
var feedDog
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");

}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  food=new Food();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  feed=createButton("feed the dog")
  feed.position(500,50)
  feed.mousePressed(feedDog)
  addFood=createButton("addFood")
  addFood.position(600,50);
  addFood.mousePressed(addFoods)
}

function draw() {
  background(46,139,87);
  //if(keyWentDown(UP_ARROW)){
     // writeStock(foodS)
     // dog.addImage(happyDog)
  //}
  food.display();
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  drawSprites();
  textSize(30)
  fill("red")
  text("food remaining-"+foodS,70,100);

  text("press up arrow to feed the dog",500,70);
}

//function to read food Stock
 function readStock(data){
   foodS=data.val();
   food.updateFoodStock(foodS);
 }

 function feedDog(){
   dog.addImage(happyDog);
   food.updateFoodStock(food.getFoodStock()-1);
   database.ref('/').update({
     food:food.getFoodStock(),
     feedTime:hour()
   })
 }
 function addFoods(){
   foodS++
   database.ref('/').update({
     food:foodS
   })

 }

//function to update food stock and last fed time
//function writeStock(x){
//if(x<=0){
  //  x=0;
 // }
 // else{
  //  x=x-1
 // }
 // database.ref('/').update({
 //   Food:x
 // });


//function to add food in stock
