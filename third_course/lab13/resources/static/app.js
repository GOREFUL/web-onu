const el = document.getElementById("secondsLeft");
const startSystem = new Date();
const startPerf = performance.now();

function getNextSchoolYearStart(fromDate) {
  const year = fromDate.getFullYear();
  const thisYearStart = new Date(year, 8, 1, 0, 0, 0);
  if (fromDate < thisYearStart) return thisYearStart;
  return new Date(year + 1, 8, 1, 0, 0, 0);
}

const target = getNextSchoolYearStart(startSystem);

function padSeconds(n) {
  return String(n).padStart(8, "0");
}

function tick() {
  const elapsedMs = performance.now() - startPerf;
  let diffMs = target.getTime() - startSystem.getTime() - elapsedMs;
  if (diffMs < 0) diffMs = 0;
  const seconds = Math.floor(diffMs / 1000);
  el.textContent = padSeconds(seconds);
}

tick();
setInterval(tick, 1000);

const addRowBtn = document.getElementById("addRowBtn");
const delRowBtn = document.getElementById("delRowBtn");
const rowsBody = document.getElementById("rowsBody");
const tableStatus = document.getElementById("tableStatus");

function formatTime(d) {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function updateDeleteControl() {
  const count = rowsBody.rows.length;
  delRowBtn.disabled = count === 0;
  tableStatus.textContent = count === 0 ? "Нема рядків для видалення." : `Кількість рядків: ${count}`;
}

function renumber() {
  Array.from(rowsBody.rows).forEach((tr, i) => {
    tr.cells[0].textContent = String(i + 1);
    tr.cells[1].textContent = `Рядок ${i + 1}`;
  });
}

function addRow() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td class="px-4 py-3"></td>
    <td class="px-4 py-3"></td>
    <td class="px-4 py-3">${formatTime(new Date())}</td>
  `;
  rowsBody.appendChild(tr);
  renumber();
  updateDeleteControl();
}

function deleteRow() {
  const count = rowsBody.rows.length;
  if (count === 0) {
    updateDeleteControl();
    return;
  }
  rowsBody.deleteRow(count - 1);
  renumber();
  updateDeleteControl();
}

addRowBtn.addEventListener("click", addRow);
delRowBtn.addEventListener("click", deleteRow);

updateDeleteControl();
