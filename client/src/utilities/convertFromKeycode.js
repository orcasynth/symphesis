// keep instruments conversions in here

function convertFromKeyCode(keycode, instrument) {
  let convertedKeycode = keycode.toUpperCase()
  const conversionTable = { 
   "keyboard" : {
      'W': "C#3",
      'E': "D#3",
      'T': "F#3",
      'Y': "G#3",
      'U': "A#4",
      'O': "C#4",
      'P': "D#4",
      'A': "C3",
      'S': "D3",
      'D': "E3",
      'F': "F3",
      'G': "G3",
      'H': "A4",
      'J': "B4",
      'K': "C4",
      'L': "D4",
      ';': "E4"
    },
    "electric-guitar" : {
      'Q': "G",
      'A': "G7",
      'Z': "Gm",
      'W': "A",
      'S': "A7",
      'X': "Am",
      'E': "B",
      'D': "B7",
      'C': "Bm",
      'R': "C",
      'F': "C7",
      'V': "Cm",
      'T': "D",
      'G': "D7",
      'B': "Dm",
      'Y': "E",
      'H': "E7",
      'N': "Em",
      'U': "F",
      'J': "F7",
      'M': "Fm",
    }, 
    "drums" : {
      'Q': "hihat1",
      'W': "hihat2",
      'E': "snareroll",
      'R': "ridecrash",
      'T': "ride1",
      'Y': "ride2",
      'U': "ridebell",
      'A': "kick",
      'S': "snare1",
      'D': "snare2",
      'F': "lowtom1",
      'G': "lowtom2",
      'H': "hitom1",
      'J': "hitom2"
    },
    "bass-synth" : {
      'W': "C#1",
      'E': "D#1",
      'T': "F#1",
      'Y': "G#1",
      'U': "A#2",
      'O': "C#2",
      'P': "D#2",
      ']': "F#2",
      'A': "C1",
      'S': "D1",
      'D': "E1",
      'F': "F1",
      'G': "G1",
      'H': "A2",
      'J': "B2",
      'K': "C2",
      'L': "D2",
      ';': "E2",
      "'": "F2"
    }
  }
  return conversionTable[instrument][convertedKeycode]
}

export default convertFromKeyCode