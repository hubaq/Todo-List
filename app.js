just'use strict';

//  Selecting all the used DOM elements
const toggle = document.querySelector('.toggle');
const body = document.querySelector('body');
const input = document.querySelector('.todo-input');
const cont = document.querySelector('.cont');
const wrap = document.querySelector('.wrap');
const todoContainer = document.querySelector('.todo-container');
const existingDiv = document.querySelector('.down');
const downGap = document.querySelector('.down__gap');
const down = document.querySelector('.down');
const theButtons = document.querySelectorAll('.elements');
const toastSection = document.querySelector('#display__toast');
const toastTemplate = document.querySelector('#toast__template');
const toastContainer = document.querySelector('.toast__container');
const toastImage = document.querySelector('.toast__image');
const toastMessage = document.querySelector('.toast__message');
const closeToastBtn = document.querySelector('.close__toast');
const completed = document.querySelector('.completed');
const All = document.querySelector('.all');
const clear = document.querySelector('.clear');
const active = document.querySelector('.active');

//  Array of tasks
let newDivs = [];

//  Handling the change of status for individual task
// function handleChangeStatus(p, newDiv, span)
//  Adding task to the todo list
function handleAddTask(task) {
  if (task.key === 'Enter') {
    if (input.value !== '') {
      const { newDiv } = createDiv();
      newDiv;
      const len = document.querySelector('.length');
      len.textContent = `${newDivs.length} items left`;
      input.value = '';
      showToast('Task Added Successfully!', 'success');
      return newDiv;
    } else {
      showToast('The Input Value Cannot be Empty!', 'error');
    }
  }
}

//  Adding Display class to the body elements using the toggle
function handleAddDisplay() {
  const changes = document.querySelectorAll('.change');
  body.classList.add('display');
  down.style.setProperty('--after-background-color', 'var(--very-light-gray)');
  toggle.src = 'images/icon-moon.svg';
  wrap.classList.add('display');
  input.style.color = 'var(--very-dark-blue)';
  cont.classList.add('display');
  changes.forEach(change => {
    change.style.color = 'var(--very-dark-blue)';
  });
  todoContainer.style.backgroundColor = 'var(--very-light-gray)';
  downGap.style.backgroundColor = 'var(--very-light-gray)';
  todoContainer.style.boxShadow = '0px 0px 3px rgba(0,0,0,0.4)';

  down.style.setProperty('--box-shadow', '0px 0px 3px rgba(0,0,0,0.4)');
  document.querySelector('.header').style.backgroundImage = 'url(images/bg-desktop-light.jpg)';
  changes.forEach(change => {
    change.style.color = 'var(--very-dark-blue)';
  });
}

//  Removing the display class using the toggle
function handleRemoveDisplay() {
  const changes = document.querySelectorAll('.change');
  body.classList.remove('display');
  down.style.setProperty('--after-background-color', 'var(--very-dark-desaturated-blue)');
  todoContainer.style.backgroundColor = 'var(--very-dark-desaturated-blue)';
  downGap.style.backgroundColor = 'var(--very-dark-desaturated-blue)';
  changes.forEach(change => {
    change.style.color = 'var(--very-light-gray)';
  });
  wrap.classList.remove('display');
  input.style.color = 'var(--very-light-gray)';
  cont.classList.remove('display');
  toggle.src = 'images/icon-sun.svg';
  document.querySelector('.header').style.backgroundImage = 'url(images/bg-desktop-dark.jpg)';
}

//  Displaying only the completed tasks
function handleCompleted() {
  const hasCompletedTasks = newDivs.some(newDiv => newDiv.classList.contains('clicked'));

  if (hasCompletedTasks) {
    newDivs.forEach(newDiv => {
      if (!newDiv.classList.contains('clicked')) {
        display(newDiv, 'none');
      } else {
        display(newDiv, 'flex');
      }
    });
  }
}

//  Toggling between dark and light mode
function handleToggle() {
  if (!body.classList.contains('display')) {
    handleAddDisplay();
  } else if (body.classList.contains('display')) {
    handleRemoveDisplay();
  }
}

