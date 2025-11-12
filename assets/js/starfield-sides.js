(function () {
  const canvases = [
    document.getElementById("starfield-left"),
    document.getElementById("starfield-right")
  ].filter(Boolean);

  if (canvases.length === 0) return;

  const ctxs = canvases.map(c => c.getContext("2d"));
  const NUM_STARS = 100;
  let stars = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    for (const canvas of canvases) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }

  function initStars() {
    stars = [];
    for (const canvas of canvases) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      for (let i = 0; i < NUM_STARS; i++) {
        stars.push({
          canvas,
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * w
        });
      }
    }
  }

  function draw() {
    for (const [i, canvas] of canvases.entries()) {
      const ctx = ctxs[i];
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      for (const s of stars.filter(st => st.canvas === canvas)) {
        s.z -= 2;
        if (s.z <= 0) s.z = w;
        const k = 128 / s.z;
        const px = s.x * k;
        const py = s.y * k;
        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const size = Math.max(0.5, (1 - s.z / w) * 2);
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
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
