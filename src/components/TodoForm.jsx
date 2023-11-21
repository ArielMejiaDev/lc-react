import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('');

  function handleTodoInput(event) {
    setTodoInput(event.target.value);
  }

  function handleTodoSubmit(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    props.addTodo(todoInput);

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={handleTodoSubmit}>
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
