class Carousel {

    constructor(){
        this.initEvents(); //Appel de la méthode initEvents 
        this.slideIndex = 0;
        this.currentSlide(this.slideIndex);
        this.play();
    }

    /**
     * Initialisation des évnements qui permettent de naviguer dans le slider
     */
    initEvents(){
        document.getElementById("startCycle").addEventListener("click", () => this.play())
        document.getElementById("stopCycle").addEventListener("click", () => this.pause())

        //** $("mySlides fade").fadIn(600); **//

        document.querySelector('.next').addEventListener('click', () => this.plusSlides(1))
        document.querySelector('.prev').addEventListener('click', () => this.plusSlides(-1))

        // Utilisation d'une fonction flechée pour la conservation du contexte (this)
        // Si utilisation du mot clé function, on écrase le contexte de la classe
        $(document).keyup((touche) => { // on écoute l'évènement keyup()

            var appui = touche.which || touche.keyCode; // le code est compatible tous navigateurs grâce à ces deux propriétés

            /*** Code touches clavier
            KEY_LEFT	= 37;
            KEY_RIGHT	= 39;
            KEY_SPACE	= 32; 
            KEY_ENTER	= 13;
            ***/
            if (appui == 39) { // si le code de la touche est égal à 37 (gauche)
                this.plusSlides(1)
            } else if (appui == 37) { // si le code de la touche est égal à 39 (droite)
               this.plusSlides(-1)
            } else if (appui == 32) { // si le code de la touche est égal à 32 (espace)
                this.pause()
            } else if (appui == 13) { // si le code de la touche est égal à 13 (entrer)
               this.play()
            }

        });

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index)
                this.currentSlide(index)
            });
        })
    }


    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    
    // Commande des images 
    currentSlide(n) { // Afficher la diapositive actuelle
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        var i; // Selectionne tout les éléments avec la class mySlides
        var slides = document.getElementsByClassName("mySlides"); // Toutes les diapositives du document 
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) { // Si le numéro de la diapositive est supérieur au nombre total de diapositives
            this.slideIndex = 1  // if réinitialise le slideIndex à 1, une fois que la dernière diapositive est atteinte.
        }
        if (n < 1) { // Si le numéro de la diapositive est inférieur au nombre total de diapositives
            this.slideIndex = slides.length // Boucle: définit slideIndex sur le nombre total de diapositives dans l'instance où l'utilisateur clique sur la flèche gauche lorsque la première diapositive est affichée, de sorte que la dernière diapositive s'affiche ensuite
        }
    
        for (i = 0; i < slides.length; i++) { // Masquer chacune des diapositives
            slides[i].style.display = "none"; // afficher la diapo à l'index actuel de la diapo, soustraire un pour rendre l'index numérique 0
        }
        for (i = 0; i < dots.length; i++) { // Remplace chacun des points par la classe "active" avec ""
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block"; //Définir la diapositive actuelle pour qu'elle s'affiche en tant qu'élément de bloc
        dots[this.slideIndex - 1].className += " active"; // Définit le point respectif de la diapositive actuelle sur la classe "active"
    }

    play() {
       
        this.intervalId = setInterval(() => {
            var slides = document.getElementsByClassName("mySlides");
    
            this.slideIndex++;
    
            if (this.slideIndex > slides.length) {
                this.slideIndex = 1;
            }
            this.currentSlide(this.slideIndex)
        }, 5000); // Change image every 5 seconds}
    }

    pause() {
        clearInterval(this.intervalId)
    }

}