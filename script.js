const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const startButton = document.getElementById("start-btn");
const timeDisplay = document.querySelector(".time");

let products = [
  "https://rangsemart.com.bd/upload/Product/thumbnail_img1730969599.jpeg", // This fruit counts for points
  "https://rangsemart.com.bd/upload/Product/thumbnail_img1725422009.png",
  "https://rangsemart.com.bd/upload/Product/thumbnail_img1733806364.jpg",
  "https://rangsemart.com.bd/upload/Product/thumbnail_img1734936937.jpg",
  "https://rangsemart.com.bd/upload/ProductGallery/1736237911020399.jpg",
];

let score = 0;
let fallingSpeed = 3000; // Initial speed (milliseconds) -> 3 sec
let gameInterval;
let gameTimer;
let gameDuration = 120000; // 120 seconds
let remainingTime = 120; // Track remaining time in seconds
let activeProducts = new Set(); // Track active product positions

timeDisplay.textContent = `Time: ${remainingTime} sec`;

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.style.display ="none";
  score = 0;
  fallingSpeed = 3000; // Reset speed
  resultDisplay.textContent = "";
  scoreDisplay.textContent = `Score: ${score}`;
  remainingTime = 120;
  timeDisplay.textContent = `Time: ${remainingTime} sec`;
  clearInterval(gameInterval);

  gameInterval = setInterval(
    () => createProducts(Math.floor(Math.random() * 3) + 1),
    fallingSpeed
  );

  gameTimer = setInterval(() => {
    remainingTime--;
    timeDisplay.textContent = `Time: ${remainingTime} sec`;
    if (remainingTime <= 0) {
      endGame();
    }
  }, 1000);
}

function createProducts(count) {
  for (let i = 0; i < count; i++) {
    let leftPos;
    do {
      leftPos = Math.floor(Math.random() * (gameArea.offsetWidth - 60));
    } while (isOverlapping(leftPos));

    activeProducts.add(leftPos);

    const product = document.createElement("img");
    product.src = products[Math.floor(Math.random() * products.length)];
    product.classList.add("product");
    product.style.left = `${leftPos}px`;
    product.style.top = "0px";
    gameArea.appendChild(product);

    let productFall = setInterval(() => {
      let productTop = parseInt(product.style.top);
      if (productTop >= gameArea.offsetHeight - 50) {
        clearInterval(productFall);
        gameArea.removeChild(product);
        activeProducts.delete(leftPos);
      } else {
        product.style.top = `${productTop + 5}px`;
      }
    }, 50);

    product.addEventListener("click", () => {
      if (product.src.includes(products[0])) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
      } else {
        endGame("Wrong product clicked! Game Over.");
        return;
      }
      gameArea.removeChild(product);
      clearInterval(productFall);
      activeProducts.delete(leftPos);
      // if (score % 5 === 0) {
      //   speedUp();
      // }
    });
  }
}

function isOverlapping(position) {
  for (let existing of activeProducts) {
    if (Math.abs(existing - position) < 60) return true;
  }
  return false;
}

function speedUp() {
  clearInterval(gameInterval);
  fallingSpeed -= 300;
  if (fallingSpeed < 1000) fallingSpeed = 1000;
  gameInterval = setInterval(
    () => createProducts(Math.floor(Math.random() * 3) + 1),
    fallingSpeed
  );
}

function endGame(message = "Time's up! Your score: " + score) {
  clearInterval(gameInterval);
  clearInterval(gameTimer);
  showPopup(message);
}

function showPopup(message) {
  const popup = document.querySelector(".pop-up");

  // Clear the current message and make the pop-up visible
  // popup.querySelector(".popup-message").textContent = message;
   document.querySelector(".message").textContent = message;
  popup.style.display = "flex";
  

  const restartButton = document.querySelector(".restart-btn");
  const nextPageButton = document.querySelector(".next-btn");

  restartButton.onclick = () => {
    popup.style.display = "none"; // Hide pop-up when restarting
    startGame(); // Restart the game
  };

  nextPageButton.onclick = () => {
    window.location.href = "next_page.html"; // Redirect to next page
  };
}

