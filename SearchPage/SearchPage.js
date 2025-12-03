
const searchInput = document.getElementById("game-search");
const gameList = document.getElementById("game-list");
const loading = document.getElementById("loading");

// Récupérer les infos d'un jeu
async function fetchGame(appId) {
    try {
        const res = await fetch(`http://localhost:3000/game/${appId}`); // server.js
        const data = await res.json();
        return data[appId]?.data || null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Charger les jeux par défaut
async function loadDefaultGames() {
    loading.style.display = "block";
    loading.style.fontFamily = "Arial";
    loading.style.fontWeight = "100";
    loading.style.fontSize = "15px";
    loading.style.textAlign = "center";
    loading.style.color = "#86EFAC";

    gameList.innerHTML = "";

    for (const appId of defaultGames) {
        const info = await fetchGame(appId);
        if (!info) continue;
        
        // Création d’une carte pour chaque jeu 
        const cardLink = document.createElement("a"); // lien cliquable
        cardLink.href = `../GamePage/jeu.html?appId=${appId}`;
        cardLink.className = "jeu-link"; // pour le style
        cardLink.target = "_self"; // ouvre dans le même onglet

        const card = document.createElement("div");
        card.className = "jeu";
        card.innerHTML = `
            <img src="${info.header_image}" alt="${info.name}">
            <h2>${info.name}</h2>
            <p>${info.short_description}</p>
`;

cardLink.appendChild(card); // <-- rend toute la carte cliquable
gameList.appendChild(cardLink);
    }

    loading.style.display = "none";
}

// Rechercher des jeux
async function searchGames(query) {
    loading.style.display = "block";
    gameList.innerHTML = "";

    const addedGames = new Set(); 

    try {
        const res = await fetch(`http://localhost:3000/search/${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!data.items || data.items.length === 0) {
            gameList.style.gridTemplateColumns = "repeat(1, 1fr)";
            gameList.innerHTML = 
            `
    <p style="font-family: arial; font-weight: 100; font-size: 15px; text-align: center; color: #86EFAC;">
        Aucun jeu trouvé.
    </p>
`;

            return;
        }

        for (const item of data.items) {
            if (addedGames.has(item.id)) continue;  

            const info = await fetchGame(item.id);
            if (!info) continue;
             
            // Création de la carte de jeu pour la recherche
            const cardLink = document.createElement("a");
            cardLink.href = `../GamePage/jeu.html?appId=${item.id}`;
            cardLink.className = "jeu-link";
            cardLink.target = "_self";

            const card = document.createElement("div");
            card.className = "jeu";
            card.innerHTML = `
                <img src="${info.header_image || item.large_capsule}" alt="${info.name}">
                <h2>${info.name}</h2>
                <p>${info.short_description}</p>
            `;

            cardLink.appendChild(card);
            gameList.appendChild(cardLink);
            gameList.style.gridTemplateColumns = "repeat(2, 1fr)";

            addedGames.add(item.id);  // <-- Marque ce jeu comme ajouté
        }
    } catch (err) {
        console.error(err);
        gameList.innerHTML = "<p style='text-align:center; color:#86EFAC;'>Erreur lors de la récupération des jeux.</p>";
    }

    loading.style.display = "none";
}

// Événement Enter sur l'input
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) searchGames(query);
    }
});

// Chargement initial
loadDefaultGames();



// Intégration variable
    const params = new URLSearchParams(window.location.search); // Chemin de la page
    const query = params.get("query"); // Récupération de la variable et définition de celle-ci
    const input = document.getElementById("game-search"); // Chemin de la search-bar

    if (query) { // Si il y a une valeur précédemment la saisir dans la search-bar
        input.value = query; // Récupération valeur homePage et saisie de celle-ci

        // Lance la recherche
        searchGames(query);
}

let defaultGames = [];

// Si la barre de recherche est vide → charger 50 jeux dynamiques
if (!searchInput.value) {

    fetch("http://localhost:3000/top-games")
        .then(res => res.json())
        .then(data => {
            defaultGames = data; // Contient 50 appIDs
            loadDefaultGames();  // Tu appelles déjà cette fonction
        })
        .catch(err => console.error("Erreur de chargement des jeux :", err));
}
else{
    defaultGames = [];
}
