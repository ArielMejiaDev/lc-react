import React, { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoForm() {
  // example of how to use context
  // const message = useContext(TodosContext);

  const { todos, setTodos, todoId, setTodoId } = useContext(TodosContext);

  const [todoInput, setTodoInput] = useState('');

  function handleTodoInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: todoId,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setTodoId(previousTodoId => previousTodoId + 1);

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={addTodo}>
      {/* Example of how to use context  */}
      {/* <span>{message}</span> */}
      <input
        type="text"
        value={todoInput}
        onChange={handleTodoInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
