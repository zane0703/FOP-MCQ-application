"use strict";
/*store element in Constants*/
const BK = document.getElementById("bk"), HIN = document.getElementById("hin"), HINT = document.getElementById("hint"), FIF = document.getElementById("fif"), SK = document.getElementById("sk"),
    NX = document.getElementById("nx"), SU = document.getElementById("su"), NAV = document.getElementById("nav"), ANSWER = document.getElementById("answer"), TIMEBOX = document.getElementById("timebox"), RESET = [document.getElementById("reset"), document.querySelector("#reset>button:first-child"), document.querySelector("#reset>button:last-child")], CATEGORIES = document.getElementById("categories"),
    QUEST = document.getElementById("quest"), TIMER = document.getElementById("time"), page = document.getElementById("page"),
    ATT = document.querySelector(".att"), HINT_IN = document.createElement('h2');
HINT_IN.id = "hintIn";
/*declare variable*/
let i = null, point = 0, sec = 0, interval, fiftyon = false, usedhint = false, q, len, quiz = {}, name, attall, saved;
/*let user jump to any page*/
page.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let num = parseInt(document.getElementById("page").value);
        switch (num) {
            case len + 1: BK.style.visibility = "visible";
                i = num - 1;
                summary()
                break;
            case len:
            case len - 2:
            case len - 1: BK.style.visibility = "visible";
            case 1: if (i === len) {
                HINT.appendChild(HINT_IN);
                SK.style.visibility = "visible";
                FIF.style.visibility = "visible";
                HIN.style.innerHTML = "";
                SU.style.display = "none";
                ANSWER.style.display = "block";
            }
                i = num - 1;
                quest();
                break;
            default: if (num > 1 && num <= len - 3) {
                if (i === len) {
                    HINT.appendChild(HINT_IN);
                    SK.style.visibility = "visible";
                    FIF.style.visibility = "visible";
                    HIN.style.visibility = "visible";
                    SU.style.display = "none";
                    ANSWER.style.display = "block";
                }
                i = num - 1;
                NX.style.display = "inline"
                SK.style.visibility = "visible";
                BK.style.visibility = "visible";
                quest();
            } else { alert("Page 1 to " + (len + 1) + " only"); };
                break;
        }

    }

});
/* keyboard support*/
window.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 39: if (i < len) { NX.click() }
        else if (i === len) { SU.click() };
            break;
        case 37: if (i > 0 && i < len + 1) { BK.click() }
            break;
        case 83: if (i === len + 1) { RESET[2].click() }
            break;
        case 96:
        case 96: if (i === len + 1 || i === -1) { RESET[1].click() }
            break;
        case 97:
        case 49: if (i === null) { document.getElementById("cat1").click() }
        else if (document.querySelector("#r" + 0 + ">input") !== null) {
            document.querySelector("#r" + 0 + ">input").checked = true;
        }
            break;
        case 50:
        case 98: if (i === null) { document.getElementById("cat2").click() }
        else if (document.querySelector("#r" + 1 + ">input") !== null) {
            document.querySelector("#r" + 1 + ">input").checked = true;
        };
            break;
        case 99:
        case 51: if (i === null) { document.getElementById("cat3").click() }
        else if (document.querySelector("#r" + 2 + ">input") !== null) {
            document.querySelector("#r" + 2 + ">input").checked = true;
        };
            break;
        case 100:
        case 52: if (i === null) { document.getElementById("cat4").click() }
        else if (document.querySelector("#r" + 3 + ">input") !== null) {
            document.querySelector("#r" + 3 + ">input").checked = true;
        };
            break;
        case 101:
        case 53: if (i === null) { document.getElementById("cat5").click() }
        else if (document.querySelector("#r" + 4 + ">input") !== null) {
            document.querySelector("#r" + 4 + ">input").checked = true;
        };
            break;
        case 102:
        case 54: if (i === null) { document.getElementById("pr").click() }
        else if (document.querySelector("#r" + 5 + ">input") !== null) {
            document.querySelector("#r" + 5 + ">input").checked = true;
        };
            break;
        case 72: if (!q.helpline) { HIN.click(); };
            break;
        case 70: if (!q.helpline && q.choices.length > 2) { FIF.click(); };
            break;


    }
})
/*Remve some function when live server is not useed as it does not work on local file*/
if (window.location.protocol === "file:") {
    document.getElementById("cat5").style.display = "none";
    document.getElementById("cat5").disabled = true;
    document.getElementById("pr").style.display = "none";
    document.getElementById("pr").disabled = true;
    alert("some of the function will not appear on local file please use live server to see additional function");
}
/*warn user not to search for answer*/
//window.addEventListener("contextmenu", function (e) { alert("Do not search for answer!"); e.preventDefault(); });
//window.addEventListener("copy", function (e) { alert("Do not search for answer!"); e.preventDefault(); });
/*set class*/
class MCQ {
    constructor(question = "", choices = [""], hint = "", answer = 0) {
        this.question = question;
        this.hint = hint;
        this.choices = choices;
        this.answer = answer - 1;
        this.input;
        this.helpline;
    }
    getresult() { return this.input === this.answer; }
    GotAtt() { return this.input !== undefined; }
    getQuestion() {
        QUEST.textContent = `Question ${i + 1}/${len} :` + this.question;
        ANSWER.textContent = '';
        this.choices.forEach((v, k) => {
            if (v !== "") {
                let div = document.createElement('div');
                let radio = document.createElement('input');
                div.id = 'r' + k;
                radio.type = 'radio';
                radio.name = 'answer';
                radio.value = k;
                div.appendChild(radio)
                div.append(v)
                ANSWER.appendChild(div)
            }
        });
    }
}

