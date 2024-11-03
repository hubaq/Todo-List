'use strict';

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
    p.style.color = 'var(--very-dark-blue)';
  } else {
    p.style.color = 'var(--very-light-gray)';
  }

  let clicked = false;
  separator.appendChild(span);
  separator.appendChild(p);
  newDiv.appendChild(separator);
  newDiv.appendChild(imgg);
  todoContainer.insertBefore(newDiv, existingDiv);
  newDivs.push(newDiv);

  //  Adding Click Event Listener to the delete button
  imgg.addEventListener('click', () => handleDeleteTask(imgg));

  // Adding Click Event Listener to the change status button
  span.addEventListener('click', () => {
    if (!clicked) {
      p.style.textDecoration = 'line-through';
      p.style.color = 'var(--very-dark-grayish-blue)';
      newDiv.classList.add('clicked');
      span.classList.add('add');
      clicked = true;
    } else {
      p.style.textDecoration = 'none';
      if (body.classList.contains('display')) {
        p.style.color = 'var(--very-dark-blue)';
      } else {
        p.style.color = 'var(--very-light-gray)';
      }
      span.classList.remove('add');
      newDiv.classList.remove('clicked');
      clicked = false;
    }
  });

  return { newDiv, p };
};

//  Adding Keydown Event Listener to the todo input by pressing enter key
input.addEventListener('keydown', e => {
  handleAddTask(e);
});

//  Toggling the dark and light mode
toggle.addEventListener('click', handleToggle);

completed.addEventListener('click', handleCompleted);

All.addEventListener('click', () => {
  newDivs.forEach(newDiv => {
    display(newDiv, 'flex');
  });
});

clear.addEventListener('click', handleClear);
active.addEventListener('click', handleActive);

//  Showing the notification pop-up
function showToast(message, type) {
  toastSection.prepend(createToast(message, type));
}
const toast = toastTemplate.content.cloneNode(true);
console.log(toast);

function createToast(message, type) {
  const toast = toastTemplate.content.cloneNode(true);
  toast.querySelector('.toast__message').textContent = message;
  toast.querySelector('.toast__container').classList.add(type);
  if (type === 'success') {
    toast.querySelector('.toast__image').innerHTML = `<span class="mark">&checkmark;</span>`;
  } else if (type === 'error') {
    toast.querySelector('.toast__image').innerHTML = `<span class="error">&times;</span>`;
  }
  toast.querySelector('.close__toast').addEventListener('click', removeToast);
  toast.addEventListener('mouseover', removeToast);
  const toastEl = toast.querySelector('.toast__container');

  setTimeout(removeToast, 2000);

  async function removeToast() {
    toastEl.classList.add('remove');
    await new Promise(resolve => setTimeout(resolve, 200));
    toastEl.remove();
  }

  return toast;
}
