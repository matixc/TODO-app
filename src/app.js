var React = require('react');
var ReactDOM = require('react-dom');
require('./style.scss');


//-----------------------------------

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


//----------------------------------


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


//----------------------------------


class Task extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hover: false
    }

    this.doneClick = this.doneClick.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

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

  render() {
    let title = <p className="task-title"> {this.props.task.title}   </p>
    if (this.props.task.done === true) {
       title =  <p className="task-title" style={{textDecoration: "line-through"}}> {this.props.task.title}   </p>;
    }

    let deleteButton = ""
    if (this.state.hover) {deleteButton = <div className="task-deleteButton" onClick={this.deleteTask}> X </div>}
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


//---------------------------------


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      input: "123",
      tasks: [{title: "TODO App", done: false, id: 1},
        {title: "Ride a bike", done: false, id: 2},
        {title: "Get some sleep", done: true, id: 3},
        {title: "go home", done: false, id: 4}],
      display: "all",
      nextId: 5
    }

    this.handleChange = this.handleChange.bind(this);
    this.doneClick = this.doneClick.bind(this);
    this.clearDone = this.clearDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem("todo") !== null){
      console.log("import form localStorage" + localStorage.getItem("todo"))
      let state = JSON.parse(localStorage.getItem("todo"))
      this.setState(state)
    }
  }

  componentDidUpdate() {
    localStorage.setItem("todo", JSON.stringify(this.state))
  }

  handleChange(event) {
    this.setState({ input: event.target.value})
  }

  doneClick(index) {
    let tasks = this.state.tasks
    tasks[index].done = !tasks[index].done
    this.setState({tasks: tasks})
  }

  clearDone() {
    let tasks = this.state.tasks
    console.log(tasks)
    tasks = tasks.filter((task) => task.done === false)
    console.log(tasks)
    this.setState({tasks: tasks})
  }

  handleSubmit(event) {
    event.preventDefault()
    let newTask = {title: this.state.input, done: false, id: this.state.nextId}
    let nextId = this.state.nextId + 1
    let tasks = this.state.tasks
    tasks.push(newTask)
    this.setState({input: "", tasks: tasks, nextId: nextId})
  }

  changeView(event) {
    let view = event.target.value
    console.log(view)
    this.setState({view: view})
  }

  deleteTask(id) {
    console.log(`delete ${id}`)
    let tasks = this.state.tasks
    tasks = tasks.filter(task => task.id !== id)
    this.setState({tasks: tasks})
  }

  render(){

    let tasks = this.state.tasks
    if(this.state.view === "todo") {
      tasks = tasks.filter(task => task.done === false)
    }
    if(this.state.view === "done") {
      tasks = tasks.filter(task => task.done === true)
    }

    let tasksArr = []
    tasks.forEach((task,index) => {
      tasksArr.push(<Task key={index} index={index} task={task} doneClick={this.doneClick} deleteTask={this.deleteTask}/>)
    })

    return(
      <div className="app">
        <Input onChange={this.handleChange} value={this.state.input} handleSubmit={this.handleSubmit}/>
        {tasksArr}
        <Footer tasks={this.state.tasks} clearDone={this.clearDone} changeView={this.changeView}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("target"));

