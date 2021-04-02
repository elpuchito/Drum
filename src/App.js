import "./App.css";

import React, { useEffect, useState } from "react";

const sounds = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const App = () => {
  const [volume, setvolume] = useState(1);
  const [currentsound, setcurrentsound] = useState("");
  return (
    <div id="drum-machine" className="bg-info min-vh-100 text-white">
      <div id="display" className="text-center">
        <h2> Oscar Dario's Drum machine</h2>
        {sounds.map((sound) => (
          <Pad
            sound={sound}
            key={sound.id}
            volume={volume}
            setcurrentsound={setcurrentsound}
          ></Pad>
        ))}
        <br />

        <h4>volume</h4>
        <input
          type="range"
          step="0.01"
          value={volume}
          max="1"
          min="0"
          className="w-50"
          onChange={(e) => setvolume(e.target.value)}
        />
        <h3>{currentsound}</h3>
      </div>
    </div>
  );
};

const Pad = ({ sound, volume, setcurrentsound, currentsound }) => {
  const [active, setactive] = useState(false);

  const playSound = () => {
    const audioTag = document.getElementById(sound.keyTrigger);
    audioTag.currenTime = 0;
    audioTag.play();
    audioTag.volume = volume;

    setactive(true);
    setTimeout(() => setactive(false), 300);
    setcurrentsound(() => sound.id);
  };
  useEffect(() => {
    const handleKeypress = (e) => {
      if (e.keyCode === sound.keyCode) {
        playSound();
      }
    };
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, []);

  return (
    <div
      onClick={playSound}
      className={`btn btn-secondary p-4 m-3 ${active && "btn-warning"}`}
    >
      <audio className="clip" id={sound.keyTrigger} src={sound.url}></audio>
      {sound.keyTrigger}
    </div>
  );
};

export default App;
