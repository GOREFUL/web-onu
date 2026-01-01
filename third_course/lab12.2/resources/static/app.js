const radioBox = document.getElementById("radioBox");
const popupStatus = document.getElementById("popupStatus");
const reopenBtn = document.getElementById("reopenBtn");

const phraseBox = document.getElementById("phraseBox");
const phraseField = document.getElementById("phraseField");

const IMG_W = 520;
const IMG_H = 320;

function svgData(title, bg1, bg2, accent) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${IMG_W}" height="${IMG_H}" viewBox="0 0 ${IMG_W} ${IMG_H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg1}"/>
        <stop offset="1" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="${IMG_W * 0.82}" cy="${IMG_H * 0.28}" r="${IMG_H * 0.12}" fill="${accent}" opacity="0.9"/>
    <rect x="20" y="${IMG_H - 78}" width="${IMG_W - 40}" height="54" rx="14" fill="rgba(0,0,0,0.35)"/>
    <text x="40" y="${IMG_H - 42}" fill="white" font-family="Arial, sans-serif" font-size="28" font-weight="700">
      ${title}
    </text>
  </svg>`.trim();

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const images = [
  { name: "Aurora",   src: svgData("Aurora",   "#0ea5e9", "#111827", "#a78bfa") },
  { name: "Desert",   src: svgData("Desert",   "#f59e0b", "#7c2d12", "#fde68a") },
  { name: "Forest",   src: svgData("Forest",   "#22c55e", "#064e3b", "#bbf7d0") },
  { name: "Ocean",    src: svgData("Ocean",    "#38bdf8", "#1e3a8a", "#f472b6") },
  { name: "Midnight", src: svgData("Midnight", "#111827", "#000000", "#60a5fa") },
];

const phrases = [
  { label: "Привітання", text: "Привіт! Гарного дня 🙂" },
  { label: "Про навчання", text: "Сьогодні я захищаю лабораторну роботу." },
  { label: "Мотивація", text: "Крок за кроком — і все вийде." },
  { label: "Нагадування", text: "Не забути перевірити код перед пул-реквестом." },
  { label: "Фінал", text: "Дякую за увагу! ✅" },
];

let popupWin = null;
let currentIndex = 0;

function setStatus(text) {
  popupStatus.textContent = text;
}

function isPopupAlive() {
  return popupWin && !popupWin.closed;
}

function popupHtml() {
  return `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Image</title>
<style>
  html, body { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#000; }
  img { display:block; width:100%; height:100%; }
</style>
</head>
<body>
  <img id="popImg" alt="image"/>
</body>
</html>`;
}

function openPopup() {
  const features =
    `popup=yes,toolbar=no,location=no,menubar=no,status=no,scrollbars=no,resizable=no` +
    `,width=${IMG_W},height=${IMG_H}`;

  popupWin = window.open("", "imgPopup", features);

  if (!popupWin) {
    setStatus("Попап заблоковано браузером. Дозволь pop-ups і натисни кнопку перевідкриття.");
    return false;
  }

  popupWin.document.open();
  popupWin.document.write(popupHtml());
  popupWin.document.close();

  setTimeout(() => {
    if (!isPopupAlive()) return;

    const dw = popupWin.outerWidth - popupWin.innerWidth;
    const dh = popupWin.outerHeight - popupWin.innerHeight;
    popupWin.resizeTo(IMG_W + dw, IMG_H + dh);

    updatePopupImage(currentIndex);
    setStatus("Popup відкрито. Перемикай радіо для зміни картинки.");
  }, 50);

  return true;
}

function updatePopupImage(index) {
  currentIndex = index;

  if (!isPopupAlive()) {
    setStatus("Popup закритий/недоступний. Натисни кнопку, щоб відкрити знову.");
    return;
  }

  const imgEl = popupWin.document.getElementById("popImg");
  if (!imgEl) return;

  imgEl.src = images[index].src;
  imgEl.width = IMG_W;
  imgEl.height = IMG_H;
}

function buildRadios() {
  radioBox.innerHTML = "";

  images.forEach((img, i) => {
    const row = document.createElement("label");
    row.className = "radio-row";

    row.innerHTML = `
      <input type="radio" name="imgPick" value="${i}" class="h-4 w-4" ${i === 0 ? "checked" : ""}>
      <span class="text-slate-100 font-medium">${img.name}</span>
      <span class="ml-auto text-xs text-slate-400">${IMG_W}×${IMG_H}</span>
    `;

    row.querySelector("input").addEventListener("change", () => {
      updatePopupImage(i);
    });

    radioBox.appendChild(row);
  });
}

function setPhrase(index) {
  phraseField.value = phrases[index].text;
}

function buildPhraseRadios() {
  phraseBox.innerHTML = "";

  phrases.forEach((p, i) => {
    const row = document.createElement("label");
    row.className = "radio-row";

    row.innerHTML = `
      <input type="radio" name="phrasePick" value="${i}" class="h-4 w-4" ${i === 0 ? "checked" : ""}>
      <span class="text-slate-100 font-medium">${p.label}</span>
    `;

    row.querySelector("input").addEventListener("change", () => setPhrase(i));
    phraseBox.appendChild(row);
  });

  setPhrase(0);
}

reopenBtn.addEventListener("click", () => {
  if (isPopupAlive()) popupWin.close();
  openPopup();
});

window.addEventListener("load", () => {
  buildRadios();
  buildPhraseRadios();
  currentIndex = 0;
  openPopup();
});

window.addEventListener("beforeunload", () => {
  if (isPopupAlive()) popupWin.close();
});
