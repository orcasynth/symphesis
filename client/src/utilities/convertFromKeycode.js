// keep instruments conversions in here

function convertFromKeyCode(keycode, instrument) {
  let convertedKeycode = keycode.toUpperCase()
  const conversionTable = { 
   "keyboard" : {
      '2': "C#3",
      '3': "D#3",
      '5': "F#3",
      '6': "G#3",
      'Q': "C3",
      'W': "D3",
      'E': "E3",
      'R': "F3",
      'T': "G3",
      'A': "A#4",
      'S': "C#4",
      'D': "D#4",
      'F': "F#4",
      'Z': "A4",
      'X': "B4",
      'C': "C4",
      'V': "D4",
      'B': "E4",
      'N': "F4",
      'M': "G4"
    },
    "electric-guitar" : {
      '2': "A",
      '3': "A7",
      '5': "Am",
      '6': "B",
      'Q': "B7",
      'W': "Bm",
      'E': "C",
      'R': "C7",
      'T': "Cm",
      'A': "D",
      'S': "D7",
      'D': "Dm",
      'F': "E",
      'Z': "E7",
      'X': "Em",
      'C': "F",
      'V': "F7",
      'B': "Fm",
      'N': "G",
      'M': "G7",
      ',': "Gm"
    }, 
    "drums" : {
      '2': "hihat2",
      '3': "hihat1",
      '5': "hitom1",
      '6': "hitom2",
      'Q': "kick",
      'W': "lowtom1",
      'E': "lowtom2",
      'A': "ride1",
      'S': "ride2",
      'D': "ridebell",
      'F': "ridecrash",
      'Z': "snare1",
      'X': "snare2",
      'C': "snareroll"
    }
  }
  return conversionTable[instrument][convertedKeycode]
}

export default convertFromKeyCode