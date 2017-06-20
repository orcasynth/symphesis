import Keyboard from "../components/keyboard"

const audioContext = new AudioContext()

const oscillator = audioContext.createOscillator()
oscillator.connect(audioContext.destination)

oscillator.type = 'sawtooth'

oscillator.start(audioContext.currentTime)
oscillator.stop(audioContext.currentTime + 2)

oscillator.frequency.value = 220






// window.AudioContext = window.AudioContext || window.webkitAudioContext;

// var oscillators = {};

// var context = new AudioContext(),
//   masterVolume = context.createGain(),
//   settings = {
//     id: 'keyboard',
//     width: 600,
//     height: 150,
//     octaves: 2
//   },
//   keyboard = new Keyboard(settings);

// masterGain = context.createGain();
// nodes = [];

// masterGain.gain.value = 0.3;
// masterGain.connect(context.destination);

// keyboard.keyDown = function (note, frequency) {
//     var osc = context.createOscillator(),
//         osc2 = context.createOscillator();
 
//     osc.frequency.value = frequency;
//     osc.type = 'sawtooth';
 
//     osc2.frequency.value = frequency;
//     osc2.type = 'triangle';
 
//     osc.connect(masterVolume);
//     osc2.connect(masterVolume);
 
//     masterVolume.connect(context.destination);
 
//     oscillators[frequency] = [osc, osc2];
 
//     osc.start(context.currentTime);
//     osc2.start(context.currentTime);
// };

// keyboard.keyUp = function (note, frequency) {
//   oscillators[frequency].forEach(function (oscillator) {
//         oscillator.stop(context.currentTime);
//   })
// };