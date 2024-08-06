import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { Provider, connect } from "https://esm.sh/react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware
} from "https://esm.sh/redux";

//Variables
const CALC = "calc"; //For digits
const CLEAR = "clear"; //For AC to clear screen
const SOLVE = "equals"; //For equals to sign
const SIGN = "sign"; //For all other signs
let calculation = ""; //the main math to calculate
let SOLVED = "false"; //Check if math has been calculated yet
let j = 0; //To check for multiple decimal points
let ans = 0; //Final Answer

//List of Butons
const btns = [
  {
    text: "AC",
    id: "clear",
    class: CLEAR
  },
  {
    text: "/",
    id: "divide",
    class: SIGN
  },
  {
    text: "*",
    id: "multiply",
    class: SIGN
  },
  {
    text: "7",
    id: "seven",
    class: "calc"
  },
  {
    text: "8",
    id: "eight",
    class: "calc"
  },
  {
    text: "9",
    id: "nine",
    class: "calc"
  },
  {
    text: "-",
    id: "subtract",
    class: SIGN
  },
  {
    text: "4",
    id: "four",
    class: "calc"
  },
  {
    text: "5",
    id: "five",
    class: "calc"
  },
  {
    text: "6",
    id: "six",
    class: "calc"
  },
  {
    text: "+",
    id: "add",
    class: SIGN
  },
  {
    text: "1",
    id: "one",
    class: "calc"
  },
  {
    text: "2",
    id: "two",
    class: "calc"
  },
  {
    text: "3",
    id: "three",
    class: "calc"
  },

  {
    text: "0",
    id: "zero",
    class: "calc"
  },
  {
    text: ".",
    id: "decimal",
    class: "decimal"
  },
  {
    text: "=",
    id: "equals",
    class: "equals"
  }
];

//Function to handle digit input, called in reducer
const handleCalc = (Sinput, Ainput) => {
  if (SOLVED === "true") {
    SOLVED = "false";
    calculation = Ainput;
    return { input: Ainput };
  }
  if (
    Sinput[0] === "+" ||
    Sinput[0] === "*" ||
    Sinput[0] === "-" ||
    Sinput[0] === "/"
  ) {
    calculation += Ainput;
    return { input: Ainput };
  }
  if (Number(Ainput + Sinput) !== 0) {
    calculation += Ainput;
    return { input: Sinput + Ainput };
  }
};

//Function to handle sign input, called in reducer
const handleSign = (Sinput, Ainput) => {
  if (SOLVED === "true") {
    SOLVED = "false";
    calculation = ans + " " + Ainput + " ";
    return { input: Ainput };
  }

  if (
    calculation.length >= 7 &&
    ["+", "-", "*", "/"].includes(calculation[calculation.length - 5])
  ) {
    if (Ainput === "-") {
      calculation = calculation.slice(0, calculation.length - 2) + Ainput + " ";
      return { input: Ainput };
    } else {
      calculation = calculation.slice(0, calculation.length - 5) + Ainput + " ";
      return { input: Ainput };
    }
  }

  if ((Sinput === "*" || Sinput === "/" || Sinput === "+") && Ainput === "-") {
    calculation += " " + Ainput + " ";
    return { input: Ainput };
  } else if (
    Sinput === "+" ||
    Sinput === "-" ||
    Sinput === "/" ||
    Sinput === "*"
  ) {
    calculation = calculation.slice(0, calculation.length - 2) + Ainput + " ";
    return { input: Ainput };
  }

  if (Sinput[Sinput.length - 2] && Sinput[Sinput.length - 2] === "+") {
    calculation += calculation.slice(0, calculation.length - 2) + Ainput + " ";
    return { input: Ainput };
  }

  calculation += " " + Ainput + " ";
  return { input: Ainput };
};

//Function to handle decimal input, called in reducer
const handleDecimal = (Sinput, Ainput, Mstate) => {
  for (let i = 0; Sinput[i]; i++) {
    if (Sinput[i] === ".") {
      j += 1;
    }
  }

  if (SOLVED === "true") {
    SOLVED = "false";
    calculation = Ainput === "." ? "0" + Ainput : Ainput;
    return { input: Ainput === "." ? "0" + Ainput : Ainput };
  }

  if (
    Sinput[0] === "+" ||
    Sinput[0] === "*" ||
    Sinput[0] === "-" ||
    Sinput[0] === "/"
  ) {
    calculation += Ainput === "." ? "0" + Ainput : Ainput;
    return { input: Ainput === "." ? "0" + Ainput : Ainput };
  }

  if (j > 0) {
    return Mstate;
  } else {
    calculation += Sinput[0] === "." || Sinput === "" ? "0" + Ainput : Ainput;
    return {
      input:
        Sinput + (Sinput[0] === "." || Sinput === "" ? "0" + Ainput : Ainput)
    };
  }
};

//Action
const inputFeed = (input, type) => ({
  type,
  input
});

//Reducer
const calcReducer = (state = { input: "" }, action) => {
  switch (action.type) {
    case CALC:
      const sol = handleCalc(state.input, action.input);
      return sol;

    case CLEAR:
      j = 0;
      calculation = "";
      return { input: "" };

    case SIGN:
      const sol1 = handleSign(state.input, action.input);
      return sol1;

    case "decimal":
      const sol2 = handleDecimal(state.input, action.input, state);
      return sol2;

    case SOLVE:
      ans = eval(calculation);
      calculation += " " + action.input + " " + eval(calculation);
      SOLVED = "true";
      return { input: ans };

    default:
      return state;
  }
};

//Store
const store = createStore(calcReducer);

// React Components below

//Screen Component
class Screen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="screen">
        <div id="workings">{calculation}</div>
        <div id="display">{this.props.input == "" ? 0 : this.props.input}</div>
      </div>
    );
  }
}

//component for the Buttons
class ButtonPads extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.inputNum(event.target.textContent, event.target.classList[0]);
  }

  render() {
    return (
      <div id="buttonpads">
        {btns.map((el, index) => (
          <button
            id={el.id}
            key={index}
            onClick={this.handleClick}
            className={el.class}
          >
            {el.text}
          </button>
        ))}
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
      <div id="calculator">
        <Screen input={this.props.input} />
        <ButtonPads inputNum={this.props.inputNum} />
      </div>
    );
  }
}

// React-Redux:
const mapStateToProps = (state) => {
  return { input: state.input };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputNum: (input, type) => {
      dispatch(inputFeed(input, type));
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