//  Showing the Active tasks only
function handleActive() {
  const notCompleted = newDivs.filter(newDiv => !newDiv.classList.contains('clicked'));

  if (notCompleted) {
    newDivs.forEach(newDiv => {
      if (newDiv.classList.contains('clicked')) {
        display(newDiv, 'none');
      } else {
        display(newDiv, 'flex');
      }
    });
  }
}

//  Clearing or deleting the completed tasks at once
function handleClear() {
  const len = document.querySelector('.length');
  const completedDivs = todoContainer.querySelectorAll('.clicked');
  newDivs = newDivs.filter(newDiv => !newDiv.classList.contains('clicked'));
  // Update the items left count

  len.textContent = `${newDivs.length} items left`;

  completedDivs.forEach(completedDiv => {
    todoContainer.removeChild(completedDiv);
  });
  showToast('Completed Tasks Cleared!', 'error');
}

//  Manipulating the display property
function display(value, displayValue) {
  value.style.display = displayValue;
}

function handleDeleteTask(imgg) {
  const divToRemove = imgg.parentNode;
  const len = document.querySelector('.length');
  todoContainer.removeChild(divToRemove);
  newDivs = newDivs.filter(div => div !== divToRemove);

  len.textContent = `${newDivs.length} items left`;
  showToast('Task Deleted Successfully!', 'error');
}

