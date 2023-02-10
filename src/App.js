import logo from "./logo.svg";
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import "./App.css";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const Todos = ({todos}) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button
                className="checkbox"
                onClick={() => modifyStatusTodo(todo)}
                style={{backgroundColor: todo.status ? "#A879E6" : "white"}}
              ></button>
              <p>{todo.name}</p>
              <button>
                <AiOutlineEdit
                  size={20}
                  color={"#64697b"}
                  onClick={() => handleWithEditButtonClick(todo)}
                ></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  async function getTodos() {
    const response = await axios.get(
      "http://localhost/app-backend-api.vercel.app/todos"
    );
    setTodos(response.data);
  }

  async function handleWithNewButton() {
    setInputVisbility(!inputVisbility);
  }
  async function createTodo() {
    const response = await axios.post(
      "http://localhost/app-backend-api.vercel.app/todos",
      {
        name: inputValue,
      }
    );
    getTodos();
    setInputVisbility(!inputVisbility);
    setInputValue("");
  }

  async function modifyStatusTodo(todo) {
    const response = await axios.put(
      "http://localhost/app-backend-api.vercel.app/todos",
      {
        id: todo.id,
        status: !todo.status,
      }
    );
    getTodos();
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisbility(true);
  }

  async function editTodo() {
    const response = await axios.put(
      "http://localhost/app-backend-api.vercel.app/todos",
      {
        id: selectedTodo.id,
        name: inputValue,
      }
    );
    setSelectedTodo();
    setInputVisbility(false);
    setInputValue("");
    getTodos();
  }

  async function deleteTodo(todo) {
    await axios.delete(
      `http://localhost/app-backend-api.vercel.app/todos/${todo.id}`
    );
    getTodos();
  }
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisbility, setInputVisbility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Dont be lazzy</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input
          value={inputValue}
          style={{display: inputVisbility ? "block" : "none"}}
          className="inputName"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        ></input>
        <button
          className="newTaskButton"
          onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo()
                : createTodo
              : handleWithNewButton
          }
        >
          {inputVisbility ? "Confirm" : "+ New task"}
        </button>
      </header>
    </div>
  );
}

export default App;
