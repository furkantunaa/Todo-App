const divTodos = document.getElementById("todos");
const formTodos = document.getElementById("formTodos");
const title = document.getElementById("title");
const txtTitle = document.getElementById("txtTitle");

let todos = [
  {
    title: "Do your homework",
    done: false,
  },
  {
    title: "Do shopping",
    done: false,
  },
  {
    title: "Take a walk",
    done: true,
  },
  {
    title: "watch Netfix",
    done: true,
  },
];

function listTodos() {
  todos.sort((a, b) => a.done - b.done);
  divTodos.innerHTML = "";
  saveDate();
  for (const todo of todos) {
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    if (todo.done) input.setAttribute("checked", todo.done);
    input.onchange = (e) => ToggleTodo(todo);
    div.append(input);
    let span = document.createElement("span");
    span.textContent = todo.title;
    div.append(span);
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.onclick = (e) => {
      deleteTodo(todo);
    };
    button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    div.append(button);
    divTodos.append(div);
  }
}

function saveDate() {
  localStorage["data"] = JSON.stringify(todos);
}

function loadData() {
  let json = localStorage.getItem("data");
  if (!json) return;
  todos = JSON.parse(json);
}

function ToggleTodo(todo) {
  todo.done = !todo.done;
  listTodos();
}

// SİLME İŞLEMİ
function deleteTodo(Todo) {
  let i = todos.indexOf(Todo);
  todos.splice(i, 1);
  listTodos();
}

// KAYDETME
formTodos.onsubmit = function (event) {
  event.preventDefault();
  todos.push({
    title: txtTitle.value.trim(),
    done: false,
  });
  listTodos();
  txtTitle.value = "";
};

loadData();
listTodos();
