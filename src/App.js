import React from "react";
import data from "./data";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos:data };
  }

  doUpdate = () => {
    console.log('clicked!')
  }
   

  render () {
    console.log(data);
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