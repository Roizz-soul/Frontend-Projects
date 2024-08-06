import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { Provider, connect } from "https://esm.sh/react-redux";
import { createStore, combineReducers, applyMiddleware } from "https://esm.sh/redux";
//import thunk from "https://esm.sh/redux-thunk"

// const fetchData = async () => {
//   const res = await fetch('https://type.fit/api/quotes');
//   const data = await res.json();
//   console.log(data);
//   return data;
// }

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '' };

    this.getQuote = this.getQuote.bind(this);
  }

  async getQuote() {
    const res = await fetch('https://type.fit/api/quotes');
    const data = await res.json();
    const index = Math.floor(Math.random() * data.length);
    //console.log(data[index].author.split(','))
    this.setState({
      quote: data[index].text,
      author: data[index].author.split(',')[0] === "type.fit" ? '' : data[index].author.split(',')[0] });


  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "quote-box" },
      window.onload = this.getQuote, /*#__PURE__*/
      React.createElement("div", { id: "text" }, /*#__PURE__*/
      React.createElement("i", { class: "fa-solid fa-quote-left", id: "left-quote" }),
      this.state.quote, /*#__PURE__*/
      React.createElement("i", { class: "fa-solid fa-quote-right", id: "right-quote" })), /*#__PURE__*/

      React.createElement("div", { id: "author" }, "- ", this.state.author), /*#__PURE__*/
      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("span", { class: "blue" }, /*#__PURE__*/
      React.createElement("a", { id: "tweet-quote", target: "_blank", href: "twitter.com/intent/tweet" }, /*#__PURE__*/
      React.createElement("i", { class: "fa-brands fa-x-twitter", id: "icon" })), /*#__PURE__*/

      React.createElement("span", { id: "tweet" }, "Tweet this quote")), /*#__PURE__*/

      React.createElement("span", { class: "yellow" }, /*#__PURE__*/
      React.createElement("button", { id: "new-quote", onClick: this.getQuote }, "New Quote")))));






  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Presentational, null), document.getElementById('wrapper'));