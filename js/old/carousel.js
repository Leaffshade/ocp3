var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls




let intervalId
// Automatic SlideShow

play()

document.getElementById("startCycle").addEventListener("click", play)
document.getElementById("stopCycle").addEventListener("click", pause)

//** $("mySlides fade").fadIn(600); **//

$(document).keyup(function (touche) { // on écoute l'évènement keyup()

    var appui = touche.which || touche.keyCode; // le code est compatible tous navigateurs grâce à ces deux propriétés

    if (appui == 39) { // si le code de la touche est égal à 37 (gauche)
        plusSlides(1)
    } else if (appui == 37) { // si le code de la touche est égal à 39 (droite)
        plusSlides(-1)
    } else if (appui == 32) { // si le code de la touche est égal à 32 (espace)
        pause()
    } else if (appui == 13) { // si le code de la touche est égal à 13 (entrer)
        play()
    }

});

const dots = document.querySelectorAll('.dot');
dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
        const index = parseInt(dot.dataset.index)
        currentSlide(index)
    });
})

/*** Code touches clavier
KEY_LEFT	= 37;
KEY_RIGHT	= 39;
KEY_SPACE	= 32; 
KEY_ENTER	= 13;
***/
