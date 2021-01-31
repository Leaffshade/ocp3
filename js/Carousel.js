class Carousel {

    constructor(){
        this.initEvents();
        this.slideIndex = 0;
        this.currentSlide(this.slideIndex);
        this.play();
    }

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
    
    // Thumbnail image controls
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            this.slideIndex = 1
        }
        if (n < 1) {
            this.slideIndex = slides.length
        }
    
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block";
        dots[this.slideIndex - 1].className += " active";
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