var React = require('react');
var ReactDOM = require('react-dom');
require('./style.scss');


//-----------------------------------

class Input extends React.Component {
  render() {
    return(
      <div>
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
      <div>
        {left} tasks left    <p onClick={this.props.clearDone}>erase </p>
      </div>
      )
  }
}


//----------------------------------


class Task extends React.Component {
  constructor(props){
    super(props)

    this.doneClick = this.doneClick.bind(this)
  }

  doneClick() {
    this.props.doneClick(this.props.index)
  }

  render() {
    let title = <p> {this.props.title}   </p>
    if (this.props.done === true) {
       title =  <p style={{textDecoration: "line-through"}}> {this.props.title}   </p>;
    }
    return(
      <div>
        {title}
        <input
          type="checkbox"
          checked={this.props.done}
          onChange={this.doneClick}
        />
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
      nextId: 5
    }

    this.handleChange = this.handleChange.bind(this);
    this.doneClick = this.doneClick.bind(this);
    this.clearDone = this.clearDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem("todo") !== null){
      console.log("import form localStorage" + localStorage.getItem("todo"))
      let state = JSON.parse(localStorage.getItem("todo"))
      this.setState(state)
    }
  }

  handleChange(event) {
    this.setState({ input: event.target.value})
  }

  doneClick(index) {
    let tasks = this.state.tasks
    tasks[index].done = !tasks[index].done
    this.setState({tasks: tasks})
    localStorage.setItem("todo", JSON.stringify(this.state))
  }

  clearDone() {
    let tasks = this.state.tasks
    console.log(tasks)
    tasks = tasks.filter((task) => task.done === false)
    console.log(tasks)
    this.setState({tasks: tasks})
    localStorage.setItem("todo", JSON.stringify(this.state))
  }

  handleSubmit(event) {
    event.preventDefault()
    let newTask = {title: this.state.input, done: false, id: this.state.nextId}
    let nextId = this.state.nextId + 1
    let tasks = this.state.tasks
    tasks.push(newTask)
    this.setState({input: "", tasks: tasks, nextId: nextId})
    localStorage.setItem("todo", JSON.stringify(this.state))
  }

  render(){
    let tasksArr = []
    this.state.tasks.forEach((task,index) => {
      tasksArr.push(<Task key={index} index={index} title={task.title} done={task.done} doneClick={this.doneClick} />)
    })
    return(
      <div>
        <Input onChange={this.handleChange} value={this.state.input} handleSubmit={this.handleSubmit}/>
        {tasksArr}
        <Footer tasks={this.state.tasks} clearDone={this.clearDone}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("target"));

