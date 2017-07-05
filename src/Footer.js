var React = require('react');
var ReactDOM = require('react-dom');
require('./style.scss');



class Footer extends React.Component {
  constructor(props) { 
    super(props)
  }

  render(){
    let left = this.props.tasks.filter((task) => task.done === false).length
    console.log(left)
    return(
      <div className="task-footer">
        {left} tasks left
        <div className="task-footer-buttons">
          <button onClick={this.props.changeView} value="all">All </button>
          <button onClick={this.props.changeView} value="todo">Active </button>
          <button onClick={this.props.changeView} value="done">Compleated </button>
        </div>
        <p onClick={this.props.clearDone}>Erase </p>
      </div>
      )
  }
}


export default Footer;