// Vote Pop-Up   
    // Affichage Pop Up
        // Définition des variable (permetant l'ouverture et la fermeture du popup)
        const openBtn = document.getElementById("OpenPopUp");
        const closeBtn = document.getElementById("closePopup");
        const popup = document.getElementById("PopUp");
        const voteBtn = document.getElementById("SoumettreVote");

        //Définition des variable (permetant le reset des catégotie)
        const Slider = document.getElementById("Note");
        const Jeu = document.getElementById("VotedGame");
        const DescriptionJeu = document.getElementById("DescriptionGameVoted")
        const dateJeu = document.getElementById("DatePlay")

        // Quand le bouton est cliqué définir PopUp comme visible
        openBtn.onclick = () => {
            PopUp.style.display = "block";
            Jeu.value = ""
            DescriptionJeu.value = ""
            dateJeu.value = ""
            Slider.value = 0
        };

        // Fermer en cliquant sur la croix
        closeBtn.onclick = () => {
            PopUp.style.display = "none";
        };

        // Fermer en soumettant son vote
        voteBtn.onclick = () => {
            PopUp.style.display = "none";
        }

        // Fermer en cliquant hors de la pop-up
        window.onclick = (event) => {
            if (event.target === popup) {
                PopUp.style.display = "none";
            }
    };

    // Note sur 5 PopUp
        // Définition des variable
            const slider = document.getElementById("Note"); // Définition variable (mise en place chemin d'accès)
            const AffichageNote = document.getElementById("NoteUser"); // Définition variable (mise en place chemin d'accès)

        // Modification du texte (selon le slider) 
            slider.addEventListener("input", function () {

                let NoteUser = slider.value / 2; // calcule sur 5

                AffichageNote.textContent = NoteUser + " étoile" + (NoteUser > 1 ? "s" : "") + " sur 5"; // Ajout du s si >1 étoile
            });
