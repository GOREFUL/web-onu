(() => {
  const stage = document.getElementById("stage");
  const welcome = document.getElementById("welcome");

  const IMG =
    "https://i.scdn.co/image/ab67616d0000b2734c195c693236013b3080bf0b";

  const SIZE = 360;
  const DURATION = 1200;

  const center = () => ({
    x: (window.innerWidth - SIZE) / 2,
    y: (window.innerHeight - SIZE) / 2
  });

  function removeFinalImage() {
    const old = document.getElementById("finalImage");
    if (old) old.remove();
  }

  function createFinalImage() {
    removeFinalImage();

    const { x: cx, y: cy } = center();

    const img = document.createElement("div");
    img.id = "finalImage";
    img.className =
      "fixed rounded-2xl shadow-xl shadow-black/50 border border-white/10 overflow-hidden fade-in";

    img.style.width = SIZE + "px";
    img.style.height = SIZE + "px";
    img.style.left = "0px";
    img.style.top = "0px";

    img.style.setProperty("--x", `${cx}px`);
    img.style.setProperty("--y", `${cy}px`);
    img.style.transform = `translate(${cx}px, ${cy}px)`;

    img.style.backgroundImage = `url('${IMG}')`;
    img.style.backgroundSize = "cover";
    img.style.backgroundPosition = "center";

    stage.appendChild(img);
  }

  function positionWelcomeBelowImage() {
    const offset = SIZE / 2 + 28;
    welcome.style.transform = `translate(-50%, ${offset}px)`;
  }

  function createPieces() {
    stage.innerHTML = "";
    removeFinalImage();

    welcome.classList.add("hidden");
    positionWelcomeBelowImage();

    const { x: cx, y: cy } = center();
    const half = SIZE / 2;

    const starts = [
      { x: 0,                 y: 0,                  bgX: 0,      bgY: 0 },       // TL
      { x: window.innerWidth, y: 0,                  bgX: -half,  bgY: 0 },       // TR
      { x: 0,                 y: window.innerHeight, bgX: 0,      bgY: -half },   // BL
      { x: window.innerWidth, y: window.innerHeight, bgX: -half,  bgY: -half },  // BR
    ];

    const targets = [
      { x: cx,        y: cy },         // TL
      { x: cx + half, y: cy },         // TR
      { x: cx,        y: cy + half },  // BL
      { x: cx + half, y: cy + half },  // BR
    ];

    const pieces = starts.map((s, i) => {
      const el = document.createElement("div");
      el.className =
        "piece fixed rounded-xl shadow-lg shadow-black/40 border border-white/10";

      el.style.width = half + "px";
      el.style.height = half + "px";

      el.style.backgroundImage = `url('${IMG}')`;
      el.style.backgroundSize = `${SIZE}px ${SIZE}px`;
      el.style.backgroundPosition = `${s.bgX}px ${s.bgY}px`;

      const startX = (i === 1 || i === 3) ? (s.x - half) : s.x;
      const startY = (i === 2 || i === 3) ? (s.y - half) : s.y;

      el.style.left = "0px";
      el.style.top = "0px";
      el.style.transform = `translate(${startX}px, ${startY}px)`;

      stage.appendChild(el);

      return {
        el,
        startX,
        startY,
        targetX: targets[i].x,
        targetY: targets[i].y
      };
    });

    const animations = pieces.map(p =>
      p.el.animate(
        [
          { transform: `translate(${p.startX}px, ${p.startY}px)` },
          { transform: `translate(${p.targetX}px, ${p.targetY}px)` }
        ],
        { duration: DURATION, easing: "ease-in-out", fill: "forwards" }
      )
    );

    Promise.all(animations.map(a => a.finished)).then(() => {
      pieces.forEach(p => (p.el.style.opacity = "0"));
      setTimeout(() => {
        pieces.forEach(p => p.el.remove());
        createFinalImage();
        welcome.classList.remove("hidden");
      }, 300);
    });
  }

  window.addEventListener("load", createPieces);
  window.addEventListener("resize", createPieces);
})();
