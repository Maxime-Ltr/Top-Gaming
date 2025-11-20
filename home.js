// Vote Pop-Up   
    // Affichage Pop Up
        // Définition des variable (permetant l'ouverture et la fermeture du popup)
        const openBtn = document.getElementById("OpenPopUp");
        const closeBtn = document.getElementById("closePopup");
        const popup = document.getElementById("PopUp");
        const voteBtn = document.getElementById("SoumettreVote");

        // Quand le bouton est cliqué définir PopUp comme visible
        openBtn.onclick = () => {
            PopUp.style.display = "block";
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