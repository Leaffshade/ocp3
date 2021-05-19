class Form {

    constructor(markerInfo, reservation){
        this.reservation = reservation;
        this.infoStationHtml = `
            <ul>
                <li>
                    <b class="info-title">Nom de la station:</b> <span>${markerInfo.name}</span></li>
                <li>
                    <b class="info-title">Statut:</b> ${markerInfo.status}</li>
                <li>
                    <b class="info-title">Nombre de vélos disponibles:</b> ${markerInfo.available_bikes}</li>
            </ul>    
        `
        this.reservationForm = document.querySelector('#reservation-form');
        this.stationInfo = document.querySelector('#station-info');
        this.reservationForm.style.display = 'block';
        this.stationInfo.innerHTML = this.infoStationHtml;
    
        this.form = document.querySelector('#form-reservation');
        this.firstName = document.querySelector('#firstname');
        this.firstName.value = localStorage.getItem('firstname');
        this.lastName = document.querySelector('#lastname');
        this.lastName.value = localStorage.getItem('lastname');
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if(this.canvas.isEmpty){
                alert('La signature est requise')
            } else {
                this.submitForm(e, markerInfo);
            }
        });
        this.canvas = new Canvas();


    }

    submitForm(e, markerInfo){
        e.preventDefault();
        localStorage.setItem('firstname', e.target.firstname.value);
        localStorage.setItem('lastname', e.target.lastname.value);
        sessionStorage.setItem('station', markerInfo.name);
    
        this.reservation.stopTimer();
        this.reservation.recapReservation();
    
    }

}