import React from 'react';
import PropTypes from 'prop-types';

TodoClearCompleted.protoType = {
  clearCompleted: PropTypes.func.isRequired,
};

function TodoClearCompleted(props) {
  return (
    <button className="button" onClick={() => props.clearCompleted()}>
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
