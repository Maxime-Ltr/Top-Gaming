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

        // Quand le bouton est cliqué définir PopUp comme visible
        openBtn.onclick = () => {
            let diftime = (new Date().getTime() - parseFloat(timer)) / 60000 // parseFloat permet d'arrondir
            if(diftime < 120) {
                alert(`Vous devez attendre encore ${(120 - diftime).toFixed(0)} minutes à attendre !`) // ${} permet d'inclure une variable
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
