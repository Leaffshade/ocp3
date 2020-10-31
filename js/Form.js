class Form {

    constructor(markerInfo, reservation){
        this.reservation = reservation;
        const infoStationHtml = `
            <ul>
                <li>
                    <b class="info-title">Nom de la station:</b> <span>${markerInfo.name}</span></li>
                <li>
                    <b class="info-title">Statut:</b> ${markerInfo.status}</li>
                <li>
                    <b class="info-title">Nombre de vélos disponibles:</b> ${markerInfo.available_bikes}</li>
            </ul>    
        `
        const reservationForm = document.querySelector('#reservation-form');
        const stationInfo = document.querySelector('#station-info');
        reservationForm.style.display = 'block';
        stationInfo.innerHTML = infoStationHtml;
    
        const form = document.querySelector('#form-reservation');
        const firstName = document.querySelector('#firstname');
        firstName.value = localStorage.getItem('firstname');
        const lastName = document.querySelector('#lastname');
        lastName.value = localStorage.getItem('lastname');
        form.addEventListener('submit', (e) => {
            this.submitForm(e, markerInfo);
        });
        new Canvas();


    }

    submitForm(e, markerInfo){
        e.preventDefault();
        const firstName = e.target.firstname.value;
        const lastName = e.target.lastname.value;
        localStorage.setItem('firstname', firstName);
        localStorage.setItem('lastname', lastName);
        sessionStorage.setItem('station', markerInfo.name);
    
        this.reservation.stopTimer();
        this.reservation.recapReservation();
    
    }

}