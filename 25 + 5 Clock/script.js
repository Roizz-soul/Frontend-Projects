import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { Provider, connect } from "https://esm.sh/react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware
} from "https://esm.sh/redux";

let ticking = false;

function startTimer(duration, display) {
  if (ticking) {
    let min = Number(duration.split(":")[0]);
    let sec = Number(duration.split(":")[1]);
    var timer = setInterval(function () {
      sec--;
      if (!ticking) {
        clearInterval(timer);
        return;
      }
      if (sec < 0 && min === 0) {
        const check = document.getElementById("timer-label").textContent
        if (check === "Session") {
          document.getElementById("timer-label").textContent = "Break";
          min = Number(document.getElementById("break-length").textContent);
          sec = Number("00");
          document.getElementById("beep").play();
        } else {
          document.getElementById("timer-label").textContent = "Session";
          min = Number(document.getElementById("session-length").textContent);
          sec = Number("00");
          document.getElementById("beep").play();
        }
        
      } else if (sec < 0) {
        min--;
        sec = 59;
      }
      display.textContent =
        (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    }, 1000);
  }
}

//Other React Components
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickIncB = this.handleClickIncB.bind(this);
    this.handleClickDecB = this.handleClickDecB.bind(this);
    this.handleClickIncS = this.handleClickIncS.bind(this);
    this.handleClickDecS = this.handleClickDecS.bind(this);
  }

  handleClickIncB() {
    if (!ticking) {
      const dig = document.getElementById("break-length").textContent;
      if (Number(dig) < 60) {
        document.getElementById("break-length").textContent = Number(dig) + 1;
      }
    }
  }

  handleClickDecB() {
    if (!ticking) {
      const fig = document.getElementById("break-length").textContent;
      if (Number(fig) > 1) {
        document.getElementById("break-length").textContent = Number(fig) - 1;
      }
    }
  }

  handleClickIncS() {
    if (!ticking) {
      const dig = document.getElementById("session-length").textContent;
      if (Number(dig) < 60) {
        document.getElementById("time-left").textContent =
          Number(dig) + 1 + ":00";
        document.getElementById("session-length").textContent = Number(dig) + 1;
      }
    }
  }

  handleClickDecS() {
    if (!ticking) {
      const fig = document.getElementById("session-length").textContent;
      if (Number(fig) > 1) {
        document.getElementById("time-left").textContent =
          Number(fig) - 1 + ":00";
        document.getElementById("session-length").textContent = Number(fig) - 1;
      }
    }
  }

  render() {
    return (
      <div id="settings">
        <div class="break">
          <p id="break-label">Break Length</p>
          <div>
            <span id="break-decrement" onClick={this.handleClickDecB}>
              <i class="fa-solid fa-angle-down"></i>
            </span>
            <span id="break-length">5</span>
            <span id="break-increment" onClick={this.handleClickIncB}>
              <i class="fa-solid fa-angle-up"></i>
            </span>
          </div>
        </div>
        <div class="session">
          <p id="session-label">Session Length</p>
          <div>
            <span id="session-decrement" onClick={this.handleClickDecS}>
              <i class="fa-solid fa-angle-down"></i>
            </span>
            <span id="session-length">25</span>
            <span id="session-increment" onClick={this.handleClickIncS}>
              <i class="fa-solid fa-angle-up"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.startCount = this.startCount.bind(this);
    this.reset = this.reset.bind(this);
  }

  startCount() {
    if (ticking) {
      ticking = false;
    } else {
      ticking = true;
      startTimer(
        document.getElementById("time-left").textContent,
        document.getElementById("time-left")
      );
    }
  }

  reset() {
    ticking = false;
    document.getElementById("timer-label").textContent = "Session";
    document.getElementById("break-length").textContent = 5;
    document.getElementById("session-length").textContent = 25;
    document.getElementById("time-left").textContent = "25:00";
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }

  render() {
    return (
      <div id="timer">
        <div id="circle" class="well">
          <p id="timer-label">Session</p>
          <div id="time-left">25:00</div>
        </div><audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" preload="auto" id="beep"></audio>
        <span id="start_stop" onClick={this.startCount}>
          <i class="fa-solid fa-play">
            <i class="fa-solid fa-pause"></i>
          </i>
        </span>
        <span id="reset" onClick={this.reset}>
          <i class="fa-solid fa-rotate-right"></i>
        </span>
      </div>
    );
  }
}

//Presantational react component, this is the main/root component
class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="section">
        <p id="title">25 + 5 Clock</p>
        <Settings />
        <Timer />
      </div>
    );
  }
}


ReactDOM.render(<Presentational />, document.getElementById("wrapper"));
