class Task {
    constructor(id, text, done = false) {
      this.id = id;
      this.text = text;
      this.done = done;
    }

    toggle() {
      this.done = !this.done;
    }
  }

  class TodoList {
    #tasks;
    #nextId;

    constructor() {
      this.#tasks = [];
      this.#nextId = 1;
    }

    add(text) {
      if (typeof text !== 'string' || !text.trim()) return null;
      const task = new Task(this.#nextId++, text.trim());
      this.#tasks.push(task);
      return task;
    }

    remove(id) {
      const index = this.#tasks.findIndex(task => task.id === Number(id));
      if (index === -1) return false;
      this.#tasks.splice(index, 1);
      return true;
    }

    getActive() {
      return this.#tasks.filter(task => task.done === false);
    }

    getAll() {
      return [...this.#tasks];
    }

    toggle(id) {
      const task = this.#tasks.find(task => task.id === Number(id));
      if (!task) return false;
      task.toggle();
      return true;
    }
  }

  const todoList = new TodoList();

  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');

  function renderTasks() {
    taskList.innerHTML = todoList.getAll().map(task => `
      <li data-id="${task.id}" style="cursor:pointer; text-decoration:${task.done ? 'line-through' : 'none'};">
        ${task.text} ${task.done ? '✓' : ''}
      </li>
    `).join('');
  }

  addBtn.addEventListener('click', () => {
    const text = taskInput.value;
    const task = todoList.add(text);
    if (task) {
      taskInput.value = '';
      renderTasks();
    }
  });

  taskList.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return;
    const id = event.target.dataset.id;
    todoList.toggle(id);
    renderTasks();
  });

  renderTasks();