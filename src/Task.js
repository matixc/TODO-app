var React = require('react');

require('./style.scss');

class Task extends React.Component {
  constructor(props){
    super(props)
 
    this.state = {
      hover: false,
      title: ""
    }

    this.doneClick = this.doneClick.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  doneClick() {
    this.props.doneClick(this.props.index)
  }

  deleteTask() {
    this.props.deleteTask(this.props.task.id)
  }

  mouseEnter() {
    this.setState({hover: true})
  }

  mouseLeave() {
    this.setState({hover: false})
  }

  editTask(event){
    if(this.props.editing === false)  {
        this.props.editTask(event, this.props.task.id)
        let title = this.props.task.title
        this.setState({title: title})
      }
  }

  handleChange(event) {
    this.setState({title: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.saveEditTask(this.props.task.id, this.state.title)
    console.log("submit")
  }


  render() {
    let title = <p className="task-title" onDoubleClick={this.editTask}> {this.props.task.title}   </p>
    if (this.props.task.done === true) {
       title =  <p className="task-title" style={{textDecoration: "line-through"}}> {this.props.task.title}   </p>;
    }
    if (this.props.task.edit === true) {
      title = <form onSubmit={this.handleSubmit}>
      <input type="text" value={this.state.title} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
      </form>
    }

    let deleteButton = ""
    if (this.state.hover && this.props.task.edit === false) {deleteButton = <div className="task-deleteButton" onClick={this.deleteTask}> X </div>}
    else {deleteButton = ""}

    let className = ""
    this.props.task.done === false ? className = "task" : className = "task task-done"

    return(
      <div className={className} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>

        <input
          className="task-checkbox"
          type="checkbox"
          checked={this.props.task.done}
          onChange={this.doneClick}
        />
        {title}
        {deleteButton}

      </div>
      )
  }
}

export default Task;