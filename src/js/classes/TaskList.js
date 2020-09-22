export default class TaskList {
  constructor() {
    this.pinnedTasks = document.getElementById('pinned');
    this.allTasks = document.getElementById('all');
  }

  draw(tasks) {
    this.pinnedTasks.innerHTML = '';
    this.allTasks.innerHTML = '';

    tasks.forEach((el) => {
      const task = document.createElement('div');
      task.classList.add('task');
      task.dataset.id = el.id;
      const check = el.pinned ? 'V' : '';
      task.innerHTML = `<p>${el.name}<p><span class='pinned'>${check}</span>`;

      if (el.pinned) {
        this.pinnedTasks.appendChild(task);
      } else {
        this.allTasks.appendChild(task);
      }
    });

    if (!tasks.some((el) => el.pinned)) {
      this.pinnedTasks.innerHTML = '<p>No pinned tasks</p>';
    }

    if (tasks.every((el) => el.pinned)) {
      this.allTasks.innerHTML = '<p>No tasks found</p>';
    }
  }
}
