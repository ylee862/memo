async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("put in what to edit");
  const res = await fetch(`/memo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      contect: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memo/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "edit";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "delete";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      contect: value,
    }),
  });

  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
