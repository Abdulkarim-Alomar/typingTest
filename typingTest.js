let first = true;

//Array Of Words
const easyLevel = [
    "Hello",
    "Code",
    "Town",
    "Scala",
    "Funny",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
];
const NormalLevel = [
    "Country",
    "Testing",
    "Twitter",
    "Leetcode",
    "Playing",
    "Working",
    "Styling",
    "Github",
    "Python",
    "Coding",
];
const HardLevel = [
    "Programming",
    "Javascript",
    "Destructuring",
    "Documentation",
    "Dependencies",
    "Paradigm",
    "Cascade",
    "Linkedin",
    "Internet",
    "Youtube",
];
//Setting Levels
const lvl = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
}

//catch Selectors
let selectLvl = document.getElementById("lvl");
let theChosenLvl = document.getElementById("lvl").value;
let secondsSpan = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let controlSection = document.querySelector(".control");
let timeLeftSpan = document.querySelector(".time span");
let scoreGet = document.querySelector(".score .get");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let levelArray = easyLevel;

//Hide the control section
controlSection.style.display = "none";

// Default Level 
let defaultLevelName = theChosenLvl; // Change Level From Here
let defaultLevelSeconds = lvl[`${defaultLevelName}`];

selectLvl.onchange = () => {
    //reset values
    theChosenLvl = document.getElementById("lvl").value;
    defaultLevelName = theChosenLvl
    defaultLevelSeconds = lvl[`${defaultLevelName}`];
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;

    //reset the value of select
    switch (theChosenLvl) {
    case "Easy":
        levelArray = easyLevel;
        break;
    case "Normal":
        levelArray = NormalLevel;
        break;
    case "Hard":
        levelArray = HardLevel;
    break;
}
};


//Setting Level Name + Seconds + Score
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = levelArray.length;

//Disable Paste Event
input.onpaste = function () {
    return false;
}

//Start Game
startButton.onclick = function () {
    this.remove();
    input.focus();
    //Generate Words Function 
    genWords();

    //show the control section
    controlSection.style.display = "flex";

    //Stop user from change the Level
    selectLvl.setAttribute("disabled", "disabled");
}
function genWords() {
    //Get Random Words From Array
    let randomWord = levelArray[Math.floor(Math.random() * levelArray.length)];
    //Get Word Index
    let wordIndex = levelArray.indexOf(randomWord);
    //Remove Word From Array
    levelArray.splice(wordIndex, 1);
    //Show The Random Word
    theWord.innerHTML = randomWord;
    //Empty Upcoming Words
    upcomingWords.innerHTML = "";
    //Generate Upcoming Words
    for (let i = 0; i < levelArray.length; i++) {
        //Create Div Element
        let GenWord = document.createElement("div");
        GenWord.innerHTML = levelArray[i];
        upcomingWords.appendChild(GenWord);
    }
    //Call Start Play Function
    startPlay()
}
function startPlay() {
    if (first === true) {
        timeLeftSpan.innerHTML = defaultLevelSeconds;
        first = false;
    } else {
        timeLeftSpan.innerHTML = defaultLevelSeconds
    }
    let timeDown = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            //Stop Timer
            clearInterval(timeDown);
        //Compare Words
        if (theWord.innerHTML.toLocaleLowerCase() == input.value.toLocaleLowerCase()) {
            //Empty Input Field
            input.value = "";
            //Increase Score
            scoreGet.innerHTML++;

            if (levelArray.length == 1) {
                upcomingWords.remove();
            }
            if (levelArray.length > 0) {
                genWords();
            } else {
                upcomingWords.remove();
                let span = document.createElement("span");
                span.className = "good";
                span.innerHTML = "Congrats"
                finishMessage.appendChild(span);
                input.disabled = "disabled";
                store();
            }
        } else {
            let span = document.createElement("span");
            span.className = "bad";
            span.innerHTML = "Game Over";
            finishMessage.appendChild(span);
            input.disabled = "disabled";
            }
        }
    },1000)
}
//Storing The Score
function store() {
    window.localStorage.setItem("The Score", scoreGet.innerHTML);
    let day = new Date();
    window.localStorage.setItem("The Date", `${day.getDate()}/${day.getMonth()}/${day.getFullYear()}`);
}