const params = new URLSearchParams(window.location.search);
        const appId = params.get("appId");

        const titleEl = document.querySelector(".top h1");
        const descEl = document.getElementById("game-description");
        const imgEl = document.getElementById("game-image");

        if (!appId) {
            titleEl.innerText = "Erreur : aucun jeu sélectionné.";
            descEl.innerHTML = "<p>Veuillez retourner à la page principale et sélectionner un jeu.</p>";
            throw new Error("Missing appId");
        }

        // Requête au serveur Node pour récupérer les infos Steam
        fetch(`http://localhost:3000/game/${appId}`)
            .then(res => res.json())
            .then(data => {
                const game = data[appId]?.data;
                if (!game) throw new Error("Jeu introuvable");

                titleEl.innerText = game.name;
                descEl.innerHTML = game.detailed_description;
                imgEl.src = game.header_image;
                imgEl.alt = game.name;
            })
            .catch(err => {
                console.error("Erreur Steam API:", err);
                titleEl.innerText = "Erreur lors du chargement du jeu.";
                descEl.innerHTML = "<p>Impossible de récupérer les informations du jeu.</p>";
            });