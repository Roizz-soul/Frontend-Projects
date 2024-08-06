import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { Provider, connect } from "https://esm.sh/react-redux";
import {
createStore,
combineReducers,
applyMiddleware } from
"https://esm.sh/redux";
import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/13.0.2/lib/marked.esm.js";

// Markup parser settings
marked.use({
  //async: true,
  breaks: true,
  pedantic: false,
  gfm: true });


const mark = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

`;

class EditorFix extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.func(event.target.value);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "resizable-container" }, /*#__PURE__*/
      React.createElement("div", { id: "editor-title" }, "Editor", /*#__PURE__*/

      React.createElement("span", null, /*#__PURE__*/
      React.createElement("i", { class: "fa-regular fa-window-maximize" }))), /*#__PURE__*/


      React.createElement("textarea", {
        class: "resizable-content",
        id: "editor",
        onChange: this.handleChange,
        value: this.props.text }), /*#__PURE__*/

      React.createElement("div", { class: "resizable-handle" })));


  }}


class PreviewFix extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "resizable-container2" }, /*#__PURE__*/
      React.createElement("div", { id: "preview-title" }, "Preview", /*#__PURE__*/

      React.createElement("span", null, /*#__PURE__*/
      React.createElement("i", { class: "fa-regular fa-window-maximize" }))), /*#__PURE__*/


      React.createElement("div", {
        class: "resizable-content",
        id: "preview",
        dangerouslySetInnerHTML: { __html: marked.parse(this.props.text) } })));



  }}

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markup: mark };


    this.updateMarkup = this.updateMarkup.bind(this);
  }

  updateMarkup(message) {
    this.setState({
      markup: message });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("p", { class: "title" }, /*#__PURE__*/
      React.createElement("i", { class: "fa-solid fa-bars", id: "bar" }), "My Editor"), /*#__PURE__*/

      React.createElement("div", { class: "container-fluid", id: "container" }, /*#__PURE__*/
      React.createElement(EditorFix, { text: this.state.markup, func: this.updateMarkup }), /*#__PURE__*/
      React.createElement(PreviewFix, { text: this.state.markup }))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Presentational, null), document.getElementById("wrapper"));

//Code for resizing both Editor and Preview boxes
const resizable = document.querySelector(".resizable-container");
const handle = document.querySelector(".resizable-handle");
const rightbox = document.querySelector(".resizable-container2");
let isResizing = false;
handle.addEventListener("mousedown", function (e) {
  isResizing = true;
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
});

function resize(e) {
  if (isResizing) {
    const width = e.clientX - resizable.offsetLeft;
    resizable.style.width = `${width}px`;
    rightbox.style.width = `calc(100vw - ${width}px - 17px)`;
  }
}

function stopResize() {
  isResizing = false;
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}
//Code ends for resizing