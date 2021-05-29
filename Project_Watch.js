var time = new Date();
setInterval(function () { time = new Date }, 1)

function twodigits(x) {
    if (x < 10) {
        x = "0" + x;
    }
    return x;
}

function threedigits(x) {
    if (x < 10) {
        x = "00" + x;
    }
    else if (x < 100) {
        x = "0" + x;
    }
    return x;
}

{   //Input boxes
    let inputBoxes = document.querySelectorAll("input");
    let alarmMinuteInput = document.querySelector("#alarminput #minute");
    let alarmHourInput = document.querySelector("#alarminput #hour");
    let countdownMinuteInput = document.querySelector("#countdowninput #minutes");
    let countdownSecondInput = document.querySelector("#countdowninput #seconds");

    alarmMinuteInput.addEventListener("keyup", correctInputValueMinute);
    alarmHourInput.addEventListener("keyup", correctInputValueHour);
    countdownMinuteInput.addEventListener("keyup", correctInputValueMinute);
    countdownSecondInput.addEventListener("keyup", correctInputValueMinute);

    inputBoxes.forEach(x => x.addEventListener("click", selectInput));
    inputBoxes.forEach(x => x.addEventListener("focusout", correctInputLength));
    inputBoxes.forEach(x => x.addEventListener("keypress", validate));
    inputBoxes.forEach(x => x.addEventListener("paste", validate));
    //inputBoxes.forEach(x => x.addEventListener("keyup", correctInputValue));

    function selectInput(x) {
        x.target.select();
    }

    function validate(e) {
        if (e.type === "paste") {
            input = e.clipboardData.getData("Text");
        }

        else {
            input = String.fromCharCode(e.keyCode);
        }

        var regex = /[^0-9]/;
        if (regex.test(input)) {
            e.preventDefault();
        }
    }

    function correctInputLength(x) {
        let a = x.target.value;
        if (a.length === 1) {
            a = "0" + a;
            x.target.value = a;
        };
        if (a.length === 0) {
            x.target.value = "00"
        }
    }

    function correctInputValueMinute(x) {
        if (x.target.value > 59) {
            x.target.value = 59;
        }
    }

    function correctInputValueHour(x) {
        if (x.target.value > 23) {
            x.target.value = 23;
        }
    }
}

{   //Tabs
    var tabs = Array.from(document.querySelectorAll(".tab"));
    var tab_btn = Array.from(document.querySelectorAll(".tab-btn"));
    //tab_btn.forEach(x => x.addEventListener("mouseover", focusedTab));
    //tab_btn.forEach(x => x.addEventListener("mouseout", unfocusedTab));
    tab_btn.forEach(x => x.addEventListener("click", selectTab));

    function focusedTab(x) {
        x.target.style.backgroundColor = "rgb(250, 185, 103)";
        x.target.style.color = "white";
    }
    function unfocusedTab(x) {
        x.target.style.backgroundColor = "rgb(200, 130, 50)";
        x.target.style.color = "white";
    }
    function selectTab(x) {
        let tab = x.target.dataset.tab;
        for (let i = 0; i < 3; i++) {
            if (tabs[i].id === tab) {
                tabs[i].style.display = "block";
            }
            else {
                tabs[i].style.display = "none";
            }
        }
    }
}

