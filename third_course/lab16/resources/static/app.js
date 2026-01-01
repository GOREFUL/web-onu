const layer = document.getElementById("layer");
const spawnBtn = document.getElementById("spawnBtn");
const clearBtn = document.getElementById("clearBtn");
const countEl = document.getElementById("count");

const items = []; // { el, x, y, vy, size }
let rafId = null;
let lastT = performance.now();

const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function updateCount() {
  countEl.textContent = String(items.length);
}

function ensureRunning() {
  if (rafId == null) {
    lastT = performance.now();
    rafId = requestAnimationFrame(tick);
  }
}

function stopIfEmpty() {
  if (items.length === 0 && rafId != null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function spawnItem() {
  const size = Math.round(rand(28, 56));
  const w = window.innerWidth;
  const h = window.innerHeight;

  const x = rand(0, Math.max(0, w - size));
  const y = rand(0, Math.max(0, h - size));

  const vy = (Math.random() < 0.5 ? -1 : 1) * rand(120, 320); // px/sec

  const el = document.createElement("div");
  el.className =
    "spawn absolute grid place-items-center rounded-2xl border border-white/15 " +
    "bg-gradient-to-br from-fuchsia-500/70 to-cyan-400/60 shadow-lg shadow-black/30 " +
    "text-xs font-bold text-white";
  el.style.width = size + "px";
  el.style.height = size + "px";
  el.style.transform = `translate(${x}px, ${y}px)`;
  el.textContent = String(items.length + 1);

  layer.appendChild(el);
  items.push({ el, x, y, vy, size });

  updateCount();
  ensureRunning();
}

function tick(now) {
  const dt = (now - lastT) / 1000;
  lastT = now;

  const h = window.innerHeight;

  for (const item of items) {
    item.y += item.vy * dt;

    const minY = 0;
    const maxY = h - item.size;

    if (item.y <= minY) {
      item.y = minY;
      item.vy *= -1;
    } else if (item.y >= maxY) {
      item.y = maxY;
      item.vy *= -1;
    }

    item.el.style.transform = `translate(${item.x}px, ${item.y}px)`;
  }

  rafId = requestAnimationFrame(tick);
}

spawnBtn.addEventListener("click", spawnItem);

clearBtn.addEventListener("click", () => {
  for (const item of items) item.el.remove();
  items.length = 0;
  updateCount();
  stopIfEmpty();
});

window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  for (const item of items) {
    item.x = clamp(item.x, 0, Math.max(0, w - item.size));
    item.y = clamp(item.y, 0, Math.max(0, h - item.size));
    item.el.style.transform = `translate(${item.x}px, ${item.y}px)`;
  }
});
