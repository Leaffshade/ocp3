class Reservation {


    startTimer(){
        clearInterval(this.intervalID);
        this.intervalID = setInterval(() => {
            let timer = sessionStorage.getItem('timer');
            timer = timer - 1
            sessionStorage.setItem('timer', timer);
            
            this.displayTimer(timer)
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.intervalID)
        sessionStorage.setItem('timer', 1200) // La sessionStorage est de 20 min (1200 secnd)
    }

    displayTimer(timer){
        const $timer = document.querySelector('#timer')
        let minutes = Math.floor(timer / 60); // Pour obtenir le nombre de minutes complètes, diviser le nombre total de secondes par 60 (60 secondes / minute)
        let seconds = timer - minutes * 60; // Pour obtenir les secondes restantes, multiplier les minutes complètes par 60 et soustraire le nombre total de secondes
    
        if(minutes < 10){
            minutes =  `0${minutes}`; // Condition : Si les minutes sont à un chiffre (<10), ajouter un zéro non significatif
        }
    
        if(seconds < 10) {
            seconds = `0${seconds}`;
        }
    
        $timer.innerHTML = `${minutes} minutes et ${seconds} secondes`;
    }

    recapReservation(){
        const timer = sessionStorage.getItem('timer');
        const station = sessionStorage.getItem('station')
        if(timer > 0){
            const reservationInfo = document.querySelector('#reservation-info');
            reservationInfo.innerHTML = `
                <p>Vous avez réservé la station: <b>${station}</b></p>
                <p>Il vous reste <b id="timer"></b> de réservation</p>
            `;
            this.startTimer();
        }
    }

}