class Quiz {
    constructor(cat = 0) {
        this.questionPool = [];
        switch (cat) {
            case 1:
                this.questionPool.push(new MCQ("Which part of the space tell how fast your monitor can refresh?", ["Frames Per Second", "Images per second", "Gigabit per second", "HDML"], "it short form is FPS", 1));
                this.questionPool.push(new MCQ("What CPU architecture are used by most desktop PC?", ["intel", "X86", "ARM", "PowerPC"], "It in number", 2));
                this.questionPool.push(new MCQ("What CPU architecture are used by most smartphone?", ["intel", "X86", "ARM", "PowerPC"], "First word is Advanced", 3));
                this.questionPool.push(new MCQ("What is the name of Kernel use by windows?", ["Linux.", "XNU", "MS-DOS", "Windows NT"], "key world \"new technology\"", 4));
                this.questionPool.push(new MCQ("Which are the fastest connectors to connect from NVIDIA GPU to CPU?", ["NVLink", "PCI", "PCI Express", "AGP"], "Intel CPU do not support this interface.", 1));
                this.questionPool.push(new MCQ("Is intel the only CPU maker?", ["true", "false"], "intel will be monopolize if it was true", 2))
                break;
            case 2: 
                this.questionPool.push(new MCQ("What is WIFI stand for?", ["Wireless fidelity.", "wireless local area network.", "Wide internet for interconnect.", "It has not meaning."], "not wireless fidelity", 4));
                this.questionPool.push(new MCQ("Which is the fastest network media?", ["Ethernet", "RJ11", "fibre optic", "Coaxial cable"], "it use light to send data", 3));
                this.questionPool.push(new MCQ("Which is the first web browser?", ["WorldWideWeb(WWW)", "Internet Explorer", "Netscape Navigator", "Google Chrome"], "The name of the browser is also the most used subdomain", 1));
                this.questionPool.push(new MCQ("What HTML browser engine is used by chrome?", ["webkit.", "Blink.", "Trident", "V8"], "it not webkit but it is based on webkit.", 2));
                this.questionPool.push(new MCQ("What is the first word that was sent to the internet?", ["login", "testing, testing, 1,2,3", "hello world", "lo"], "it not a complete word", 4));
                break;
            case 3: this.questionPool.push(new MCQ("What is name Singapore stand for?", ["Lion city.", "Lion temple.", "New plus slope.", "Litter red dot."], "we are also considered a city.", 1));
                this.questionPool.push(new MCQ("Which is the national anthem of Singapore?", ["Mari kita.", "Majulah Singapura.", "Negaraku.", "God save the queen."], "Malay for onward singapore and it our motto too.", 2));
                this.questionPool.push(new MCQ("What does ERP stand for?", ["Everyday rob people.", "Every time Raise Price.", "Enhance Road Pricing", "Electric Road Pricing."], "Its run on electric and you can find it on the road", 4));
                this.questionPool.push(new MCQ("What is the first airport in singapore?", ["Changi Airport.", "Kallang Airport.", "Singapore International Airport (Paya Lebar).", "Seletar Airport."], "is still in operation", 4));
                this.questionPool.push(new MCQ("What is MRT stand for?", ["Mister (Mr) Transit.", "Metro Rapid Transit.", "Mass Rapid Transit.", "Mass Rapid transport."], "It is the fastest way to transit many people.", 3));
                break;
            case 4:
                this.questionPool.push(new MCQ("What is the voltage output of Singapore power socket?", ["110V.", "240V.", "120V", "230V."], "it is most popular standard use around the world", 4));
                this.questionPool.push(new MCQ("What the use of a fuss in our power plug?", ["Nothing, Just for show.", "To limit the current flow.", "Break the power when there is an overcurrent.", "Break the power when it is old, so we need buy new device."], "somting to do with safety.", 3));
                this.questionPool.push(new MCQ("Find voltage if amp and resistance is giving?", ["I*R=V.", "I/R=V.", "I^2* R=v.", "R^I=V."], "go find out about ohm law", 1));
                this.questionPool.push(new MCQ("Find the resistance for the resistor with colour code brown, black, green and gold.", ["1Ω ±5%.", "1MΩ ±5%.", "1MΩ ±10%.", "1KΩ ±0.2%."], "the green colour meant '10^5'", 2));
                this.questionPool.push(new MCQ("What is the Utility frequency of Singapore power socket?", ["5GHz.", "50Hz.", "230Hz.", "60Hz."], "it is most popular standard frequency use around the world.", 2));
                break;

        }


    }
    getNumberOfQuestions() {
        return this.questionPool.length;
    }
    getQuestionAt(index) {
        return this.questionPool[index];
    }
};
/*load question, choices and answer*/
document.getElementById("cat1").onclick = function () {
    document.title = "Computer";
    quiz = new Quiz(1);
    startMCQ();
}
document.getElementById("cat2").onclick = function () {
    document.title = "Networking";
    quiz = new Quiz(2);
    startMCQ();
}
document.getElementById("cat3").onclick = function () {
    document.title = "Singapore";
    quiz = new Quiz(3);
    startMCQ();
}
document.getElementById("cat4").onclick = function () {
    document.title = "Electronics";
    quiz = new Quiz(4);
    startMCQ();
}
document.getElementById("cat5").onclick = function () {
    if (confirm("Notice\nplease make sure you have edited the custom.json to what you want")) {
        document.title = "Custom";
        var xhr = new XMLHttpRequest();
        xhr.open("get", "custom.json");
        xhr.send();
        xhr.onload = function () {
            class CQuiz {
                constructor() {
                    this.questionPool = [];
                    this.questionPool = JSON.parse(xhr.response);
                }

                getNumberOfQuestions() {
                    return quiz.questionPool.length;
                }
                getQuestionAt(index) {
                    return quiz.questionPool[index];
                }
            }

            quiz = new CQuiz();
            for (let j = 0; j < quiz.getNumberOfQuestions(); j++) {
                quiz.questionPool[j].__proto__ = MCQ.prototype;
                quiz.questionPool[j].answer--;
            }
            startMCQ();
        }

    }
}
/*start the MCQ*/
function startMCQ() {
    name = prompt("Please enter your name")
    if (name && name != "null") {
        HINT.textContent = "";
        HINT.appendChild(HINT_IN);
        i = 0;
        document.getElementById("name").textContent = name;
        len = quiz.getNumberOfQuestions()
        //let AttBox = "";
        for (let j = 0; j < len;) {
            //AttBox += '<span id="att' + j + '">' + ++j + '</span>';
            let attBox = document.createElement("span");
            attBox.id =  'att' + j;
            attBox.textContent = ++j;
            ATT.appendChild(attBox);
        }
        document.getElementById("pageno").textContent = "/" + (len + 1);
        document.getElementById("page").max = len + 1
        interval = setInterval("time()", 1000)
        CATEGORIES.style.display = "none";
        NAV.style.display = "block";
        ANSWER.style.display = "block";
        ATT.style.display = "block";
        TIMEBOX.style.display = "inline-block";
        quest()
    } else { navigator.vibrate(1000); setTimeout(function () { alert("Please enter a valid name"); }, 100) }
}
/*navigation buttons*/
/*run this function if back is click */
BK.onclick = function () {
    if (i === len) { HINT.appendChild(HINT_IN); };
    i--;
    quest()
};
/*run this function if skip click */
SK.onclick = function () {
    i++;
    if (i === len) { summary(); }
    else { quest() };
};
/*store user answer when next is click*/
NX.onclick = function () {

    document.getElementById("att" + i).classList.add("green");
    i++;
    q.input = parseInt(ANSWER.elements["answer"].value);
    if (i === len) { summary(); }
    else { quest() };

}
/*run this function to change the question*/
function quest() {
    q = quiz.getQuestionAt(i);
    page.value = (i + 1);
    /* if helplused is used*/
    switch (q.helpline) {
        case 1: 
            HINT_IN.textContent = 'Hint:' + q.hint;
        case 2: 
            HIN.style.visibility = "hidden";
            FIF.style.visibility = "hidden";
            break;
        default: 
            HINT_IN.textContent = "";
            HIN.style.visibility = "visible";
            FIF.style.visibility = q.choices.length > 2? "visible":  "hidden";
    }

    /*show or hide buttom according page number*/
    switch (i) {
        case 0:
            BK.style.visibility = "hidden";
            break;
        case 1:
            BK.style.visibility = "visible";
            break;
        case len - 1: 
            SK.style.visibility = "visible";
            NX.style.display = "inline";
            ANSWER.style.display = "block";
            SU.style.display = "none";
            break;
    }
    /*output Quiz*/
    q.getQuestion();
    /* make a checked on redio*/
    if (q.GotAtt()) {
        document.querySelector("#r" + q.input + ">input").checked = true;
    } else {
        document.querySelector("#answer>div:first-of-type>input").checked = true;
    }
}
/*fifty/fifty*/
FIF.onclick = function () {
    let random = [], chooselen = q.choices.length;
    FIF.style.visibility = "hidden";
    HIN.style.visibility = "hidden";
    for (let j = Math.floor(chooselen / 2), addredom; j > 0;) {
        addredom = Math.floor(Math.random() * chooselen);
        if (addredom !== q.answer && !(random.includes(addredom))) {
            random.push(addredom);
            j--
        }
    }
    random.forEach((v) => {
        q.choices[v] = "";
        document.getElementById("r" + v).remove();
    })
    q.helpline = 2;

}
/*Hint*/
HIN.onclick = function () {
    document.getElementById("hintIn").textContent = 'Hint:' + q.hint;
    HIN.style.visibility = "hidden";
    FIF.style.visibility = "hidden";
    q.helpline = 1;
}
/* show saved results*/
document.getElementById("pr").onclick = function () {
    let name = prompt("Please enter your name\n your name must be the sane as your past attempted")
    let store = localStorage.getItem(name);
    let point = 0;
    if (store !== undefined) {
        saved = true;
        i = -1;
        store = JSON.parse(store)
        document.getElementById("name").innerText = name;
        TIMEBOX.style.display = "inline-block";
        document.title = store[0].title;
        TIMER.textContent = (Math.floor(store[0].sec / 60)) + ":" + pad(store[0].sec % 60);
        HINT.removeChild(HINT_IN);
        CATEGORIES.style.display = "none";
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        let th  = document.createElement('th');
        let tbody = document.createElement('tbody');
        let tfoot = document.createElement('tfoot')
        th.textContent = 'no';
        tr.appendChild(th);
        th  = document.createElement('th');
        th.textContent = 'Question';
        tr.appendChild(th);
        th  = document.createElement('th');
        th.textContent = 'Your answer';
        tr.appendChild(th);
        th  = document.createElement('th');
        th.textContent = 'Correct answer';
        tr.appendChild(th);
        th  = document.createElement('th');
        th.textContent = 'Score';
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead)
        for (let j = 0, input; j < store.length; j++) {
            input = store[j].input || "Not answered"
            let tr = document.createElement('tr');
            let td  = document.createElement('td');
            td.textContent = j + 1;
            tr.appendChild(td);
            td = document.createElement('td');
            td.textContent = store[j].question;
            tr.appendChild(td);
            td = document.createElement('td');
            td.textContent = input;
            tr.appendChild(td);
            td = document.createElement('td');
            td.textContent = store[j].answer;
            tr.appendChild(td);
            td  = document.createElement('td');
            if (store[j].input === store[j].answer) {
                if (store[j].help || store[j].help === undefined) {
                    td.textContent = 1;
                    point++;
                } else {
                    td.textContent = 2;
                    point += 2;
                }
            } else {
                    td.textContent = 0;
            }
            console.log(point)
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody)
        tr = document.createElement('tr')
        let td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = 'Total score';
        tr.appendChild(td)
        td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = point;
        tr.appendChild(td);
        tfoot.appendChild(tr);
        table.appendChild(tfoot)
        HINT.textContent = "";
        HINT.appendChild(table);
        RESET[0].style.display = "inline";
        let welldone = point > store.length ? "Well done! " + name : "Better luck next time";
        QUEST.innerText = `you score is ${point}/${store.length * 2} ${welldone}`;
    } else {
        navigator.vibrate(1000)
        setTimeout(()=>{alert("sorry, Can't find result that are tag to this name")},100)        
    }

}
/*slowr summery of the user answer*/
function summary() {
    page.value = (i + 1);
    QUEST.textContent = name + ", Here the summary of your answer"
    SU.style.display = "inline"
    NX.style.display = "none"
    SK.style.visibility = "hidden";
    FIF.style.visibility = "hidden";
    HIN.style.visibility = "hidden";
    ANSWER.style.display = "none";
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let th  = document.createElement('th');
    let tbody = document.createElement('tbody');
    let tfoot = document.createElement('tfoot')
    th.textContent = 'no';
    tr.appendChild(th);
    th  = document.createElement('th');
    th.textContent = 'Question';
    tr.appendChild(th);
    th  = document.createElement('th');
    th.textContent = 'Your answer';
    tr.appendChild(th);
    th  = document.createElement('th');
    th.textContent = 'Correct answer';
    tr.appendChild(th);
    th  = document.createElement('th');
    th.textContent = 'Score';
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead)
    for (let j = 0, qj, input; j < len; j++) {
        qj = quiz.getQuestionAt(j);
        if (qj.GotAtt()) { input = qj.choices[qj.input] }
        else {
            input = "Unattempted"
            attall = true;
        }
        let tr = document.createElement('tr');
        let td  = document.createElement('td');
        td.textContent = j + 1;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = qj.question
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = input;
        tr.appendChild(td);
        td = document.createElement('td');
        td.id = `ans${j}`
        tr.appendChild(td);
        td  = document.createElement('td');
        td = document.createElement('td');
        td.id = `point${j}`
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody)
    tr = document.createElement('tr')
    let td = document.createElement('td');
    td.colSpan = 4;
    td.textContent = 'Total score';
    tr.appendChild(td)
    td = document.createElement('td');
    td.id = 'total';
    tr.appendChild(td);
    tfoot.appendChild(tr);
    table.appendChild(tfoot)
    HINT.textContent = '';
    HINT.appendChild(table);
    /*calculated the score and show answer*/
}
/*submit */
SU.onclick = function () {
    if (attall) { navigator.vibrate(1000) }
    setTimeout(() => {
        if (confirm((attall ? "Warning! " + name + ", you have an unattempted question\n" : "") + "Are you sure you want to submit your answer?")) {
            i++
            saved = false;
            clearInterval(interval);
            NAV.style.display = "none";
            ANSWER.style.display = "none";
            /*calculated the score and show answer*/
            for (let j = 0, qj; j < len; j++) {
                qj = quiz.getQuestionAt(j);
                document.getElementById("ans" + j).textContent = qj.choices[qj.answer]
                if (qj.GotAtt()) {
                    if (qj.getresult()) {
                        if (qj.helpline) {
                            document.getElementById("point" + j).textContent = 1;
                            point++;
                        } else {
                            document.getElementById("point" + j).textContent = 2;
                            point += 2;
                        }
                    } else {
                        document.getElementById("att" + j).className = "red";
                        document.getElementById("point" + j).textContent = 0
                    }
                } else { document.getElementById("point" + j).textContent = 0 }
            }
            document.getElementById("total").textContent = point;
            QUEST.textContent = `you score is ${point}/${len * 2} ` + (point > len ? "Well done! " + name : "Better luck next time");
            RESET[0].style.display = "inline";
            if (window.location.protocol === "http:" || window.location.protocol === "https:") { RESET[2].style.visibility = "visible"; }
        }
    }, 500);

}
/*reset the MCQ*/
RESET[1].onclick = function () {
    if (!saved) { navigator.vibrate(1000) }
    setTimeout(()=>{
        if (confirm((saved ? "" : "You have not saved your results\n") + "Are you sure you want to go back to the main screen")) {
            quiz = {};
            document.getElementById("su").style.display = "block"
            NX.style.display = "none"
            document.getElementById("name").textContent = ""
            document.title = "Question";
            RESET[0].style.display = "none";
            CATEGORIES.style.display = "block";
            ANSWER.style.display = "none";
            NAV.style.display = "none";
            QUEST.textContent = "Instruction";
            HINT.innerHTML = "<h2>1)Choose the categories you want to answer.</h2><h2>2)Each question you got it right without give you 2 mark</h2><h2>3)Using of helpline will only give you 1 mark if you got it right</h2><h2>4)click next to moved to the next question</h2><h2>5)Skip will moved to the next question but no answers will be saved.</h2><h2>6)Back will bring you back to the previous question again, no answers will be saved</h2><h2>7)Page will let you jump to whatever question you like</h2><h2>8)You use keyboad to control the MCQ by using arrow to navigate and number 1 to 4 to select your answer<h2><h2>9)At the top left hand corner there is a number box that will turn green to tell which question you have attempted</h2><h2>&nbsp;&nbsp;&nbsp;after you submitted some may turn red to tell you that you got wrong for that question</h2>";
            while (document.querySelectorAll(".green").length !== 0) { document.querySelector(".green").classList.remove("green") }
            while (document.querySelectorAll(".red").length !== 0) { document.querySelector(".red").classList.remove("red") }
            TIMEBOX.style.display = "none";
            ATT.style.display = "none";
            SK.style.visibility = "visible";
            FIF.style.visibility = "visible";
            HIN.style.visibility = "visible";
            SU.style.display = "none"
            NX.style.display = "inline"
            sec = 0;
            point = 0;
            i = null;
        }
    },500)
    
}
/* store results*/
RESET[2].onclick = function () {
    let store = [];
    saved = true;
    for (let j = 0, qj; j < quiz.getNumberOfQuestions(); j++) {
        qj = quiz.getQuestionAt(j);
        store.push({
            question: qj.question,
            input: qj.choices[qj.input],
            answer: qj.choices[qj.answer],
            help: Boolean(qj.helpline)
        })
    }
    store[0].title = document.title;
    store[0].sec = sec
    localStorage[name] = JSON.stringify(store)
    RESET[2].style.visibility = "hidden";
    alert("Results have been successfully saved to your browser localStorage")
}
/*time*/
function pad(val) { return val > 9 ? val : "0" + val; }
function time() { TIMER.textContent = (Math.floor(++sec / 60)) + ":" + pad(sec % 60); }
