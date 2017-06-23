var React = require('react');
var ReactDOM = require('react-dom');
require('./style.scss');


class Input extends React.Component {
  render() {
    return(
      <div>
        <form>
          <input type="text" onChange={this.props.onChange} value={this.props.value}></input>
        </form>
        {this.props.input}
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      input: "123",
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value})
  }

  render(){
    return(
      <div>
      <Input onChange={this.handleChange} value={this.state.input}/>
      <p>{this.state.input}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("target"));

