import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import { useEffect, useMemo, useRef } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  // const [name, setName] = useState('');
  const [name, setName] = useLocalStorage('name', '');

  const nameInputElement = useRef(null);

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     title: 'Finish React Series',
  //     isComplete: false,
  //     isEditing: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Go Brocery',
  //     isComplete: true,
  //     isEditing: false,
  //   },
  //   {
  //     id: 3,
  //     title: 'Take over world',
  //     isComplete: false,
  //     isEditing: false,
  //   },
  // ]);

  const [todos, setTodos] = useLocalStorage('todos', []);

  // it is a counter it starts at 4 at the very begging of the project,
  // because we need a way to add a new one from the 3 hardcoded in todos state so the next one is four,
  // but in addTodo function it would assign the value and increase the counter for the next time it is called when user add a new todo

  // Now as it would not depend anymore from a piece of state... it depends on local storage and starts empty it would start in number 1 and addTodo still increase
  // the code does not change in the remaining methods because the custom hook behind the scenes relies on useState and useEffect so
  // it looks like it is not using it but it is in the custom hook

  // const [todoId, setTodoId] = useState(4);

  const [todoId, setTodoId] = useLocalStorage('todoIdForLocalStorage', 1);

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }

        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelTodoEdit(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function addTodo(title) {
    setTodos([
      ...todos,
      {
        id: todoId,
        title: title,
        isComplete: false,
      },
    ]);

    setTodoId(previousTodoId => previousTodoId + 1);
  }

  function remainingCalculation() {
    // The line below would help to simulate a slow calculation
    // This slow operation would runs when any piece of state is updated... this is not performant
    // Instead we can tight useMemo to cache the expense calculation and run it only when a piece of state is updated, in this case todos
    for (let index = 0; index < 200000000; index++) {}
    return todos.filter(todo => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodos() {
    setTodos(
      [...todos].map(todo => {
        todo.isComplete = true;
        return todo;
      })
    );
  }

  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    }
  }

  useEffect(() => {
    console.log(
      'this is the equivalent to componentDidUpdate, without any other second param, use effect is running whenever piece of state is running so it runs a lot...'
    );
  });

  useEffect(() => {
    console.log(
      'This is the equivalent to componentDidUpdate, use effect runs only when a specific piece of state is changing... in this case Todos'
    );
  }, [todos]);

  useEffect(() => {
    // This is the equivalent of componentDidMount effect would run when the component is mounted only once
    // This would focus an input when component is mounted
    nameInputElement.current.focus();
  }, []);

  useEffect(() => {
    // This is equivalent to componentDidUnmount
    console.log('Add something like an event listener');

    return function cleanUp() {
      console.log('Clean up and remove the hypothetic event listener ...');
    };

    // You can add a second param as empty array [] to run this once when the component mounts
    // Or tight it to a piece of state as [todos] would do, so it only works when component did unmount with todos state
  });

  function handleNameInput(event) {
    setName(event.target.value);
    // now unnecesary but useful if there are not useLocalStorage hook
    // localStorage.setItem('name', JSON.stringify(event.target.value));
  }

  useEffect(() => {
    // now unnecesary but useful if there are not useLocalStorage hook
    // setName(JSON.parse(localStorage.getItem('name') ?? ''));
  }, []);

  return (
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

          {name && <p className="name-label">Hello, {name}</p>}
        </div>

        <h2>Todo App</h2>

        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            cancelTodoEdit={cancelTodoEdit}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
