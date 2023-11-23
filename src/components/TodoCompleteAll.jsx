import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TodosContext } from '../context/TodosContext';

TodoCompleteAll.propTypes = {
  completeAllTodos: PropTypes.func.isRequired,
};

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
