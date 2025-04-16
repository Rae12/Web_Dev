// Add sound effects
const winSound = new Audio('sounds/winchimes.mp3');
const loseSound = new Audio('sounds/losing-horn.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');

var wordList = [
  ["T", "R", "E", "E", "H", "O", "U", "S", "E"],
  ["J", "A", "V", "A", "S", "C", "R", "I", "P", "T"],
  ["W", "E", "B", "D", "E", "S", "I", "G", "N"],
  ["E", "D", "U", "C", "A", "T", "I", "O", "N"],
  ["C", "H", "O", "C", "O", "L", "A", "T", "E"],
  ["G", "E", "R", "M", "A", "N", "Y"],
  ["H", "E", "L", "L", "O"]
];

var random = Math.floor(Math.random() * wordList.length);
var justWords = wordList[random];
var rateWords = new Array(justWords.length);
var error = 0;

for (var i = 0; i < rateWords.length; i++) {
  rateWords[i] = "_ ";
}

function printrateWord() {
  var rateField = document.getElementById("rateField");
  rateField.innerHTML = ""; // clear previous
  for (var i = 0; i < rateWords.length; i++) {
    var letters = document.createTextNode(rateWords[i]);
    rateField.appendChild(letters);
  }
}

var checkSign = function () {
  var f = document.forms["rateformular"];
  var b = f.elements["ratezeichen"];
  var characters = b.value.toUpperCase();
  var hitRegister = false;

  for (var i = 0; i < justWords.length; i++) {
    if (justWords[i] === characters) {
      rateWords[i] = characters + " ";
      hitRegister = true;
    }
  }
  b.value = "";

  printrateWord();

  if (!hitRegister) {
    var advisedLetters = document.getElementById("advisedLetters");
    var letters = document.createTextNode(" " + characters);
    advisedLetters.appendChild(letters);
    error++;

    wrongSound.play(); // 🔊 wrong guess sound

    var hangman = document.getElementById("hangman");
    hangman.src = "https://i.imgur.com/5fXv2QD.png"; // or different stages if you upload 1–6

  }

  var finish = true;
  for (var i = 0; i < rateWords.length; i++) {
    if (rateWords[i] === "_ ") {
      finish = false;
    }
  }

  if (finish) {
    winSound.play(); // 🔊 play win sound
    showConfetti();  // 🎉 optional confetti animation
    setTimeout(() => {
      alert("Hey, you won!");
    }, 100);
  }

  if (error === 6) {
    loseSound.play(); // 🔊 play lose sound
    setTimeout(() => {
      alert("Good Day! You Lost");
    }, 100);
  }
}

function init() {
  printrateWord();
}

// 🎉 Confetti animation
function showConfetti() {
  for (let i = 0; i < 30; i++) {
    let confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = ['#ff0', '#f0f', '#0ff'][Math.floor(Math.random() * 3)];
    confetti.style.position = "fixed";
    confetti.style.top = "0";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.borderRadius = "50%";
    confetti.style.animation = "confetti 2s ease-out forwards";
    document.body.appendChild(confetti);
  }
}

window.onload = init;
