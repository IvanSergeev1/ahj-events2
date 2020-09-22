import Task from './Task';

export default class TaskStorage {
  constructor() {
    this.tasks = [];
  }

  addTask(name) {
    this.tasks.push(new Task(name, this.tasks.length));
  }
}
