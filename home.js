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
        const container = document.querySelector(".InformationJeu");
        const imageEl = document.querySelector(".GameImage");
        const titleEl = document.querySelector(".NomJeu");
        const descEl = document.querySelector(".DescriptionJeu");

    // Défition des vériable permettant le changement de jeu
        let games = [];
        let currentIndex = 0;

    // Implémentation de l'animation de disparition
        function fadeOut() {
            return new Promise(resolve => {
                container.classList.add("fade-out"); // Ajout de la classe fade-out permettant la mise ne page css
                setTimeout(resolve, 500);
            });
    }

    // Implémentation de l'animation d'apparition
        function fadeIn() {
            container.classList.remove("fade-out"); // Retrait de la classe fade-out permettant la mise ne page css
            container.classList.add("fade-in"); // Ajout de la classe fade-in permettant la mise ne page css
            setTimeout(() => container.classList.remove("fade-in"), 500);
    }

    // Implémentation de l'affichange du jeu
        function displayGame(index) {
            const game = games[index];

            imageEl.src = game.header_image;
            titleEl.textContent = game.name;
            descEl.innerHTML = `<b><u>Description :</u></b> ${game.short_description}`;
    }

    // Charge les 3 jeux les plus joués
        async function loadGames() {
            try {
                const res = await fetch("http://localhost:3000/topplayed");
                const topPlayed = await res.json(); 

                // Récupération des information à l'aide de l'API
                for (const game of topPlayed) {
                    const detailRes = await fetch(`http://localhost:3000/game/${game.appid}`);
                    const detailData = await detailRes.json();
                    const appData = detailData[game.appid].data;

                    games.push({
                        name: appData.name,
                        header_image: appData.header_image,
                        short_description: appData.short_description
                    });
                }

                displayGame(0);

                // Changement automatique toutes les 30 sec
                setInterval(async () => {
                    await fadeOut();
                    currentIndex = (currentIndex + 1) % games.length;
                    displayGame(currentIndex);
                    fadeIn();
                }, 30000);

            } catch (error) {
                console.error("Erreur :", error);
            }
        }

        loadGames();
