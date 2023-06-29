import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    onToggleDone: () => {},
    onDelete: () => {},
    onEditing: () => {},
    changeTask: () => {},
    completed: false,
    createDate: new Date(),
    editing: false,
    id: 0,
    text: '',
  };

  render() {
    const { onToggleDone, onDelete, onEditing, changeTask, completed, createDate, id, editing, text } = this.props;
    const liClass = editing ? 'editing' : completed ? 'completed' : undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') e.target.value = text;
      if (e.key === 'Enter' || e.key === 'Escape') changeTask(e.key, e.target.value, id);
    };

    return (
      <li className={liClass}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" />

          <label htmlFor={id} onClick={onToggleDone}>
            <span className="description">{text}</span>
            <span className="created">
              {formatDistanceToNow(createDate, { addSuffix: true, includeSeconds: true })}
            </span>
          </label>

          <button className="icon icon-edit" onClick={onEditing}></button>

          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        <input onChange={() => {}} onKeyDown={onKeyDown} type="text" className="edit" defaultValue={text} autoFocus />
      </li>
    );
  }
}

Task.propTypes = {
  onToggleDone: PropTypes.func,
  onDelete: PropTypes.func,
  onEditing: PropTypes.func,
  changeTask: PropTypes.func,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  createDate: PropTypes.object,
  id: PropTypes.number,
  text: PropTypes.string,
};
