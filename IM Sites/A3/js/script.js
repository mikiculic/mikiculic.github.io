document.addEventListener("DOMContentLoaded", function() {
// This is a function for random numbers that are used throughout all of the random components when generating the pink circles.
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// Here I have an array of audios, follow by a function that chooses a random one. 
//I chose to do this as it gives different feedback per circle click, which limits 
// how repetive it can be when just hearing one single pop sound for every circle you click.
// This also helps with my design choice of being "satisfying" when clicked.
var audioFiles = [
  "sounds/bubble1.wav",
  "sounds/bubble2.wav",
  "sounds/bubble3.wav"
];
function playRandomAudio() {
  var randomPlay = Math.floor(Math.random() * audioFiles.length);
  var audio = new Audio(audioFiles[randomPlay]);
  audio.play();
}





// The function that will be creating random circles. I ended up 
// using https://www.youtube.com/watch?v=XATr_jdh-44&ab_channel=TheCodingTrain as a reference to assist with this code, as I was 
// not sure how to get randomised sizes throughout the entire page.
function createCircle() {
  var circle = document.createElement("div");
  circle.classList.add("circle");
  var size = getRandomNumber(30, 120);
  var x = getRandomNumber(0, window.innerWidth - size);
  var y = getRandomNumber(0, window.innerHeight - size);
  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.top = y + "px";
  circle.style.left = x + "px";
  circle.addEventListener("click", function () {
    playRandomAudio();
    this.remove();
    checkCurrentCircles();
  });
  return {
    element: circle,
    x: x,
    y: y,
    radius: size / 2,
  };
}
// This function is used to ensure a new set of circles are generated once the page is empty. This is 
// so the user doesn't have to refresh the page if they have clicked all the cirlces, allowing them to continue messing around for as long as they like.
function checkCurrentCircles() {
  if (document.querySelectorAll(".circle").length === 0) {
    generateCircles();
  }
}





// This is a function that is used further down to check if there is any overlap between circles when generated. However, it only 
// works to a certain extent as I could not figure out why some circles still slightly overlap.
// I decided to attempt no overlap as I found it quite annoying finding and seeing other circles within each other as it felt very unnatural to mess with.
function checkOverlap(circle1, circle2) {
  var distance1 = circle1.x - circle2.x;
  var distance2 = circle1.y - circle2.y;
  var distance = Math.sqrt(distance1 * distance1 + distance2 * distance2);
  return distance < circle1.radius + circle2.radius;
}
// This is the actual function that generates the circles, and uses the above function to determine if any circles need to be shifted over to prevent overlap.
function generateCircles() {
  var container = document.getElementById("container");
  var circles = [];
  // I opted to have 75 circles on the page, as it provided a decent length experience without overwhelming the user and making the screen cluttered.
  for (var i = 0; i < 75; i++) {
    var newCircle = createCircle();
    var overlap = circles.some(function (circle) {
      return checkOverlap(newCircle, circle);
    });
    if (!overlap) {
      container.appendChild(newCircle.element);
      circles.push(newCircle);
    }
  }
}
generateCircles();
});





