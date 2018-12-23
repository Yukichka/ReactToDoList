import React from "react";
import data from "./data";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos:data };
    this.doUpdate = this.doUpdate.bind(this);
  }

  doUpdate () {
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
  
  

  render () {
    console.log('state.todos', this.state.todos);
    return (
      <div>
        <h1>To do list</h1>
        <button onClick={this.doUpdate}>Update</button>
        <ul>
          {this.state.todos.map(todo => 
            <li>
              <input type={'checkbox'} name={''} checked={todo.completed} />
              {todo.title}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;