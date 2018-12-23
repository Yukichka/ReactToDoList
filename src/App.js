import React from "react";
import data from "./data";


class App extends React.Component {
  render () {
    console.log(data);
    return (
      <div>
        <h1>To do list</h1>
        <ul>
          {data.map(todo => 
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