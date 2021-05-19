class Carte {

    constructor(reservation){
        this.reservation = reservation
        this.initCarte();
    }

    initCarte(){ /** Methode (nom d'une fonction dans une classe) **/
        /*** map ***/
        this.map = L.map('map').setView( [45.757284, 4.841696], 6); /***latitude, longitude, zoom de la map ***/
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', /***affichage calque map***/ {
            maxZoom: 20
        }).addTo(this.map);


        var request = new XMLHttpRequest(); /*** Crée un objet ***/
        this.markers = L.markerClusterGroup(); /** Ajout de markers **/
        this.map.addLayer(this.markers); /** le calque est regroupé dans un bloc de données vide. **/
        var self = this; /** This sera une fonction **/
    
        request.onreadystatechange = function() { /** Fonction à exécuter chaque fois que l'état de l'objet XMLRequest change **/
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { /**Lorsque la propriété readyState vaut 4 et que la propriété status est 200, la réponse est prête **/
                var response = JSON.parse(this.responseText); /**La propriété responseText renvoie la réponse du serveur **/

                response.forEach(element => { /** contient la fonction qui va traiter la réponse du serveur **/
                    const marker = L.marker([element.position.lat, element.position.lng]);
                    marker.on('click', () => {
                        self.onClickMarker(element) /** écoute l'événement */
                    })
                    self.markers.addLayer(marker);
                });
            }
        };
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=c8523e3b66e877900322ed01fb74e1f4211b80b2");
        request.send();     
    }

    onClickMarker(markerInfo) {
        // Au click sur un marker, on instancie notre formulaire de réservation
       this.form = new Form(markerInfo, this.reservation)
    }

}