
import React from "https://esm.sh/react"
import ReactDOM from "https://esm.sh/react-dom"
import { Provider, connect } from "https://esm.sh/react-redux"
import { createStore, combineReducers, applyMiddleware } from "https://esm.sh/redux"
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
      author: ''
    }
    this.getQuote = this.getQuote.bind(this);
  }
  
  async getQuote() {
    const res = await fetch('https://type.fit/api/quotes');
    const data = await res.json();
    const index = Math.floor(Math.random() * data.length);
    //console.log(data[index].author.split(','))
    this.setState({
      quote: data[index].text,
      author: data[index].author.split(',')[0] === "type.fit" ? '' : data[index].author.split(',')[0]
    })
     
  }
  
  render() {
    return (
      <div id="quote-box">
        {window.onload = this.getQuote}
        <div id="text">
          <i class="fa-solid fa-quote-left" id="left-quote"></i>
           {this.state.quote} 
          <i class="fa-solid fa-quote-right" id="right-quote"></i>
        </div>
        <div id="author">- {this.state.author}</div>
        <div class="row">
          <span class="blue">
            <a id="tweet-quote" target="_blank" href="twitter.com/intent/tweet">
              <i class="fa-brands fa-x-twitter" id="icon"></i> 
            </a>
            <span id="tweet">Tweet this quote</span>
          </span>
          <span class="yellow">
            <button id="new-quote" onClick={this.getQuote}>New Quote</button>
          </span>
        </div>
        
        
      </div>
    )
  }
}

ReactDOM.render(<Presentational />, document.getElementById('wrapper'))