{   //Time
    document.addEventListener("DOMContentLoaded", displayTime);
    let timetxt = document.querySelector("#timetxt");
    let btn1 = document.querySelector("#setalarm");
    let alarmMinuteInput = document.querySelector("#alarminput #minute");
    let alarmHourInput = document.querySelector("#alarminput #hour");
    var alarmList = document.querySelector("#alarmlist");
    let alert = document.querySelector("#alert");
    let alerttxt = document.querySelector("#alerttxt");
    let height = 0;

    btn1.addEventListener("click", setAlarm);
    alarmMinuteInput.addEventListener("keyup", keyupAlarm);
    alarmHourInput.addEventListener("keyup", keyupAlarm);

    function keyupAlarm(e) {
        if (e.keyCode === 13) {
            setAlarm();
        }
    }

    function displayTime() {
        var h = time.getHours();
        var min = time.getMinutes();
        var sec = time.getSeconds();
        timetxt.innerHTML = twodigits(h) + ":" + twodigits(min) + ":" + twodigits(sec);
        setTimeout(displayTime, 1000);
    }

    function setAlarm() {
        let alarmMinute = alarmMinuteInput.value;
        let alarmHour = alarmHourInput.value;
        if (alarmList.style.height == "0px" || alarmList.style.height == 0) {
            alarmList.style.height = "120px";
            alarmList.style.border = "2px solid rgb(49, 52, 54)";
            alarmList.style.marginBottom = "20px";
        }
        else {
            height = parseInt(alarmList.style.height);
            alarmList.style.height = height + 60 + "px";
        }

        let newAlarm = document.createElement("div");
        newAlarm.classList.add("alarm");

        let newAlarmTime = document.createElement("div");
        newAlarmTime.classList.add("time")
        newAlarmTime.innerHTML = alarmHour + ":" + alarmMinute;

        let cancel = document.createElement("div");
        cancel.classList.add("cancel");

        let cancelButton = document.createElement("span");
        cancelButton.classList.add("cancelButton");
        cancelButton.innerHTML = "X";
        cancelButton.addEventListener("click", cancelAlarm);

        let timeToWait;
        let alarmTime = Number(alarmHour) * 60 * 60 * 1000 + Number(alarmMinute) * 60 * 1000;
        let currentTime = Number(time.getHours()) * 60 * 60 * 1000 + Number(time.getMinutes()) * 60 * 1000 + Number(time.getSeconds()) * 1000 + Number(time.getMilliseconds());
        if (alarmTime > currentTime) {
            timeToWait = (alarmTime - currentTime) + 100;
        }
        else {
            timeToWait = (alarmTime - currentTime) + 24 * 60 * 60 * 1000;
        }
        let t = setTimeout(activateAlarm, timeToWait)

        function activateAlarm() {
            alert.classList.add("show");
            alert.style.border = "2px solid rgb(49, 52, 54)";
            alerttxt.innerHTML = "It's " + alarmHour + ":" + alarmMinute;
            alert.addEventListener("click", hide);
            cancelAlarm();
        }

        function hide() {
            alert.classList.remove("show");
            setTimeout(function () { alert.style.border = "none"; }, 450)
        }

        function cancelAlarm() {
            clearTimeout(t);
            cancelButton.removeEventListener("click", cancelAlarm);

            if (alarmList.style.height == "120px") {
                alarmList.style.height = "0px";
                alarmList.style.marginBottom = "0px";
                setTimeout(function () { alarmList.style.border = "none"; }, 450);
            }
            else {
                height = parseInt(alarmList.style.height);
                alarmList.style.height = height - 60 + "px";
            }
            newAlarm.style.transition = "height 0.2s";
            newAlarm.style.height = "0";
            setTimeout(function () { alarmList.removeChild(newAlarm) }, 500)
        }

        newAlarm.appendChild(newAlarmTime);
        newAlarm.appendChild(cancel);
        cancel.appendChild(cancelButton);
        alarmList.appendChild(newAlarm);

        alarmMinuteInput.value = "00";
        alarmHourInput.value = "00";
    }

}