//  Creating new Task Div
const createDiv = function () {
  const newDiv = document.createElement('div');
  const separator = document.createElement('div');
  const span = document.createElement('span');
  const p = document.createElement('p');
  const imgg = document.createElement('img');

  separator.className = 'separate';
  newDiv.className = 'rect';
  span.className = 'label';
  span.setAttribute('for', 'checkbox');
  p.className = 'change';
  p.textContent = input.value;
  imgg.src = 'images/icon-cross.svg';
  imgg.className = 'image';

  if (body.classList.contains('display')) {
'use strict';

// Selecting all the DOM elements
const DOM = {
  toggle: document.querySelector('.toggle'),
  body: document.querySelector('body'),
  input: document.querySelector('.todo-input'),
  todoContainer: document.querySelector('.todo-container'),
  existingDiv: document.querySelector('.down'),
  down: document.querySelector('.down'),
  downGap: document.querySelector('.down__gap'),
  wrap: document.querySelector('.wrap'),
  cont: document.querySelector('.cont'),
  changes: () => document.querySelectorAll('.change'),
  header: document.querySelector('.header'),
  len: document.querySelector('.length'),
  toastSection: document.querySelector('#display__toast'),
  toastTemplate: document.querySelector('#toast__template'),
  completed: document.querySelector('.completed'),
  all: document.querySelector('.all'),
  clear: document.querySelector('.clear'),
  active: document.querySelector('.active'),
};

// Global state
let newDivs = [];

// Utility function to manipulate display property
const setDisplay = (element, displayValue) => {
  element.style.display = displayValue;
};

// Show toast notification
const showToast = (message, type) => {
  const toast = createToast(message, type);
  DOM.toastSection.prepend(toast);
};

// Create a toast element
const createToast = (message, type) => {
  const toast = DOM.toastTemplate.content.cloneNode(true);
  const toastContainer = toast.querySelector('.toast__container');
  const toastMessage = toast.querySelector('.toast__message');
  const toastImage = toast.querySelector('.toast__image');
  const closeToastBtn = toast.querySelector('.close__toast');

  toastMessage.textContent = message;
  toastContainer.classList.add(type);
  toastImage.innerHTML = type === 'success' ? `<span class="mark">&checkmark;</span>` : `<span class="error">&times;</span>`;
  
  closeToastBtn.addEventListener('click', () => removeToast(toastContainer));
  setTimeout(() => removeToast(toastContainer), 2000);

  return toast;
};

// Remove toast element
const removeToast = toastElement => {
  toastElement.classList.add('remove');
  setTimeout(() => toastElement.remove(), 200);
};

// Update the task count
const updateTaskCount = () => {
  DOM.len.textContent = `${newDivs.length} items left`;
};

// Add a new task
const handleAddTask = event => {
  if (event.key === 'Enter' && DOM.input.value.trim() !== '') {
    const { newDiv } = createTaskDiv(DOM.input.value.trim());
    newDivs.push(newDiv);
    updateTaskCount();
    DOM.input.value = '';
    showToast('Task Added Successfully!', 'success');
  } else if (event.key === 'Enter') {
    showToast('The Input Value Cannot Be Empty!', 'error');
  }
};

// Create a task div
const createTaskDiv = taskText => {
  const newDiv = document.createElement('div');
  newDiv.className = 'rect';

  const separator = document.createElement('div');
  separator.className = 'separate';

  const span = document.createElement('span');
  span.className = 'label';
  
  const p = document.createElement('p');
  p.className = 'change';
  p.textContent = taskText;

  const deleteIcon = document.createElement('img');
  deleteIcon.src = 'images/icon-cross.svg';
  deleteIcon.className = 'image';

  applyThemeToTask(p);

  // Event Listeners
  deleteIcon.addEventListener('click', () => handleDeleteTask(newDiv));
  span.addEventListener('click', () => toggleTaskStatus(newDiv, p, span));

  // Append elements
  separator.append(span, p);
  newDiv.append(separator, deleteIcon);
  DOM.todoContainer.insertBefore(newDiv, DOM.existingDiv);

  return { newDiv };
};

// Toggle task status
const toggleTaskStatus = (taskDiv, textElement, spanElement) => {
  const isCompleted = taskDiv.classList.toggle('clicked');
  spanElement.classList.toggle('add', isCompleted);
  textElement.style.textDecoration = isCompleted ? 'line-through' : 'none';
  applyThemeToTask(textElement, isCompleted);
};

// Apply theme styles to a task
const applyThemeToTask = (element, isCompleted = false) => {
  const isLightMode = DOM.body.classList.contains('display');
  element.style.color = isCompleted
    ? 'var(--very-dark-grayish-blue)'
    : isLightMode
    ? 'var(--very-dark-blue)'
    : 'var(--very-light-gray)';
};

// Delete a task
const handleDeleteTask = taskDiv => {
  DOM.todoContainer.removeChild(taskDiv);
  newDivs = newDivs.filter(div => div !== taskDiv);
  updateTaskCount();
  showToast('Task Deleted Successfully!', 'error');
};

// Clear completed tasks
const handleClearCompleted = () => {
  newDivs = newDivs.filter(div => {
    if (div.classList.contains('clicked')) {
      DOM.todoContainer.removeChild(div);
      return false;
    }
    return true;
  });
  updateTaskCount();
  showToast('Completed Tasks Cleared!', 'success');
};

// Filter tasks
const filterTasks = filter => {
  newDivs.forEach(div => {
    const isVisible =
      filter === 'all' ||
      (filter === 'completed' && div.classList.contains('clicked')) ||
      (filter === 'active' && !div.classList.contains('clicked'));
    setDisplay(div, isVisible ? 'flex' : 'none');
  });
};

// Toggle light/dark mode
const toggleTheme = () => {
  DOM.body.classList.toggle('display');
  applyThemeToAllTasks();
};

// Apply theme to all tasks
const applyThemeToAllTasks = () => {
  const isLightMode = DOM.body.classList.contains('display');
  DOM.changes().forEach(el => {
    el.style.color = isLightMode ? 'var(--very-dark-blue)' : 'var(--very-light-gray)';
  });
};

// Event Listeners
DOM.input.addEventListener('keydown', handleAddTask);
DOM.toggle.addEventListener('click', toggleTheme);
DOM.completed.addEventListener('click', () => filterTasks('completed'));
DOM.all.addEventListener('click', () => filterTasks('all'));
DOM.clear.addEventListener('click', handleClearCompleted);
DOM.active.addEventListener('click', () => filterTasks('active'));
