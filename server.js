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
    const steamURL = `https://store.steampowered.com/api/appdetails?appids=${appId}&l=french`;

    try {
        const response = await fetch(steamURL);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des données Steam." });
    }
});

// Route pour rechercher des jeux
app.get("/search/:query", async (req, res) => {
    const query = req.params.query;
    const steamSearchURL = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&l=french&cc=FR`;

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