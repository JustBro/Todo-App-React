import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

export default class TaskList extends Component {
  static defaultProps = {
    onToggleDone: () => {},
    onDelete: () => {},
    changeTask: () => {},
    tasks: [],
  };

  render() {
    const { tasks, onDelete, onEditing, onToggleDone, changeTask } = this.props;

    const elements = tasks.map((task) => (
      <Task
        onDelete={() => onDelete(task.id)}
        onEditing={() => onEditing(task.id)}
        onToggleDone={() => onToggleDone(task.id)}
        changeTask={changeTask}
        key={task.id}
        {...task}
      />
    ));

    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.propTypes = {
  onToggleDone: PropTypes.func,
  onDelete: PropTypes.func,
  changeTask: PropTypes.func,
  tasks: PropTypes.array,
};
