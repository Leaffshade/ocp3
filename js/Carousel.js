class Carousel {

    constructor(){
         
        this.slideIndex = 0;
        
        this.dots = document.querySelectorAll('.dot');
        this.slides = document.querySelectorAll(".mySlides");
        this.currentSlide(this.slideIndex);
        this.play();
        this.initEvents(); //Appel de la méthode initEvents
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

        
        this.dots.forEach((dot) => {
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
        if (n > this.slides.length) { // Si le numéro de la diapositive est supérieur au nombre total de diapositives
            this.slideIndex = 1  // if réinitialise le slideIndex à 1, une fois que la dernière diapositive est atteinte.
        }
        if (n < 1) { // Si le numéro de la diapositive est inférieur au nombre total de diapositives
            this.slideIndex = this.slides.length // Boucle: définit slideIndex sur le nombre total de diapositives dans l'instance où l'utilisateur clique sur la flèche gauche lorsque la première diapositive est affichée, de sorte que la dernière diapositive s'affiche ensuite
        }
    
        for (i = 0; i < this.slides.length; i++) { // Masquer chacune des diapositives
            this.slides[i].style.display = "none"; // afficher la diapo à l'index actuel de la diapo, soustraire un pour rendre l'index numérique 0
        }
        for (i = 0; i < this.dots.length; i++) { // Remplace chacun des points par la classe "active" avec ""
            this.dots[i].className = this.dots[i].className.replace(" active", "");
        }
        this.slides[this.slideIndex - 1].style.display = "block"; //Définir la diapositive actuelle pour qu'elle s'affiche en tant qu'élément de bloc
        this.dots[this.slideIndex - 1].className += " active"; // Définit le point respectif de la diapositive actuelle sur la classe "active"
    }

    play() {
       
        this.intervalId = setInterval(() => {
    
            this.slideIndex++;
    
            if (this.slideIndex > this.slides.length) {
                this.slideIndex = 1;
            }
            this.currentSlide(this.slideIndex)
        }, 5000); // Change image every 5 seconds}
    }

    pause() {
        clearInterval(this.intervalId)
    }

}