{   //Chronometer
    let btn1 = document.querySelector("#chronometer #btn1");
    let btn2 = document.querySelector("#chronometer #btn2");
    let timer = document.querySelector("#chronometertxt");
    let running = false;
    let t, ms, sec, min, h, start, x;
    let total = 0;

    btn1.addEventListener("click", runChronometer);   //Start-Stop Button
    btn2.addEventListener("click", resetChronometer); //Reset Button

    function runChronometer() {
        if (!running) {
            running = true;
            btn1.innerHTML = "Stop";
            btn2.classList.remove("active");
            btn2.classList.add("inactive");
            startChronometer()
        }
        else {
            running = false;
            btn1.innerHTML = "Resume";
            btn2.classList.remove("inactive");
            btn2.classList.add("active");
            total += count;
            clearTimeout(t);
        }
    }
    function startChronometer() {
        start = time;
        function counter() {
            count = time - start;
            x = total + count;
            ms = x % 1000;
            sec = ((x - ms) / 1000) % 60;
            min = ((((x - ms) / 1000) - sec) / 60) % 60;
            h = (((((x - ms) / 1000) - sec) / 60) - min) / 60;
            timer.innerHTML = twodigits(h) + ":" + twodigits(min) + ":" + twodigits(sec) + "." + threedigits(ms);
            t = setTimeout(counter, 1);
        }
        counter();
    }
    function resetChronometer() {
        if (!running) {
            timer.innerHTML = "00:00:00.000";
            btn1.innerHTML = "Start";
            total = 0;
        }
    }
}

{   //Countdown  
    let btn1 = document.querySelector("#btn3");
    let btn2 = document.querySelector("#btn4");
    let countdowntxt = document.querySelector("#countdowntxt");
    let input = document.querySelector("#countdowninput .inputs");
    let hoursInput = document.querySelector("#countdowninput #hours");
    let minutesInput = document.querySelector("#countdowninput #minutes");
    let secondsInput = document.querySelector("#countdowninput #seconds");
    let inputBoxes = document.querySelectorAll("#countdown input");
    let htxt = document.querySelector("#countdowninput #h");
    let mintxt = document.querySelector("#countdowninput #min");
    let sectxt = document.querySelector("#countdowninput #sec");
    let countdownEnd = document.querySelector("#countdowninput #countdownend");
    let running = false;
    let t, sec, min, h, x, start;
    let total = 0;



    btn1.addEventListener("click", runCountdown);   //Start-Stop Button
    btn2.addEventListener("click", resetCountdown); //Reset Button

    function runCountdown() {
        if (!running) {
            running = true;
            btn1.innerHTML = "Stop";
            btn2.classList.remove("active");
            btn2.classList.add("inactive");
            startCountdown()
        }
        else {
            running = false;
            btn1.innerHTML = "Resume";
            btn2.classList.remove("inactive");
            btn2.classList.add("active");
            clearTimeout(t);
            total = x;
        }
    }

    function startCountdown() {
        start = time;
        if (total === 0) {
            active = true;
            sec = parseInt(secondsInput.value);
            min = parseInt(minutesInput.value);
            h = parseInt(hoursInput.value);
            total = (h * 60 * 60 + min * 60 + sec) * 1000 + 999;
        }
        countdowntxt.style.display = "flex";
        input.style.display = "none";
        function counter() {
            count = time - start;
            x = total - count;
            ms = x % 1000;
            sec = ((x - ms) / 1000) % 60;
            min = ((((x - ms) / 1000) - sec) / 60) % 60;
            h = (((((x - ms) / 1000) - sec) / 60) - min) / 60;

            htxt.innerHTML = twodigits(h);
            mintxt.innerHTML = twodigits(min);
            sectxt.innerHTML = twodigits(sec);
            t = setTimeout(counter, 1);

            if (x < 999) {
                clearTimeout(t);
                running = false;
                total = 0;
                countdownEnd.classList.add("show");
                btn1.classList.remove("active");
                btn1.classList.add("inactive");
                btn1.removeEventListener("click", runCountdown);
                btn2.classList.remove("inactive");
                btn2.classList.add("active");
            }
        }
        counter();
    }

    function resetCountdown() {
        if (!running) {
            total = 0;
            countdowntxt.style.display = "none";
            countdownEnd.classList.remove("show");
            input.style.display = "flex";
            btn1.innerHTML = "Start";
            inputBoxes.forEach(x => x.value = "00");
            btn1.classList.remove("inactive");
            btn1.classList.add("active");
            btn1.addEventListener("click", runCountdown);
        }
    }
}
