import "./styles.css";
import { FormEventHandler, useState } from "react";

export default function App() {
  //is sth called a hook
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([])
  //state is the magic how react works so well
  //states are immutable so I can not change them
  //doing a new state will reload everything...
  // setNewItem("sdf")
  interface Todo {
    id: string;
    title: number;
    completed: boolean;
  }

  //Todo: change this away from any
  function handleSubmit(e: any){
    e.preventDefault()

    //somehow there is a difference between passing a state in a funciton that sth
    //else…. check in video at https://www.youtube.com/watch?v=Rh3tobg7hEo&t=1320s
    setTodos( (currentTodos: any[])  => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(), title: newItem, completed: false
        },
      ]
    })

    //with spreading out and than creating another element 
    //we can "add" sth to this array eventhough it is immutable
    // setTodos([
    //   todos,
    //    {
    //       id: crypto.randomUUID(),
    //       title: newItem,
    //       completed: false
    //     },
    //    ])
    

  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            //will rerender the entire component
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">TodoList</h1>
      <ul className="list">
        {todos.map((todo) => {
         return <li>
            <label>
              <input type="checkbox" />
              {todo.title}
            </label>
            <button className="btn btn-danger">Delete</button>
          </li>;
        })}
      </ul>
    </>
  );
}
