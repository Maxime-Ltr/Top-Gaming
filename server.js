// server.js
const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch@2
const cors = require("cors");

const app = express();
const PORT = 3000;

// Autoriser le frontend à accéder au serveur
app.use(cors());

// Route pour récupérer les infos d'un jeu Steam
app.get("/game/:appId", async (req, res) => {
    const appId = req.params.appId;
    const steamURL = `https://store.steampowered.com/api/appdetails?appids=${appId}&l=french`; // STEAM API

    try {
        const response = await fetch(steamURL);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des données Steam." });
    }
});

// Route de l'API pour ouverture du steam shop
app.get("/search/:query", async (req, res) => {
    const query = req.params.query;
    const steamSearchURL = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&l=french&cc=FR`; // STEAM API

    try {
        const response = await fetch(steamSearchURL);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la recherche Steam." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Route de l'API top 3 jeu
app.get("/topplayed", async (req, res) => {
    const url = "https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/";

    try {
        const response = await fetch(url);
        const json = await response.json();

        // API peut renvoyer "ranks" ou "games", on gère les deux
        const list = json.response.ranks || json.response.games || [];

        if (!Array.isArray(list) || list.length === 0) {
            return res.status(500).json({ error: "Aucun jeu trouvé dans l’API Steam." });
        }

        // On prend les 3 premiers
        const top3 = list.slice(0, 3);

        res.json(top3);

    } catch (error) {
        console.error("Erreur API topplayed :", error);
        res.status(500).json({ error: "Impossible de récupérer les jeux les plus joués." });
    }
});

