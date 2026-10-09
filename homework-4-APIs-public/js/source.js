// *********************************************************************
// Homework 4 Public APIs
// *********************************************************************

function formatYearFromStr(dateString) {
  return dateString.split('-')[0];
}

function formatPercentage(value) {
  return `${(value * 100).toFixed(2)}%`;
}

localStorage.setItem("game_id", "11710");
localStorage.setItem("api_key", "87180370e9d54234b1ec561731155947");



async function load(){
    
    // add as many more as needed
    let gameID = localStorage.getItem("game_id");
    let apiKey = localStorage.getItem("api_key");
    
    // **************** Write you code below **************** 
try {
    const response = await fetch(
        `https://api.gamebrain.co/v1/games/${gameID}?api-key=${apiKey}`
    );

    console.log("API Status:", response.status);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const game = await response.json();

    console.log("Game Data:", game);
    console.log("Game Image:", game.image);

    document.querySelector("#game-name").textContent = game.name;

    document.querySelector(".game-image img").src = game.image;

    document.querySelector(".game-meta").textContent = `${game.developer} • ${formatYearFromStr(game.release_date)}`;

    document.querySelector(".game-genre").textContent = game.genre;
    
} catch (error) {
    console.error("Error loading game:", error);
}
}
load();


   