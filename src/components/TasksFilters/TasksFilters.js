import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from '../Filter/Filter';

export default class TasksFilter extends Component {
  static defaultProps = {
    filters: [],
    filterTodos: () => {},
  };

  render() {
    const { filters, filterTodos } = this.props;

    const elements = [];

    filters.forEach(({ text, selected }) => {
      elements.push(
        <Filter
          key={text}
          filterTodos={(e) => {
            filterTodos(e.target.innerText);
          }}
          selected={selected}
          text={text}
        />
      );
    });

    return <ul className="filters">{elements}</ul>;
  }
}

TasksFilter.propTypes = {
  filters: PropTypes.array,
  filterTodos: PropTypes.func,
};
