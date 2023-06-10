var monName = new Array("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")

var actualDate = new Date();
var previousDate = new Date(actualDate);
previousDate.setDate(actualDate.getDate() - 1);
var nextDate = new Date(actualDate);
nextDate.setDate(actualDate.getDate() + 1);

var actualDaySchedules;

app();

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

function getListToday(list) {
    actualDaySchedules = [null, null, null, null, null, null, null, null];
    list.forEach(e => {
        let hour = e.hour;
        if (hour < 10) {
            e.hour = "0" + hour + ":00"
        } else {
            e.hour = hour + ":00"
        }

        switch (e.hour) {
            case "08:00":
                actualDaySchedules[0] = e;
                break;
            case "09:00":
                actualDaySchedules[1] = e;
                break;
            case "10:00":
                actualDaySchedules[2] = e;
                break;
            case "11:00":
                actualDaySchedules[3] = e;
                break;
            case "14:00":
                actualDaySchedules[4] = e;
                break;
            case "15:00":
                actualDaySchedules[5] = e;
                break;
            case "16:00":
                actualDaySchedules[6] = e;
                break;
            case "17:00":
                actualDaySchedules[7] = e;
                break;
            default:
                break;
        }
    });
}

var modal = document.getElementById("myModal");

    function openModal() {
      modal.style.display = "block";
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function isValidName(name) {
        if (name.trim().length <= 0) return false;
        return true;
      }

    function submitName() {
      var name = document.getElementById("nameInput").value;
      if (!isValidName(name)) {
        alert ("Nome inválido");
      } else {
        alert("Cliente " + name + " foi adicionado com sucesso!");
      }
      closeModal();
    }

function refreshTodaySchedulesList() {
    for (let i = 0; i < actualDaySchedules.length; i++) {
        const e = actualDaySchedules[i];
        if (e == null) {
            document.getElementById(i).innerHTML = "Vazio";
        } else {
            document.getElementById(i).innerHTML = e.customer;
        }
    }
}

//API FUNCTIONS
function getScheduleByDate() {
    let day = actualDate.getDate().toString();
    if (day.length == 1) {
        day = '0' + day;
    }
    let month = (actualDate.getMonth() + 1).toString();
    if (month.length == 1) {
        month = '0' + month;
    }
    let year = actualDate.getFullYear().toString();


    let url = 'http://127.0.0.1:8000/schedules/' + day + month + year;

    axios.get(url)
        .then(response => {
         getListToday(response.data);
         refreshTodaySchedulesList();   
        }).catch(error => {
            actualDaySchedules = [null, null, null, null, null, null, null, null];
            refreshTodaySchedulesList();
        });
}

function deleteSchedule(position) {
    axios.delete('http://127.0.0.1:8000/schedules/' + actualDaySchedules[position].id)
  .then(x => { 
    alert("O cliente foi removido com sucesso!");
    getScheduleByDate();
  }).catch(error => {
    console.error(error);
  });
}

function app() {
    updateDates();
    getScheduleByDate();
}