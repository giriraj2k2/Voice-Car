const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let tid;
const box = document.querySelector('.box');
const voices = window.speechSynthesis.getVoices();
let idu, idd, idl, idr;
recognition.onstart = () => {
  console.log('started speaking');
};
recognition.onresult = (e) => {
  let text = e.results[0][0].transcript;
  console.log(text);
  command(text);
};
recognition.onend = () => {
  document.querySelector('.button').style.backgroundColor = 'black';
};
// starts the recognition on clicking the
const start = () => {
  recognition.start();
  document.querySelector('.button').style.backgroundColor = 'red';
};

// this function reads out loud the parameter
const say = (text) => {
  const speech = new window.SpeechSynthesisUtterance();
  speech.voice = voices[0];
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
};

// this function gets the text and from speech recognition and follows the command
const command = (text) => {
  if (text == 'up') {
    say('going up');
    idu = setInterval(() => {
      let top = Number(
        String(box.style.top).slice(0, String(box.style.top).indexOf('p'))
      );
      box.style.top = String(top - 1) + 'px';
    }, 10);
  } else if (text == 'down') {
    say('going down');
    idd = setInterval(() => {
      let top = Number(
        String(box.style.top).slice(0, String(box.style.top).indexOf('p'))
      );
      box.style.top = String(top + 1) + 'px';
    }, 10);
  } else if (text == 'right') {
    say('going right');
    idd = setInterval(() => {
      let top = Number(
        String(box.style.left).slice(0, String(box.style.left).indexOf('p'))
      );
      box.style.left = String(top + 1) + 'px';
    }, 10);
  } else if (text == 'left') {
    say('going left');
    idd = setInterval(() => {
      let top = Number(
        String(box.style.left).slice(0, String(box.style.left).indexOf('p'))
      );
      box.style.left = String(top - 1) + 'px';
    }, 10);
  } else if (text == 'stop') {
    say('Applying the brakes now');
    clearInterval(idu || idd || idl || idr);
  } else {
    say('Come again?');
  }
};
