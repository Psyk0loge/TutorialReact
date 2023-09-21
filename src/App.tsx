import "./styles.css";
import { FormEventHandler, useState } from "react";

export default function App() {
  //is sth called a hook
  //the values set here are only relevant when the page is reloaded... so for the
  //beginning it also limits that I can only give a string here(for first one)
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState<Todo[]>([])
  //state is the magic how react works so well
  //states are immutable so I can not change them
  //doing a new state will reload everything...
  // setNewItem("sdf")
  interface Todo{
    id: string,
    title: string,
    completed: boolean
  }

  //Todo: change this away from any
  function handleSubmit(e: any){
    e.preventDefault()

    //somehow there is a difference between passing a state in a funciton that sth
    //else…. check in video at https://www.youtube.com/watch?v=Rh3tobg7hEo&t=1320s
    setTodos( (currentTodos)  => [
      ...currentTodos,
      {
        id: crypto.randomUUID(), title: newItem, completed: false
      },
    ]);
    //sets the state of the input field back
    // setNewItem((newItem) =>
    //   newItem = ""
    // );
    //würde auch gehen mit:
    setNewItem("");
    // with spreading out and than creating another element 
    // we can "add" sth to this array eventhough it is immutable

    //everytime I want to make sure to use the current value I must use a function...
    //otherwise passing a value is okay aswell
  }

  function toggleTodo(id: string, completed: boolean){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          //todo.completed = completed would not work, cause not mutable
          //so make sure we create a new state
          console.log("Bs does not seem to work")
          return {...todo, completed}
        }
        console.log("no todo found with that id")
        return todo
      })
    })
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
         return <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed}
              onChange={(e) => toggleTodo(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            <button className="btn btn-danger">Delete</button>
          </li>;
        })}
      </ul>
    </>
  );
}
