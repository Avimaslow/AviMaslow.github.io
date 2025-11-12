(function () {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const NUM_STARS = 200;
  let stars = [];

  function resize() {
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function initStars() {
    stars = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Two vertical regions: left 20 % and right 20 %
    const leftZone = w * 0.2;
    const rightZone = w * 0.8;

    for (let i = 0; i < NUM_STARS; i++) {
      const inLeft = Math.random() < 0.5;
      const x = inLeft
        ? Math.random() * leftZone - w / 2 + leftZone / 2
        : Math.random() * (w - rightZone) + rightZone - w / 2;
      const y = Math.random() * h - h / 2;
      const z = Math.random() * w;
      stars.push({ x, y, z });
    }
  }

  function draw() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);

    for (const s of stars) {
      s.z -= 2;
      if (s.z <= 0) s.z = w;

      const k = 128 / s.z;
      const px = s.x * k + w / 2;
      const py = s.y * k + h / 2;

      if (px >= 0 && px <= w && py >= 0 && py <= h) {
        const size = Math.max(0.5, (1 - s.z / w) * 2);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }

  function start() {
    resize();
    initStars();
    draw();
  }

  window.addEventListener("resize", () => {
    resize();
    initStars();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
