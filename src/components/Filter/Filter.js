import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filter extends Component {
  static defaultProps = {
    text: '',
    selected: false,
    filterTodos: () => {},
  };

  render() {
    const { text, selected, filterTodos } = this.props;

    return (
      <li>
        <button className={selected ? 'selected' : ''} onClick={filterTodos}>
          {text}
        </button>
      </li>
    );
  }
}

Filter.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.bool,
  filterTodos: PropTypes.func,
};
