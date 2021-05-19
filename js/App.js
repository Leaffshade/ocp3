class App {
    constructor(){
        this.carousel = new Carousel(); // On crée un objet carousel pour afficher et gérer le slider du haut
        this.reservation = new Reservation(); // On crée un objet reservation qui gère l'affichage du recap de la réservation
        this.reservation.recapReservation(); // On appelle la méthode recapReservation de l'objet reservation
        this.carte = new Carte(this.reservation); // L'objet carte que l'on instancie pour afficher la map

        /**
         * Logique de composant graphique: Chaque objet représente un élément du site
         */
    }
}