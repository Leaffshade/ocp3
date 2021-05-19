class Reservation {


    startTimer(){
        clearInterval(this.intervalID);
        this.intervalID = setInterval(() => {
            this.timer = sessionStorage.getItem('timer');
            this.timer = this.timer - 1
            sessionStorage.setItem('timer', this.timer);
            
            this.displayTimer(this.timer)
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.intervalID)
        sessionStorage.setItem('timer', 1200) // La sessionStorage est de 20 min (1200 secnd)
    }

    displayTimer(timer){
        this.$timer = document.querySelector('#timer')
        let minutes = Math.floor(timer / 60); // Pour obtenir le nombre de minutes complètes, diviser le nombre total de secondes par 60 (60 secondes / minute)
        let seconds = timer - minutes * 60; // Pour obtenir les secondes restantes, multiplier les minutes complètes par 60 et soustraire le nombre total de secondes
    
        if(minutes < 10){
            minutes =  `0${minutes}`; // Condition : Si les minutes sont à un chiffre (<10), ajouter un zéro non significatif
        }
    
        if(seconds < 10) {
            seconds = `0${seconds}`;
        }
    
        this.$timer.innerHTML = `${minutes} minutes et ${seconds} secondes`;
    }

    recapReservation(){
        this.timer = sessionStorage.getItem('timer');
        this.station = sessionStorage.getItem('station')
        if(this.timer > 0){
            this.reservationInfo = document.querySelector('#reservation-info');
            this.reservationInfo.innerHTML = `
                <p>Vous avez réservé la station: <b>${this.station}</b></p>
                <p>Il vous reste <b id="timer"></b> de réservation</p>
                <button id="stop-reservation">Stop réservation</button>
            `;
            this.startTimer();
            document.querySelector('#stop-reservation').addEventListener('click', (e) => {
                e.preventDefault();
                this.stopReservation();
            })
        }
    }

    stopReservation(){
        if(confirm("Etes-vous sur d'annuler la réservation?")){
            this.reservationInfo.innerHTML = '';
            sessionStorage.clear();
            clearInterval(this.intervalID)
        }
        
    }

}