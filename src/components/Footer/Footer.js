import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilters from '../TasksFilters/TasksFilters';

export default class Footer extends Component {
  static defaultProps = {
    itemsLeft: 0,
    filters: [],
    filterTodos: () => {},
    clearCompleted: () => {},
  };

  render() {
    const { itemsLeft, filters, filterTodos, clearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">Items left: {itemsLeft}</span>
        <TasksFilters filters={filters} filterTodos={filterTodos} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  filters: PropTypes.array,
  filterTodos: PropTypes.func,
  clearCompleted: PropTypes.func,
};
