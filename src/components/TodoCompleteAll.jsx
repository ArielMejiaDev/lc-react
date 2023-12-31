import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoCompleteAll() {
  const { todos, setTodos } = useContext(TodosContext);

  function completeAllTodos() {
    setTodos(
      [...todos].map(todo => {
        todo.isComplete = true;
        return todo;
      })
    );
  }

  return (
    <div>
      <div className="button" onClick={() => completeAllTodos()}>
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAll;
