import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TasksList/TaskList';
import Footer from '../Footer/Footer';

export default class TodoApp extends Component {
  maxId = 100;

  state = {
    selected: 'All',
    tasksForDisplay: [],
    tasks: [],
    filters: [
      { text: 'All', selected: true },
      { text: 'Active', selected: false },
      { text: 'Completed', selected: false },
    ],
  };

  onDelete = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((el) => el.id === id);
      const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

      return {
        tasks: newTasks,
        tasksForDisplay: this.showTasks(undefined, newTasks),
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((el) => el.completed === false);

      return {
        tasks: newTasks,
        tasksForDisplay: this.showTasks(undefined, newTasks),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const index1 = tasks.findIndex((el) => el.id === id);
      const newTasks = [...tasks];
      newTasks[index1].completed = !newTasks[index1].completed;

      return {
        tasks: newTasks,
        tasksForDisplay: this.showTasks(undefined, newTasks),
      };
    });
  };

  addTodo = (text) => {
    this.maxId++;

    const task = {
      text: text,
      completed: false,
      id: this.maxId,
      createDate: new Date(),
      editing: false,
    };

    this.setState(({ tasks }) => {
      const newTasks = [...tasks.slice(0)];
      newTasks.push(task);

      return {
        tasks: newTasks,
        tasksForDisplay: this.showTasks(undefined, newTasks),
      };
    });
  };

  onEditing = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((el) => el.id === id);
      const newTasks = [...tasks.slice(0)];
      newTasks[index].editing = true;

      return {
        tasks: newTasks,
        tasksForDisplay: this.showTasks(undefined, newTasks),
      };
    });
  };

  showTasks = (selected = this.state.selected, tasks = this.state.tasks) => {
    if (selected === 'All') {
      return tasks;
    } else {
      return tasks.filter((el) => (el.completed === (selected === 'Completed') ? true : false));
    }
  };

  filterTodos = (selected = 'All') => {
    this.setState(({ filters, tasks }) => {
      const index = filters.findIndex((el) => el.text === selected);
      const newFilters = [];
      filters.forEach((el) => {
        el.selected = false;
        newFilters.push(el);
      });

      newFilters[index].selected = true;

      return {
        tasksForDisplay: this.showTasks(selected, tasks),
        selected: selected,
        filters: newFilters,
      };
    });
  };

  changeTask = (key, newText, id) => {
    const tasks = this.state.tasks;
    const index = tasks.findIndex((el) => el.id === id);
    const newTasks = [...tasks.slice(0)];
    const task = newTasks[index];

    if (key === 'Escape') {
      task.editing = false;
      this.setState({ tasks: newTasks, tasksForDisplay: this.showTasks(undefined, newTasks) });
      return;
    }

    if (key === 'Enter' && newText.trim().length === 0) {
      this.onDelete(id);
      return;
    }

    this.setState(() => {
      task.editing = false;
      task.text = newText;

      return {
        tasks: newTasks,
        tasksForDisplay: this.showTasks(undefined, newTasks),
      };
    });
  };

  render() {
    const { tasks, tasksForDisplay, filters } = this.state;

    const itemsLeft = tasks.filter((el) => el.completed === false).length;

    return (
      <section className="todoapp">
        <h1>todoapp</h1>
        <NewTaskForm addTodo={this.addTodo} />
        <TaskList
          tasks={tasksForDisplay}
          onEditing={this.onEditing}
          changeTask={this.changeTask}
          onDelete={this.onDelete}
          onToggleDone={this.onToggleDone}
        />
        <Footer
          itemsLeft={itemsLeft}
          filterTodos={this.filterTodos}
          filters={filters}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
