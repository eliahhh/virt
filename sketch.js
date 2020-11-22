var dog, happydog, database, foods, foodstock, fedTime, lastFed, seed;

function preload()
{
  dog = loadImage("images/dogImg.png");
  hdog = loadImage("images/dogImg1.png");
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();

  
  
  dog1 = createSprite(350,305,10,10);
  dog1.addImage(dog);
  dog1.scale = 0.15;

  foodstock = database.ref('food');
  foodstock.on("value", readStock);
  
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  

  background("white");
  foodObj.display();
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }
  else if(lastFed==0){ 
    text("Last Feed : 12 AM",350,30);
 }
  else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30);
 }


  drawSprites();
  
  //add styles here

}


//function to read food Stock 
function readStock(data){ 
  foods=data.val(); 
  foodObj.updateFoodStock(foods); 
} 
//function to update food stock and last fed time 
function feedDog(){
   dog.addImage(happyDog); 
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
       Food:foodObj.getFoodStock(), 
       FeedTime:hour() 
      }) 
    } 
    //function to add food in stock 
    function addFoods(){
       foods++; database.ref('/').update({
          Food:foods
        }) 
      }