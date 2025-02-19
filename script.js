const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const startButton = document.getElementById("start-btn");
const timeDisplay = document.querySelector(".time");
const startingIn = document.querySelector(".starting-in");
const startingSeconds = 3;

let products = [
  "https://rangsemart.com.bd/upload/Product/thumbnail_img1730969599.jpeg", // This fruit counts for points
  "https://rangsemart.com.bd/upload/Product/thumbnail_img1725422009.png",
  "https://rangsemart.com.bd/upload/Product/thumbnail_img1733806364.jpg",
  "https://rangsemart.com.bd/upload/Product/thumbnail_img1734936937.jpg",
  "https://rangsemart.com.bd/upload/ProductGallery/1736237911020399.jpg",
];

let correctProduct = products[0]; // The correct product for scoring
let score = 0;
let remainingTime = 120;
let gameTimer;
let spawnInterval; // Variable to store the spawn interval ID
let fallSpeed = 10000; // Default falling speed (milliseconds)
timeDisplay.textContent = `Time: ${remainingTime} sec`;
startingIn.textContent = `Starting in ${startingSeconds} sec`;
scoreDisplay.textContent = `Score: ${score}`;

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.disabled = true;
  startButton.style.display = "none";
  startingIn.style.display = "block";
  fallSpeed = 10000; // Reset the fall speed
  score = 0;
  remainingTime = 120;
  scoreDisplay.textContent = `Score: ${score}`;
  timeDisplay.textContent = `Time: ${remainingTime} sec`;

  let countdown = startingSeconds;
  startingIn.textContent = `Starting in ${countdown} sec`;

  let countdownInterval = setInterval(() => {
    countdown--;
    startingIn.textContent = `Starting in ${countdown} sec`;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      startingIn.style.display = "none";
      beginGame();
    }
  }, 1000);
}

function beginGame() {
  gameTimer = setInterval(() => {
    remainingTime--;
    timeDisplay.textContent = `Time: ${remainingTime} sec`;
    if (remainingTime <= 0) {
      clearInterval(gameTimer);
      endGame();
    }
  }, 1000);
  spawnProducts();
}

function spawnProducts() {
  spawnInterval = setInterval(() => {
    createProduct();
    increaseSpeed(); // Increase speed based on the score
  }, 500); // Slower spawn rate initially
}



function createProduct() {
  const product = document.createElement("img");
  product.src = products[Math.floor(Math.random() * products.length)];
  product.classList.add("product");
  product.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 60))}px`;
  gameArea.appendChild(product);
  

  product.animate(
    [{ transform: "translateY(0)" }, { transform: "translateY(100vh)" }],
    { duration: fallSpeed, easing: "linear" } // Use the variable to control speed
  );

  product.addEventListener("click", () => {
    if (product.src === correctProduct) {
      score += 10;
      scoreDisplay.textContent = `Score: ${score}`;
    } else {
      endGame(); // End the game if the wrong product is clicked
    }
    product.remove();
  });

  setTimeout(() => {
    product.remove();
  }, fallSpeed); // Keep the product for the same duration as the fall
}

// Speed up the falling speed based on the score
function increaseSpeed() {
  if (score >= 50 && fallSpeed > 7000) {
    fallSpeed -= 500; // Reduce fallSpeed by 2000ms every 50 points, but don't go below 7000ms
  } else if (score >= 100 && fallSpeed > 5000) {
    fallSpeed -= 500; // Further reduce the speed at higher scores
  } else if (score >= 200 && fallSpeed > 3000) {
    fallSpeed -= 500; // Speed up even more after 200 points
  } else if (score >= 300 && fallSpeed > 2000) {
    fallSpeed -= 500; // Speed up even more after 200 points
  }
}

function endGame() {
  clearInterval(gameTimer); // Clear the game timer
  clearInterval(spawnInterval); // Clear the product spawning interval
  showPopup("Game Over! Your score: " + score);
}

function showPopup(message) {
  const popup = document.querySelector(".pop-up");
  document.querySelector(".message").textContent = message;
  popup.style.display = "flex";

  const restartButton = document.querySelector(".restart-btn");
  const nextPageButton = document.querySelector(".next-btn");

  restartButton.onclick = () => {
    popup.style.display = "none";
    startGame();
  };

  nextPageButton.onclick = () => {
    window.location.href = "next_page.html";
  };
}
