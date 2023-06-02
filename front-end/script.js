var monName = new Array("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")

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

function getListToday(list) {
    let otherList = [null, null, null, null, null, null, null, null];
    list.forEach(e => {
        let hour = e.hour;
        if (hour < 10) {
            e.hour = "0" + hour + ":00"
        } else {
            e.hour = hour + ":00"
        }
        switch (e.hour) {
            case "08:00":
                otherList[0] = e;
                break;
            case "09:00":
                otherList[1] = e;
                break;
            case "10:00":
                otherList[2] = e;
                break;
            case "11:00":
                otherList[3] = e;
                break;
            case "14:00":
                otherList[4] = e;
                break;
            case "15:00":
                otherList[5] = e;
                break;
            case "16:00":
                otherList[6] = e;
                break;
            case "17:00":
                otherList[7] = e;
                break;
            default:
                break;
        }
    });
    return otherList;
}

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
            let data = response.data;
            let list = getListToday(data);

            for (let i = 0; i < list.length; i++) {
                const e = list[i];
                if (e == null) {
                    document.getElementById(i).innerHTML = "Vazio";
                } else {
                    document.getElementById(i).innerHTML = e.customer;
                }
            }
            }
        )
        .catch(error => console.error(error));
}

function app() {
    updateDates();
    getScheduleByDate();
}