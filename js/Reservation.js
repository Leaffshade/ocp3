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
        sessionStorage.setItem('timer', 1200)
    }

    displayTimer(timer){
        const $timer = document.querySelector('#timer')
        let minutes = Math.floor(timer / 60);
        let seconds = timer - minutes * 60;
    
        if(minutes < 10){
            minutes =  `0${minutes}`;
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