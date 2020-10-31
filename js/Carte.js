class Carte {

    constructor(reservation){
        this.reservation = reservation
        this.initCarte();
    }

    initCarte(){
        /*** map ***/
        var lyon = [45.757284, 4.841696];
        var map = L.map('map').setView(lyon, 6); /***latitude, longitude, zoom de la map ***/
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', /***affichage calque map***/ {
            maxZoom: 20
        }).addTo(map);


        var request = new XMLHttpRequest();
        var markers = L.markerClusterGroup();
        map.addLayer(markers);
        var self = this;
    
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);

                response.forEach(element => {
                    const marker = L.marker([element.position.lat, element.position.lng]);
                    marker.on('click', () => {
                        self.onClickMarker(element)
                    })
                    markers.addLayer(marker);
                });
            }
        };
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=c8523e3b66e877900322ed01fb74e1f4211b80b2");
        request.send();     
    }

    onClickMarker(markerInfo) {
        const form = new Form(markerInfo, this.reservation)
    }

}