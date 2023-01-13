let speech = new SpeechSynthesisUtterance();
speech.lang = "vi-VN";
var collections = [];
var selects = [];
var selectedString = "";
for(let i = 1; i <= 90; i++){
  collections.push(i);
}
var delay = 3;

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[300];
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

// document.querySelector("#rate").addEventListener("input", () => {
//   const rate = document.querySelector("#rate").value;
//   speech.rate = rate;
//   document.querySelector("#rate-label").innerHTML = rate;
// });

// document.querySelector("#volume").addEventListener("input", () => {
//   const volume = document.querySelector("#volume").value;
//   speech.volume = volume;
//   document.querySelector("#volume-label").innerHTML = volume;
// });

// document.querySelector("#pitch").addEventListener("input", () => {
//   const pitch = document.querySelector("#pitch").value;
//   speech.pitch = pitch;
//   document.querySelector("#pitch-label").innerHTML = pitch;
// });

// document.querySelector("#voices").addEventListener("change", () => {
//   speech.voice = voices[document.querySelector("#voices").value];
// });
var intervalId;

function loto() {
  if(collections.length > 0){
    let rand = collections[Math.floor(Math.random() * collections.length)];
    collections.splice(collections.indexOf(rand), 1);
    document.getElementById("showTitle").innerHTML = rand;
    selects.push(rand);
    selectedString += rand.toString() + " - " ;
    document.getElementById("showSelects").innerHTML = selectedString;  
    speech.text = rand;
    window.speechSynthesis.speak(speech);
    if(collections.length == 0){
      clearInterval(intervalId);
      window.speechSynthesis.cancel();
      document.getElementById("start").hidden = true;
    }
  }
}

function getRand(array) {
  var rand = array[Math.floor(Math.random() * array.length)];
  array.splice(array.indexOf(rand), 1);
  return rand;
}

document.querySelector("#delay").addEventListener("input", () => {
  const delayTime = document.querySelector("#delay").value;
  delay = delayTime;
  document.querySelector("#delay-label").innerHTML = delayTime;
});

document.querySelector("#start").addEventListener("click", () => {
  // speech.text = document.querySelector("textarea").value;
  intervalId = setInterval(loto, delay * 1000);
  document.getElementById("start").hidden = true;
  document.getElementById("resume").hidden = true;
  document.getElementById("reset").hidden = false;
  document.getElementById("pause").hidden = false;
});

document.querySelector("#pause").addEventListener("click", () => {
  document.getElementById("pause").hidden = true;
  document.getElementById("resume").hidden = false;
  clearInterval(intervalId);
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
  intervalId = setInterval(loto, delay * 1000);
  document.getElementById("resume").hidden = true;
  document.getElementById("pause").hidden = false;
});

document.querySelector("#reset").addEventListener("click", () => {
  clearInterval(intervalId);
  window.speechSynthesis.cancel();
  // console.log(window.speechSynthesis.pause());
  collections = [];
  for(let i = 1; i <= 90; i++){
    collections.push(i);
  }
  document.getElementById("showSelects").innerHTML = ""; 
  document.getElementById("showTitle").innerHTML = 0;
  selectedString = "";
  document.getElementById("start").hidden = false;
  document.getElementById("pause").hidden = true;
  document.getElementById("reset").hidden = true;
  document.getElementById("resume").hidden = true;
});

// document.querySelector("#cancel").addEventListener("click", () => {
//   window.speechSynthesis.cancel();
// });


// pause -> resume -> reset
