import TaskList from './TaskList';
import TaskStorage from './TaskStorage';

export default class TaskApp {
  constructor() {
    this.taskList = new TaskList();
    this.taskStorage = new TaskStorage();
    this.form = document.getElementById('task-form');
    this.input = document.getElementById('task-input');
    this.error = document.getElementById('error');
    this.close = document.getElementById('close');
  }

  init() {
    this.taskList.draw(this.taskStorage.tasks);
    this.action();
  }

  action() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this.input.value === '') {
        this.error.classList.add('error-active');
        return;
      }

      this.taskStorage.addTask(this.input.value);
      this.input.value = '';
      this.taskList.draw(this.taskStorage.tasks);
    });

    this.taskList.allTasks.addEventListener('click', (event) => {
      if (event.target.classList.contains('pinned')) {
        this.switchTask(event.target.closest('.task').dataset.id, true);
      }
    });

    this.taskList.pinnedTasks.addEventListener('click', (event) => {
      if (event.target.classList.contains('pinned')) {
        this.switchTask(event.target.closest('.task').dataset.id, false);
      }
    });

    this.input.addEventListener('input', () => {
      this.filterTask(this.input.value);
    });

    this.close.addEventListener('click', () => {
      this.error.classList.remove('error-active');
    });
  }

  filterTask(text) {
    this.filterTasks = this.taskStorage.tasks.filter((el) => {
      const filterText = text.trim();
      return el.name.toLowerCase().includes(filterText.toLowerCase()) || el.pinned;
    });
    this.taskList.draw(this.filterTasks);
  }

  switchTask(id, pinned) {
    this.taskStorage.tasks[id].pinned = pinned;
    this.taskList.draw(this.taskStorage.tasks);
    this.filterTask(this.input.value);
  }
}
