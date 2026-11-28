const initialTasks = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const taskTextElements = listElement.getElementsByClassName("to-do__item-text");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const template = document.querySelector("#to-do__item-template");
const itemTemplate = template.content.querySelector(".to-do__item");
const storageKey = "tasks";

function loadTasks() {
  const savedTasks = localStorage.getItem(storageKey);
  return savedTasks === null ? initialTasks : JSON.parse(savedTasks);
}

function getTasksFromDOM() {
  return Array.from(taskTextElements, (textElement) => textElement.textContent);
}

function saveTasks(tasks) {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function addTask(task) {
  listElement.prepend(createItem(task));
  saveTasks(getTasksFromDOM());
}

function createItem(task) {
  const itemElement = itemTemplate.cloneNode(true);
  const textElement = itemElement.querySelector(".to-do__item-text");
  const deleteButton = itemElement.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = itemElement.querySelector(".to-do__item-button_type_duplicate");
  const editButton = itemElement.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = task;

  deleteButton.addEventListener("click", () => {
    itemElement.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener("click", () => {
    addTask(textElement.textContent);
  });

  editButton.addEventListener("click", () => {
    textElement.contentEditable = true;
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.contentEditable = false;
    saveTasks(getTasksFromDOM());
  });

  return itemElement;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const task = inputElement.value.trim();

  if (task) {
    addTask(task);
    formElement.reset();
  }
}

formElement.addEventListener("submit", handleFormSubmit);

loadTasks().forEach((task) => {
  listElement.append(createItem(task));
});
