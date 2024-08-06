import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { Provider, connect } from "https://esm.sh/react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware
} from "https://esm.sh/redux";

// Redux:
const Q = "Q";
const W = "W";
const E = "E";
const A = "A";
const S = "S";
const D = "D";
const Z = "Z";
const X = "X";
const C = "C";

let one = "yes";
let two = "yes";
let off = "true";

//action
const CHANGE_SOUND = "CHANGE_SOUND";

const changeSound = (sound, name) => ({
  type: CHANGE_SOUND,
  sound,
  name
});

//Reducer
const soundReducer = (state = { key: "", name: "" }, action) => {
  switch (action.type) {
    case CHANGE_SOUND:
      return { key: action.sound, name: action.name };
    default:
      return state;
  }
};

//Store
const store = createStore(soundReducer);

const sounds = [
  {
    name: "Heater-1",
    letter: Q,
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"
  },
  {
    name: "Heater-2",
    letter: W,
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"
  },
  {
    name: "Heater-3",
    letter: E,
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"
  },
  {
    name: "Heater-4",
    letter: A,
    src:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"
  },
  {
    name: "Clap",
    letter: S,
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"
  },
  {
    name: "Open-HH",
    letter: D,
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"
  },
  {
    name: "Kick-n'-Hat",
    letter: Z,
    src:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"
  },
  {
    name: "Kick",
    letter: X,
    src:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"
  },
  {
    name: "Closed-HH",
    letter: C,
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
  }
];
//React components
class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    if (one === "yes") {
      const lst = document.getElementsByTagName("button");
      document.getElementById("switch").classList.add("on");
      document.querySelector("h4").textContent = "Power Off";
      document.getElementById("volume").disabled = "true";
      this.props.playSound("", "");

      for (let i = 0; lst[i]; i++) {
        lst[i].disabled = "true";
      }
      off = "false";
      one = "no";
    } else {
      const lst = document.getElementsByTagName("button");
      document.getElementById("switch").classList.remove("on");
      document.querySelector("h4").textContent = "Power On";
      document.getElementById("volume").disabled = false;
      
      for (let i = 0; lst[i]; i++) {
        lst[i].disabled = false;
      }
      off = "true"
      one = "yes";
    }
  }

  render() {
    return (
      <div>
        <h4>Power On</h4>
        <div class="switch" id="switch" onClick={this.changeColor}>
          <div id="span1" class="span"></div>
          <div id="span2" class="span"></div>
        </div>
      </div>
    );
  }
}

class Pads extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  play(letter, name) {
    this.props.playSound(letter, name);
    document.getElementById(letter).currentTime = 0;
    document.getElementById(letter).play();
    document.getElementById(letter).volume = document.getElementById(
      "volume"
    ).value;
  }

  render() {
    return (
      <div id="pads">
        {sounds.map((el, index) => (
          <button
            className="drum-pad"
            id={el.name}
            key={index}
            onClick={() => this.play(el.letter, el.name)}
          >
            <audio src={el.src} className="clip" id={el.letter}></audio>
            {el.letter}
          </button>
        ))}
      </div>
    );
  }
}

//Presantational react component
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.playMusic = this.playMusic.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.playMusic);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.playMusic);
  }

  playMusic(event) {
    if (off === "true") {
      const key = event.key.toUpperCase();
      const sound = sounds.find((el) => el.letter === key);
      if (sound) {
        this.props.playSound(key, sound.name);
        const audio = document.getElementById(key);
        document.getElementById(sound.name).classList.add("active");
        setTimeout(
          () => document.getElementById(sound.name).classList.remove("active"),
          100
        );
        if (audio) {
          audio.currentTime = 0;
          audio.play();
          audio.volume = document.getElementById("volume").value;
        }
      }
    }
  }

  handleVolume() {
    document.getElementById("display").textContent = `Volume: ${Math.round(
      document.getElementById("volume").value * 100
    )}`;
    setTimeout(() => {
      document.getElementById("display").textContent = this.props.name;
    }, 2000);
  }

  render() {
    return (
      <div id="drum-machine">
        <Pads playSound={this.props.playSound} />
        <div id="panel">
          <Switch playSound={this.props.playSound}/>
          <p id="display">{this.props.name}</p>
          <input
            max="1"
            min="0"
            step="0.01"
            type="range"
            id="volume"
            onClick={this.handleVolume}
            onChange={this.handleVolume}
          />
        </div>
      </div>
    );
  }
}

// React-Redux:
const mapStateToProps = (state) => {
  return { currentKey: state.key, name: state.name };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playSound: (sound, name) => {
      dispatch(changeSound(sound, name));
    }
  };
};

// Define the Container component here:(Presentational is the react component)
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("wrapper"));
// {
//         document.addEventListener('keypress', (event) => {
//           for (let i = 0; sounds[i]; i++) {
//             if(event.key.toUpperCase() === sounds[i].letter) {
//               document.getElementById(sounds[i].letter).currentTime = 0;
//               document.getElementById(sounds[i].letter).play();
//           }}
//          })

//           }
