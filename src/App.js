import React from "react";
import data from "./data";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos:data };
    this.doUpdate = this.doUpdate.bind(this);
    this.doAdd = this.doAdd.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  doUpdate(){
    console.log('clicked!')
    fetch(`http://todo-backend-express.herokuapp.com`)
      .then(resp => resp.json())
      .then(newTodos => {
        newTodos.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)); 

        console.log(newTodos)
        this.setState({
          todos: newTodos
        });
      })
  }

  componentDidMount(){
    this.doUpdate();
    setInterval(() => this.doUpdate(), 3000);
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
  
  onCheck(todo){
    
    //const oldStatus = todo.completed
    //todo.completed = !oldStatus
    //this.setState({todos: this.state.todos});

    // invert given flag
    const newStatus = !todo.completed;
    // send request to update flag
    var payload = { "completed": newStatus }
    fetch(todo.url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this.doUpdate)

  }


  render(){
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
              <input type={'checkbox'} name={''} checked={todo.completed} 
                onChange={() => this.onCheck(todo)}/>
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