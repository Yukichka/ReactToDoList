import React from "react";
import data from "./data";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos:data };
    this.doUpdate = this.doUpdate.bind(this);
    this.doAdd = this.doAdd.bind(this);
  }

  doUpdate(){
    console.log('clicked!')
    fetch(`http://todo-backend-express.herokuapp.com`)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        this.setState({
          todos: json
        });
      })
  }

  componentDidMount(){
    this.doUpdate();
  }

  doDelete(todo){
    console.log('delete!', todo)
    fetch(todo.url, {
      method: 'DELETE'
    }).then(this.doUpdate)
  }
  

  doAdd(){
    console.log('Add!')
    var payload = { "title": document.getElementById("newToDo").value , "completed": false }
    fetch('http://todo-backend-express.herokuapp.com/', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this.doUpdate)
  }
  

  render () {
    console.log('state.todos', this.state.todos);
    return (
      <div>
        <h1>To do list</h1>
        <input type = "text" name = "newtodo" id = "newToDo" placeholder = "What else...? Put here"/>
        <button onClick={this.doAdd}>Add</button>
        <button onClick={this.doUpdate}>Update</button>
        <ul>
          {this.state.todos.map(todo => 
            <li>
              <input type={'checkbox'} name={''} checked={todo.completed} />
              {todo.title}
              <button onClick={() => this.doDelete(todo)}>Delete</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;