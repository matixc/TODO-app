var React = require('react');
var ReactDOM = require('react-dom');
import Footer from "./Footer"
import Task from "./Task"
import Input from "./Input"
require('./style.scss');


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      input: "123",
      edit: false,
      tasks: [{title: "TODO App", done: false, edit: false, id: 1},
        {title: "Ride a bike", done: false, edit: false, id: 2},
        {title: "Get some sleep", done: true, edit: false, id: 3},
        {title: "go home", done: false, edit: false, id: 4}],
      display: "all",
      nextId: 5
    }

    this.handleChange = this.handleChange.bind(this);
    this.doneClick = this.doneClick.bind(this);
    this.clearDone = this.clearDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this)
    this.saveEditTask = this.saveEditTask.bind(this)
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
    if (this.state.edit === false) {
      let newTask = {title: this.state.input, done: false, edit:false, id: this.state.nextId}
      let nextId = this.state.nextId + 1
      let tasks = this.state.tasks
      tasks.push(newTask)
      this.setState({input: "", tasks: tasks, nextId: nextId})
    }
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

  editTask(event,id) {
    let tasks = this.state.tasks
    let index = tasks.findIndex(task => task.id === id)
    tasks[index].edit = true
    this.setState({edit: true, tasks: tasks})
  }

  saveEditTask(id, title) {
    let tasks = this.state.tasks
    let index = tasks.findIndex(task => task.id === id)
    tasks[index].title = title
    tasks[index].edit = false
    this.setState({edit: false, tasks:tasks})
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
      tasksArr.push(
        <Task
          key={index}
          index={index}
          task={task}
          doneClick={this.doneClick}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          saveEditTask={this.saveEditTask}
          editing={this.state.edit}
          />)
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


/*

Add title while editing to lacal storage
prevent from editing more then one titla at the time
generally stop other functions while editing...

*/
