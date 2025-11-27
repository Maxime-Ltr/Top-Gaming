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
            if(DescriptionJeu.value && dateJeu.value && Pseudo.value){
                PopUp.style.display = "none";
                
                // Reset valeur saisie précédement
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
