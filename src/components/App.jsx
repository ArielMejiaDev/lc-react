import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import { useEffect, useMemo, useRef, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

function App() {
  const [name, setName] = useLocalStorage('name', '');

  const nameInputElement = useRef(null);

  const [todos, setTodos] = useLocalStorage('todos', []);

  const [todoId, setTodoId] = useLocalStorage('todoIdForLocalStorage', 1);

  const [filter, setFilter] = useState('all');

  function todosFiltered() {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    }
  }

  useEffect(() => {
    nameInputElement.current.focus();
  }, []);

  function handleNameInput(event) {
    setName(event.target.value);
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        todoId,
        setTodoId,
        filter,
        setFilter,
        todosFiltered,
      }}
    >
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-container">
            <h2>What's your name?</h2>
            {/* <button onClick={() => nameInputElement.current.focus()}>
              Get Ref
            </button> */}
            <form action="#">
              <input
                type="text"
                className="todo-input"
                placeholder="Whats your name"
                ref={nameInputElement}
                defaultValue={name}
                onChange={handleNameInput}
              />
            </form>

            <CSSTransition
              in={name.length > 0}
              timeout={300}
              classNames="slide-horizontal"
              unmountOnExit
            >
              <p className="name-label">Hello, {name}</p>
            </CSSTransition>
          </div>

          <h2>Todo App</h2>

          <TodoForm />

          <SwitchTransition mode="out-in">
            <CSSTransition
              key={todos.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountedOnExit
            >
              {todos.length > 0 ? <TodoList /> : <NoTodos />}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
