// task 1
const page = document.getElementById("page");
const intervalInput = document.getElementById("intervalInput");
const startBgBtn = document.getElementById("startBgBtn");
const stopBgBtn = document.getElementById("stopBgBtn");
const bgStatus = document.getElementById("bgStatus");

let bgTimer = null;

const bgColors = [
  "#0f172a", // slate-900
  "#111827", // gray-900
  "#1f2937", // gray-800
  "#0b1220",
  "#0a1020",
  "#1e1b4b", // indigo-950
  "#312e81", // indigo-900
  "#134e4a", // teal-900
  "#3f1d2f",
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function startBackgroundCycling() {
  const sec = Number(intervalInput.value);

  if (!Number.isFinite(sec) || sec < 1) {
    bgStatus.textContent = "Введи інтервал (>= 1 сек).";
    return;
  }

  stopBackgroundCycling();

  page.style.backgroundColor = pickRandom(bgColors);
  bgStatus.textContent = `Працює: кожні ${sec} сек.`;

  bgTimer = setInterval(() => {
    page.style.backgroundColor = pickRandom(bgColors);
  }, sec * 1000);
}

function stopBackgroundCycling() {
  if (bgTimer) {
    clearInterval(bgTimer);
    bgTimer = null;
  }
  bgStatus.textContent = "Зупинено.";
}

startBgBtn.addEventListener("click", startBackgroundCycling);
stopBgBtn.addEventListener("click", stopBackgroundCycling);

// task 2
const p1 = document.getElementById("p1");
const randomizeBtn = document.getElementById("randomizeBtn");
const resetBtn = document.getElementById("resetBtn");
const textStatus = document.getElementById("textStatus");

const fontFamilies = [
  "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  "Georgia, 'Times New Roman', Times, serif",
  "'Courier New', Courier, monospace",
  "Verdana, Geneva, Tahoma, sans-serif",
  "'Trebuchet MS', Arial, sans-serif",
];

const initial = {
  bodyBg: getComputedStyle(page).backgroundColor,
  p1FontSize: getComputedStyle(p1).fontSize,
  p1FontFamily: getComputedStyle(p1).fontFamily,
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeFirstParagraph() {
  const size = randomInt(10, 50);
  const font = pickRandom(fontFamilies);

  p1.style.fontSize = `${size}px`;
  p1.style.fontFamily = font;

  textStatus.textContent = `p1: ${size}px, font: ${font.split(",")[0]}`;
}

function resetAll() {
  stopBackgroundCycling();
  page.style.backgroundColor = initial.bodyBg;
  p1.style.fontSize = initial.p1FontSize;
  p1.style.fontFamily = initial.p1FontFamily;
  textStatus.textContent = "Відновлено.";
}

randomizeBtn.addEventListener("click", randomizeFirstParagraph);
resetBtn.addEventListener("click", resetAll);

bgStatus.textContent = "Зупинено.";
textStatus.textContent = "";
