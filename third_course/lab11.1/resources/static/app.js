Date.prototype.notBusinessTime = function () {
  const day = this.getDay(); // 0=Нд, 6=Сб
  const isWeekend = (day === 0 || day === 6);
  if (isWeekend) return true;

  const h = this.getHours();
  const m = this.getMinutes();
  const minutes = h * 60 + m;

  const start = 8 * 60;
  const end = 17 * 60;

  const isBusiness = (minutes >= start && minutes < end);

  return !isBusiness;
};

const out = document.getElementById("out");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");

function pad2(n) { return String(n).padStart(2, "0"); }
function fmt(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())} ` +
         `${pad2(d.getHours())}:${pad2(d.getMinutes())} (day=${d.getDay()})`;
}

function line(text) {
  out.textContent += text + "\n";
}

function runTests() {
  out.textContent = "";
  const tests = [
    { label: "Пн 07:59 — ще не робочий", d: new Date(2025, 11, 1, 7, 59), expected: true },
    { label: "Пн 08:00 — робочий старт", d: new Date(2025, 11, 1, 8, 0), expected: false },
    { label: "Пн 16:59 — робочий", d: new Date(2025, 11, 1, 16, 59), expected: false },
    { label: "Пн 17:00 — вже не робочий", d: new Date(2025, 11, 1, 17, 0), expected: true },
    { label: "Сб 10:00 — вихідний", d: new Date(2025, 11, 6, 10, 0), expected: true },
    { label: "Нд 12:00 — вихідний", d: new Date(2025, 11, 7, 12, 0), expected: true },
    { label: "Вт 12:00 — робочий", d: new Date(2025, 11, 2, 12, 0), expected: false },
  ];

  line("=== Демонстрація Date.prototype.notBusinessTime() ===\n");

  let ok = 0;
  tests.forEach((t, i) => {
    const got = t.d.notBusinessTime();
    const pass = got === t.expected;
    if (pass) ok++;

    line(`${i + 1}) ${t.label}`);
    line(`   date: ${fmt(t.d)}`);
    line(`   expected: ${t.expected} | got: ${got}  ${pass ? "✓" : "✗"}`);
    line("");
  });

  line(`Підсумок: ${ok}/${tests.length} тестів пройдено.`);
  line("\nДодатково (поточний час):");
  const now = new Date();
  line(`now: ${fmt(now)} -> notBusinessTime() = ${now.notBusinessTime()}`);
}

runBtn.addEventListener("click", runTests);
clearBtn.addEventListener("click", () => (out.textContent = ""));
