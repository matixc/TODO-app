var React = require('react');
require('./style.scss');


class Input extends React.Component {
  render() {
    return(
      <div className="task-input">
        <form onSubmit={this.props.handleSubmit}>
          <input type="text" onChange={this.props.onChange} value={this.props.value}></input>
        </form>
      </div>
    )
  }
}

export default Input;
