import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addTodo: () => {},
  };

  state = {
    newTask: '',
  };

  onTodoEditing = (e) => {
    this.setState({ newTask: e.target.value });
  };

  onSubmit = (e) => {
    if (e.keyCode === 13) {
      const text = this.state.newTask.trim();

      if (text.length == 0) return;

      this.props.addTodo(text);

      this.setState({ newTask: '' });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={this.onTodoEditing}
        onKeyDown={this.onSubmit}
        value={this.state.newTask}
      ></input>
    );
  }
}

NewTaskForm.propTypes = {
  addTodo: PropTypes.func,
};
