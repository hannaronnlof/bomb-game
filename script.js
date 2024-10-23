// script.js

const gameGrid = document.getElementById("gameGrid");
const resetButton = document.getElementById("resetButton");
const gridSize = 5; // 5x5 grid
let bombPosition;

// Initialize the game
function initGame() {
    gameGrid.innerHTML = ''; // Clear the grid
    bombPosition = Math.floor(Math.random() * gridSize * gridSize); // Set random bomb position

    for (let i = 0; i < gridSize * gridSize; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        // Add event listener to each tile
        tile.addEventListener("click", () => {
            if (i === bombPosition) {
                // Player clicked on the bomb
                tile.classList.add("bomb");
                triggerConfetti(); // Trigger confetti when bomb is clicked
                revealAll();
            } else {
                // Player clicked on a safe tile
                tile.classList.add("safe");
                tile.style.pointerEvents = "none"; // Disable further clicks on this tile
            }
        });

        gameGrid.appendChild(tile);
    }
}

// Reveal all tiles after game over
function revealAll() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile, index) => {
        tile.style.pointerEvents = "none"; // Disable further clicks
        if (index === bombPosition) {
            tile.classList.add("bomb"); // Show where the bomb was
        } else {
            tile.classList.add("safe"); // Show other tiles as safe
        }
    });
}

// Trigger confetti effect
function triggerConfetti() {
    // Launch confetti in intervals to create a bigger effect
    const duration = 2 * 1000; // 2 seconds of confetti
    const end = Date.now() + duration;

    // Create multiple confetti bursts
    const confettiInterval = setInterval(() => {
        if (Date.now() > end) {
            return clearInterval(confettiInterval);
        }

        // Larger spread and more particles
        confetti({
            particleCount: 200,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
    }, 250); // Every 250 milliseconds
}

// Reset the game
resetButton.addEventListener("click", initGame);

// Initialize game on page load
initGame();
