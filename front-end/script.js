var monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")

var actualDate = new Date();
var previousDate = new Date(actualDate);
previousDate.setDate(actualDate.getDate() - 1);
var nextDate = new Date(actualDate);
nextDate.setDate(actualDate.getDate() + 1);

app()

function updateDates() {
    document.getElementById("previousDay").innerHTML = previousDate.getDate();
    document.getElementById('previousDayMonth').innerHTML = monName[previousDate.getMonth()];
    document.getElementById("actualDay").innerHTML = actualDate.getDate();
    document.getElementById('actualDayMonth').innerHTML = monName[actualDate.getMonth()];
    document.getElementById("nextDay").innerHTML = nextDate.getDate();
    document.getElementById('nextDayMonth').innerHTML = monName[nextDate.getMonth()];
}

function goPreviousDate() {
    actualDate = previousDate;
    previousDate = new Date(actualDate);
    previousDate.setDate(actualDate.getDate() - 1);
    nextDate = new Date(actualDate);
    nextDate.setDate(actualDate.getDate() + 1);
    updateDates();
    getScheduleByDate();
}

function goNextDate() {
    actualDate = nextDate;
    previousDate = new Date(actualDate);
    previousDate.setDate(actualDate.getDate() - 1);
    nextDate = new Date(actualDate);
    nextDate.setDate(actualDate.getDate() + 1);
    updateDates();
    getScheduleByDate();
}

function getScheduleByDate(){
    let day = actualDate.getDate().toString();
    if (day.length == 1){
        day = '0' + day;
    }
    let month = (actualDate.getMonth() + 1).toString();
    if (month.length == 1){
        month = '0' + month;
    }
    let year = actualDate.getFullYear().toString();
    

    let url ='http://127.0.0.1:8000/schedules/'+day+month+year;

    axios.get(url)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
}

function app() {
    updateDates();
    getScheduleByDate();
}