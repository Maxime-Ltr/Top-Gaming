// Vote Pop-Up   
    // Affichage Pop Up
        // Définition des variable (permetant l'ouverture et la fermeture du popup)
        const openBtn = document.getElementById("OpenPopUp");
        const closeBtn = document.getElementById("closePopup");
        const popup = document.getElementById("PopUp");
        const voteBtn = document.getElementById("SoumettreVote");
        let timer = localStorage.getItem('time')

        const Pseudo = document.getElementById("PseudoUser")

        //Définition des variable (permetant le reset des catégotie)
        const slider = document.getElementById("Note");
        const Jeu = document.getElementById("VotedGame");
        const DescriptionJeu = document.getElementById("DescriptionGameVoted")
        const dateJeu = document.getElementById("DatePlay")
        const AffichageNote = document.getElementById("NoteUser");

        // Ajout convertion minute -> heure + min
        function formatMinutes(mins) {
            const hours = Math.floor(mins / 60); // Permet l'arrondit à l'entier inférieur
            const minutes = mins % 60; // Permet d'afficher le nombre de minitute restante (retrait des heures)

            if (hours > 0 && minutes > 0) {
                return `${hours}h${minutes}`;
            } else if (hours > 0) {
                return `${hours}h`;
            } else {
                return `${minutes} min`;
            }
        }


        // Quand le bouton est cliqué définir PopUp comme visible
        openBtn.onclick = () => {
            let diftime = 120 - ((new Date().getTime() - parseFloat(timer)) / 60000);
            const formattedTime = formatMinutes(Math.floor(diftime));

            if (diftime < 120) {
                alert(`Vous devez attendre encore ${formattedTime} !`);
            } else {
                PopUp.style.display = "block";   
            }
        };


        // Fermer en cliquant sur la croix
        closeBtn.onclick = () => {
            PopUp.style.display = "none";
        };

        // Fermer en soumettant son vote
        voteBtn.onclick = () => {
            if(Jeu.value && DescriptionJeu.value && dateJeu.value && Pseudo.value){
                PopUp.style.display = "none";
                
                // Reset valeur saisie précédement
                    Jeu.value = ""
                    DescriptionJeu.value = ""
                    dateJeu.value = ""
                    slider.value = 0
                    AffichageNote.textContent = "0 étoile sur 5"

                    localStorage.setItem('time', new Date().getTime())
                    location.reload();
            }
            else{
                alert("Veuillez renseignez toute les réponses au questionnaire")
            }
        }

        // Fermer en cliquant hors de la pop-up
        window.onclick = (event) => {
            if (event.target === popup) {
                PopUp.style.display = "none";
            }
    };

    // Note sur 5 PopUp
        // Modification du texte (selon le slider) 
            slider.addEventListener("input", function () {

                let NoteUser = slider.value / 2; // calcule sur 5

                AffichageNote.textContent = NoteUser + " étoile" + (NoteUser > 1 ? "s" : "") + " sur 5"; // Ajout du s si >1 étoile
});

// Utilisation API pour changer les information. 
    // Définition des "chemin d'accès" permettant de mettre à jour les information
        const DivJeu = document.querySelector(".InformationJeu");
        const GameImage = document.querySelector(".GameImage");
        const TitreJeu = document.querySelector(".NomJeu");
        const GameDescription = document.querySelector(".DescriptionJeu");

    // Défition des vériable permettant le changement de jeu
        let games = [];
        let currentIndex = 0;

    // Implémentation de l'animation de disparition
        function fadeOut() {
            return new Promise(resolve => {
                DivJeu.classList.add("fade-out"); // Ajout de la classe fade-out permettant la mise ne page css
                setTimeout(resolve, 500);
            });
    }

    // Implémentation de l'animation d'apparition
        function fadeIn() {
            DivJeu.classList.remove("fade-out"); // Retrait de la classe fade-out permettant la mise ne page css
            DivJeu.classList.add("fade-in"); // Ajout de la classe fade-in permettant la mise ne page css
            setTimeout(() => DivJeu.classList.remove("fade-in"), 500);
    }

    // Implémentation de l'affichange du jeu
        function displayGame(index) {
            const game = games[index];

            GameImage.src = game.header_image;
            TitreJeu.textContent = game.name;
            GameDescription.innerHTML = `<b><u>Description :</u></b> ${game.short_description}`;
    }

    // Charge les 3 jeux les plus joués
        async function loadGames() { // Fonction asyncrhone (utiliser await)
            try { // Permet de voir les erreurs
                const res = await fetch("http://localhost:3000/topplayed"); // Définit l'URL HTTP et d'attendre que la comunication réseau soit fini
                const topPlayed = await res.json(); // Permet de transformer la réponse HTTP en un objet js.

                // Récupération des information à l'aide de l'API
                for (const game of topPlayed) { // Boucle permetant de mettre à jour la variable selon les jeu les plus jouer
                    const detailRes = await fetch(`http://localhost:3000/game/${game.appid}`); // Récupération et définition de la variable pour obtenir la description du jeu
                    const detailData = await detailRes.json(); // Transformation de la variable en objet js. 
                    const appData = detailData[game.appid].data; // Récupération des donnée brut de l'API afin d'avoir les vrai infos

                    // Récupération et modification des donnée du jeu dans le tableau GAME
                    games.push({
                        name: appData.name,
                        header_image: appData.header_image,
                        short_description: appData.short_description
                    });
                }

                // Permet d'afficher le jeu dans le tableau game ayant l'index 0
                displayGame(0);

                // Changement automatique toutes les 30 sec
                setInterval(async () => { // Exécute une commande tout les 30000 ms
                    await fadeOut(); // Utilisation de la fonction fade-out
                    currentIndex = (currentIndex + 1) % games.length; // Permet de changer de jeu (Ajouter 1 a chaque fois) et réinitialisé la variable lorsque l'on a atteint la fin
                    displayGame(currentIndex); // Affiche le jeu
                    fadeIn(); // Utilisation de la fonction fade-in
                }, 30000); // Atteintre 30000 ms

            } catch (error) {
                console.error("Erreur :", error); // En cas d'erreur écrire "Erreur" dans la console
            }
        }

        loadGames(); // Utilisation de la fonction

// Fonction de recherche
    // Définition variable localisation search bar 
    const input = document.getElementById("game-search");

    // Lorsque la touche enter est presser ouvrir la page SearchPage
    input.addEventListener("keydown", (e) => { // Ajout d'une fonction lorsque une touche est presser dans la search bar
        if (e.key === "Enter") { // Vérification de la touche presser = enter
            const value = encodeURIComponent(input.value); // Définition de la valeur saisie pour récupération SearchPage
            window.location.href = `SearchPage.html?query=${value}`; // Ouverture page et défition de la value
        }
    });
