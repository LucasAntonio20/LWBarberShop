var monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")

var actualDate = new Date();
var previousDate = new Date(actualDate);
previousDate.setDate(actualDate.getDate() - 1);
var nextDate = new Date(actualDate);
nextDate.setDate(actualDate.getDate() + 1);

document.getElementById("previousDay").innerHTML = previousDate.getDate();
document.getElementById('previousDayMonth').innerHTML = monName[previousDate.getMonth()];
document.getElementById("actualDay").innerHTML = actualDate.getDate();
document.getElementById('actualDayMonth').innerHTML = monName[actualDate.getMonth()];
document.getElementById("nextDay").innerHTML = nextDate.getDate();
document.getElementById('nextDayMonth').innerHTML = monName[nextDate.getMonth()];

app()

function goPreviousDate() {
    console.log("Data Anterior");
}

function goNextDate() {
    console.log("Proxima Data");
}

function listarClientes(){
    axios.get('http://127.0.0.1:8000/schedules')
        .then(response  => console.log(response.data))
}

function app() {
    console.log('App iniciado')
    listarClientes()
}