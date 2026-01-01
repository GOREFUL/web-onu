const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const counterEl = document.getElementById("counter");

let addedCount = 0;

function updateCounter() {
  counterEl.textContent = String(addedCount);
}

function addTwoAfterFirst() {
  const firstItem = list.querySelector("li");
  if (!firstItem) return;

  const li1 = document.createElement("li");
  li1.className = "added-item";
  li1.textContent = `Новий елемент #${addedCount + 1}`;

  const li2 = document.createElement("li");
  li2.className = "added-item";
  li2.textContent = `Новий елемент #${addedCount + 2}`;

  firstItem.insertAdjacentElement("afterend", li1);
  firstItem.insertAdjacentElement("afterend", li2);

  addedCount += 2;
  updateCounter();
}

function resetAdded() {
  list.querySelectorAll("li.added-item").forEach(li => li.remove());
  addedCount = 0;
  updateCounter();
}

addBtn.addEventListener("click", addTwoAfterFirst);
resetBtn.addEventListener("click", resetAdded);

updateCounter();
