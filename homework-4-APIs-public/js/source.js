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

    try {
    const newsResponse = await fetch(
        `https://api.gamebrain.co/v1/games/${gameID}/news?api-key=${apiKey}`
    );

    console.log("News API Status:", newsResponse.status);

    if (!newsResponse.ok) {
        throw new Error(`News API Error: ${newsResponse.status}`);
    }

    const newsData = await newsResponse.json();

    console.log("News Data:", newsData);

    // Get the first 3 news articles
    const news = (newsData.news || []).slice(0, 3);

    // Find the news cards in HTML
    const newsCards = document.querySelectorAll(".news-card");

    console.log("Number of articles:", news.length);
    console.log("Number of cards:", newsCards.length);

    newsCards.forEach((card, index) => {

    const article = news[index];

    if (article) {

        // Display news title
        card.querySelector("h3").textContent = article.title;

        // Display publication date
        card.querySelector(".news-published").textContent =
            `Published ${article.published}`;

        // Display news image
        const image = card.querySelector("img");

        image.src = article.image;
        image.alt = article.title;

        card.style.display = "";

    } else {
        card.style.display = "none";
    }

});

} catch (error) {
    console.error("Error loading news:", error);
}

try {
    const similarResponse = await fetch(
        `https://api.gamebrain.co/v1/games/${gameID}/similar?api-key=${apiKey}`
    );

    console.log("Similar Games Status:", similarResponse.status);

    if (!similarResponse.ok) {
        throw new Error(`Similar Games API Error: ${similarResponse.status}`);
    }

    const similarData = await similarResponse.json();

    console.log("Similar Games Data:", similarData);

    // Get the first 4 similar games
    const similarGames = (
    Array.isArray(similarData)
        ? similarData
        : similarData.results || similarData.similar_games || []
).slice(0, 4);

// Find the game cards in HTML
    const gameCards = document.querySelectorAll(".game-card");

gameCards.forEach((card, index) => {

    const similarGame = similarGames[index];

    if (similarGame) {

        // Display game name
        card.querySelector("h3").textContent = similarGame.name;

        // Display release year and rating
        const spans = card.querySelectorAll(".game-card-meta span");

        spans[0].textContent = similarGame.year;

        spans[1].textContent =
            formatPercentage(similarGame.rating.mean);

        // Display game image
        const image = card.querySelector("img");

        image.src =
            similarGame.screenshots?.[0] || similarGame.image;

        image.alt = similarGame.name;

        card.style.display = "";

    } else {
        card.style.display = "none";
    }

});

} catch (error) {
    console.error("Error loading similar games:", error);
}

} catch (error) {
    console.error("Error loading game:", error);
}

} // End of load function

// Run the function
load();