const toDoForm = document.querySelector(".js-form");
const toDoInput = document.querySelector("input");
const toDoList = document.querySelector(".todo__list");
const toDoneList = document.querySelector(".todo__done");
const toDoDelete = document.querySelector(".todo__delete");
const toDoneDelete = document.querySelector(".todo__done-delete");

let listArray = [];
let doneArray = [];

function HandleSubmit(event) {
  event.preventDefault();
  const cuurentValue = toDoInput.value;
  toDoInput.value = "";
  PaintToDoList(cuurentValue);
}

function PaintToDoList(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const sucBtn = document.createElement("button");
  const newId = listArray.length + 1;
  delBtn.addEventListener("click", HandleDelete);
  sucBtn.addEventListener("click", HandleSucces);
  span.innerText = text;
  delBtn.innerText = "✖";
  sucBtn.innerText = "✔";
  sucBtn.style.color = "green";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(sucBtn);
  li.id = newId;
  delBtn.id = newId;
  toDoList.prepend(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  listArray.push(toDoObj);
  saveToDos();
}

function HandleSucces(event) {
  const currentNode = event.target.parentNode;
  toDoList.removeChild(currentNode);
  const cleanArray = listArray.filter(function (arr) {
    return arr.id !== parseInt(currentNode.id);
  });
  listArray = cleanArray;
  saveToDos();
  paintDoneList(event.target.parentNode.childNodes[0].innerText);
}

function paintDoneList(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = doneArray.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.id = newId;
  toDoneList.appendChild(li);
  const doneObj = {
    text: text,
    id: newId,
  };
  doneArray.push(doneObj);
  saveDone();
}

function loadDone() {
  const currentDone = localStorage.getItem("done");
  const parsedDone = JSON.parse(currentDone);
  parsedDone.forEach(function (item) {
    paintDoneList(item.text);
  });
}

function saveDone() {
  localStorage.setItem("done", JSON.stringify(doneArray));
}

function HandleDelete(event) {
  const currentNode = event.target.parentNode;
  toDoList.removeChild(currentNode);
  const cleanArray = listArray.filter(function (arr) {
    return arr.id !== parseInt(currentNode.id);
  });
  listArray = cleanArray;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(listArray));
}

function loadToDos() {
  const loadedTodos = localStorage.getItem("todos");
  const parsedTodos = JSON.parse(loadedTodos);
  parsedTodos.forEach(function (item) {
    PaintToDoList(item.text);
  });
}

function HandleDoneDelete() {
  localStorage.setItem("done", "[]");
  while (toDoneList.hasChildNodes()) {
    toDoneList.removeChild(toDoneList.firstChild);
  }
}

function HandleToDoDelete() {
  localStorage.setItem("todos", "[]");
  while (toDoList.hasChildNodes()) {
    toDoList.removeChild(toDoList.firstChild);
  }
}

function init() {
  toDoForm.addEventListener("submit", HandleSubmit);
  toDoneDelete.addEventListener("click", HandleDoneDelete);
  toDoDelete.addEventListener("click", HandleToDoDelete);
  if (localStorage.getItem("todos") !== null) {
    loadToDos();
  }
  if (localStorage.getItem("done") !== null) {
    loadDone();
  }
}
init();
