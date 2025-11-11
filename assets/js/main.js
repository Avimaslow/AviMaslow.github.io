// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
    const data = window.resumeData;
     /* ----- "Now working on" mini player ----- */
    const AI_2048_ENDPOINT = "https://rl7x5wjdzgf4x44jf4omjjrq2u0flowe.lambda-url.us-east-1.on.aws/";

    const workingTitle = document.getElementById("workingTitle");
    const workingSubtitle = document.getElementById("workingSubtitle");
    const workingProgress = document.getElementById("workingProgress");
    const workingIndexText = document.getElementById("workingIndexText");
    const heroPlayerMain = document.getElementById("heroPlayerMain");
    const btnPrev = document.getElementById("workingPrev");
    const btnNext = document.getElementById("workingNext");
    const timeCurrentEl = document.getElementById("workingTimeCurrent");
    const timeRemainingEl = document.getElementById("workingTimeRemaining");

    // playlist
    const workingQueue =
        (data.nowWorkingOn && data.nowWorkingOn.length > 0
            ? data.nowWorkingOn
            : (data.projects || []).map((p) => ({
                  title: p.name,
                  subtitle: p.summary
              }))) || [];

    let workingIndex = 0;

    // total "song" length = 3 min 22 sec
    const TOTAL_SECONDS = 3 * 60 + 22; // 202 seconds

    function formatTime(seconds) {
        const s = Math.max(0, Math.round(seconds));
        const m = Math.floor(s / 60);
        const rest = s % 60;
        return `${m}:${rest.toString().padStart(2, "0")}`;
    }

    function updateTimeAndProgress() {
        if (!workingQueue.length) return;

        const n = workingQueue.length;
        let currentSeconds;

        if (n === 1) {
            // only one item – just pin it at start
            currentSeconds = 0;
        } else {
            // we want:
            // index 0 -> 0:00
            // last index -> 3:22
            // everything else evenly spaced between
            const fraction = workingIndex / (n - 1); // 0 .. 1
            currentSeconds = TOTAL_SECONDS * fraction;
        }

        const remaining = Math.max(0, TOTAL_SECONDS - currentSeconds);

        if (timeCurrentEl) {
            timeCurrentEl.textContent = formatTime(currentSeconds);
        }
        if (timeRemainingEl) {
            timeRemainingEl.textContent = `-${formatTime(remaining)}`;
        }

        if (workingProgress) {
            const pct = (currentSeconds / TOTAL_SECONDS) * 100;
            workingProgress.style.width = `${pct}%`;
        }
    }

    function renderWorking(direction) {
        if (!workingQueue.length || !workingTitle || !workingSubtitle) return;

        const item = workingQueue[workingIndex];

        workingTitle.textContent = item.title;
        workingSubtitle.textContent = item.subtitle || "";

        if (workingIndexText) {
            workingIndexText.textContent = `${workingIndex + 1} / ${workingQueue.length}`;
        }

        updateTimeAndProgress();

        // slide animation
        if (heroPlayerMain && direction) {
            heroPlayerMain.classList.remove("anim-left", "anim-right");
            void heroPlayerMain.offsetWidth; // restart animation
            heroPlayerMain.classList.add(direction === "next" ? "anim-left" : "anim-right");
        }
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (!workingQueue.length) return;
            workingIndex = (workingIndex - 1 + workingQueue.length) % workingQueue.length;
            renderWorking("prev");
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            if (!workingQueue.length) return;
            workingIndex = (workingIndex + 1) % workingQueue.length;
            renderWorking("next");
        });
    }

    // initial render
    renderWorking();


/* ----- #define Easter egg ----- */
const aviVersionEl = document.getElementById("aviVersionTag");
if (aviVersionEl) {
    let toggled = false;
    aviVersionEl.addEventListener("click", () => {
        toggled = !toggled;
        aviVersionEl.textContent = toggled ? 'v3.0 (Your\'re Hired!)' : 'v2.0';
    });
}


/* ----- Terminal uptime ----- */
const uptimeEl = document.getElementById("uptimeValue");
const startTime = Date.now();
if (uptimeEl) {
    setInterval(() => {
        const diff = Date.now() - startTime;
        const totalSec = Math.floor(diff / 1000);
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        uptimeEl.textContent =
            `${h.toString().padStart(2, "0")}:` +
            `${m.toString().padStart(2, "0")}:` +
            `${s.toString().padStart(2, "0")}`;
    }, 1000);
}


/* ----- "Memory leak" scroll easter egg ----- */
const leakLayer = document.getElementById("leakLayer");
let lastScrollY = window.scrollY;
let lastScrollTime = Date.now();
let lastLeakTextTime = 0;

function spawnLeaks() {
    if (!leakLayer) return;

    // small bubbles
    for (let i = 0; i < 5; i++) {
        const bubble = document.createElement("div");
        bubble.className = "leak-bubble";
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = "-10px";
        leakLayer.appendChild(bubble);
        setTimeout(() => bubble.remove(), 1200);
    }

    // occasional delete[] leaks; text
    const now = Date.now();
    if (now - lastLeakTextTime > 2500) {
        lastLeakTextTime = now;
        const text = document.createElement("div");
        text.className = "leak-text";
        text.textContent = "delete[] leaks;";
        text.style.left = `${10 + Math.random() * 70}%`;
        text.style.bottom = "40px";
        leakLayer.appendChild(text);
        setTimeout(() => text.remove(), 1400);
    }
}

window.addEventListener("scroll", () => {
    const now = Date.now();
    const dy = Math.abs(window.scrollY - lastScrollY);
    const dt = now - lastScrollTime || 1;
    const speed = dy / dt; // px per ms

    if (speed > 0.6) { // tweak threshold for how "fast" scroll is
        spawnLeaks();
    }

    lastScrollY = window.scrollY;
    lastScrollTime = now;
});

    /* ----- Dynamic Title Typing Effect ----- */
    const typedEl = document.getElementById("typedTitle");
    const titles = data.titles || [];
    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        if (!typedEl || titles.length === 0) return;
        const current = titles[titleIndex];
        if (!deleting) {
            charIndex++;
            if (charIndex > current.length) {
                deleting = true;
                setTimeout(tick, 900);
                return;
            }
        } else {
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }
        }
        typedEl.textContent = current.slice(0, charIndex);
        const delay = deleting ? 50 : 90;
        setTimeout(tick, delay);
    }
    tick();

    /* ----- Hero Profile Hover Tags ----- */
    const profileDetail = document.getElementById("profileDetail");
    document.querySelectorAll(".tag[data-profile]").forEach((tag) => {
        tag.addEventListener("mouseenter", () => {
            const key = tag.dataset.profile;
            if (data.profiles[key] && profileDetail) {
                profileDetail.textContent = data.profiles[key];
            }
        });
    });

    /* ----- Working Style Toggle Card ----- */
    const workingStyleText = document.getElementById("workingStyleText");
    const toggleBtns = document.querySelectorAll(".toggle-btn");
    toggleBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            toggleBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            const mode = btn.dataset.mode;
            if (mode === "leader") {
                workingStyleText.textContent =
                    "I like owning streams of work, clarifying ambiguity, and giving teammates clean interfaces and guardrails so they can move quickly.";
            } else {
                workingStyleText.textContent =
                    "I like designing systems from first principles, understanding the data flow, and then polishing the edges so others can use them comfortably.";
            }
        });
    });

    /* ----- Build Experience Timeline ----- */
    const timelineEl = document.getElementById("timeline");
    if (timelineEl && Array.isArray(data.timeline)) {
        data.timeline.forEach((item) => {
            const div = document.createElement("article");
            div.className = "timeline-item";
            div.innerHTML = `
                <div class="timeline-header">
                    <div>
                        <div class="timeline-role">${item.role}</div>
                        <div class="timeline-company">${item.company} • ${item.location}</div>
                    </div>
                    <div class="timeline-meta">${item.dates}</div>
                </div>
                <div class="timeline-body">
                    <ul>
                        ${(item.bullets || [])
                            .map((b) => `<li>• ${b}</li>`)
                            .join("")}
                    </ul>
                </div>
            `;
            div.addEventListener("click", () => {
                div.classList.toggle("expanded");
            });
            timelineEl.appendChild(div);
        });
    }

    /* ----- Build Projects Grid + Filters ----- */
    const projectsGrid = document.getElementById("projectsGrid");
    const chips = document.querySelectorAll(".chip[data-filter]");
    let currentFilter = "all";

    function renderProjects() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = "";
        const filtered = data.projects.filter(
            (p) => currentFilter === "all" || p.type === currentFilter
        );
        filtered.forEach((p) => {
            const card = document.createElement("article");
card.className = "project-card";
card.dataset.type = p.type;

const href = p.link || "#";

card.innerHTML = `
    <a href="${href}" class="project-link" target="_blank" rel="noreferrer">
        <div class="project-thumb ${p.image ? "has-image" : ""}">
            ${
                p.image
                    ? `<img src="${p.image}" alt="${p.name} screenshot" loading="lazy" />`
                    : ""
            }
            <div class="project-thumb-overlay">
                <span>${p.link ? "View on GitHub" : "Preview"}</span>
            </div>
        </div>

        <div class="project-content">
            <div class="project-badge">${p.type.toUpperCase()}</div>
            <div class="project-title">${p.name}</div>
            <div class="project-meta">${p.role}</div>
            <p class="project-summary">${p.summary}</p>
            <div class="project-tech">
                ${p.tech.map((t) => `<span>${t}</span>`).join("")}
            </div>
        </div>
    </a>
`;



            projectsGrid.appendChild(card);
        });
    }

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chips.forEach((c) => c.classList.remove("active"));
            chip.classList.add("active");
            currentFilter = chip.dataset.filter;
            renderProjects();
        });
    });

    renderProjects();

    /* ----- Skills Radar ----- */
    const skillsDetail = document.getElementById("skillsDetail");
    const radarRings = document.querySelectorAll(".radar-ring");
    function renderSkill(key) {
        if (!skillsDetail) return;
        const s = data.skills[key];
        if (!s) return;
        skillsDetail.innerHTML = `
            <h3>${s.title}</h3>
            <p>${s.text}</p>
            <ul>
                ${s.list.map((item) => `<li>• ${item}</li>`).join("")}
            </ul>
        `;
    }
    radarRings.forEach((ring) => {
        ring.addEventListener("click", () => {
            radarRings.forEach((r) => r.classList.remove("active"));
            ring.classList.add("active");
            renderSkill(ring.dataset.skillGroup);
        });
    });
    // default
    renderSkill("core");

    /* ----- Animated Stats Counters ----- */
    const statEls = document.querySelectorAll(".stat");
    let statsStarted = false;
    const statsObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting && !statsStarted) {
                    statsStarted = true;
                    statEls.forEach((el) => {
                        const target = parseInt(el.dataset.target || "0", 10);
                        const numberEl = el.querySelector(".stat-number");
                        if (!numberEl || !target) return;
                        let count = 0;
                        const step = Math.max(1, Math.floor(target / 40));
                        const interval = setInterval(() => {
                            count += step;
                            if (count >= target) {
                                count = target;
                                clearInterval(interval);
                            }
                            numberEl.textContent = String(count);
                        }, 35);
                    });
                    statsObserver.disconnect();
                }
            }
        },
        { threshold: 0.4 }
    );
    statEls.forEach((el) => statsObserver.observe(el));
    /* ----- C++ "Allocating focus memory" console ----- */
 // ----- Scroll-linked progress console -----
const focusBarFill = document.getElementById("focusBarFill");
const focusBarText = document.getElementById("focusBarText");

if (focusBarFill && focusBarText) {
  function updateFocusProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.min(1, scrollTop / docHeight);
    const percent = Math.round(scrolled * 100);

    // Update bar width
    focusBarFill.style.width = `${percent}%`;

    // Build fake “█░” text bar (20 slots)
    const totalBlocks = 20;
    const filled = Math.round((percent / 100) * totalBlocks);
    const barText = "█".repeat(filled) + "░".repeat(totalBlocks - filled);

    focusBarText.textContent = `${barText} ${percent}%`;
  }

  window.addEventListener("scroll", updateFocusProgress);
  updateFocusProgress(); // initialize on load
}


    /* ----- Contact Form (demo only) ----- */
/* ----- Contact Form (GitHub Pages + Form service) ----- */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        formStatus.textContent = "Sending…";
        formStatus.classList.remove("error", "success");

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks! Your message has been sent.";
                formStatus.classList.add("success");
                contactForm.reset();
            } else {
                formStatus.textContent = "Hmm, something went wrong. Please try again later.";
                formStatus.classList.add("error");
            }
        } catch (err) {
            formStatus.textContent = "Unable to send right now. Check your connection.";
            formStatus.classList.add("error");
        }
    });
}


    /* ----- Copy Email Button ----- */
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    if (copyEmailBtn && navigator.clipboard) {
        copyEmailBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText("avimaslow1998@gmail.com");
                copyEmailBtn.textContent = "Copied!";
                setTimeout(() => {
                    copyEmailBtn.textContent = "Copy email to clipboard";
                }, 1200);
            } catch {
                copyEmailBtn.textContent = "Unable to copy";
            }
        });
    }

    /* ----- Year in Footer ----- */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    /* ----- Scroll to Top Button ----- */
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        if (!scrollTopBtn) return;
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    });
    scrollTopBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

        /* ----- Resume Button (actual file) ----- */
        const viewResumeBtn = document.getElementById("viewResumeBtn");
        if (viewResumeBtn) {
            viewResumeBtn.addEventListener("click", () => {
                // Open the resume in a new tab
                window.open("assets/img/AviMaslowResume2026.pdf", "_blank");
            });
        }


    /* ----- Theme Toggle (dark / light) ----- */
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const savedTheme = window.localStorage.getItem("resume-theme");
    if (savedTheme === "light") {
        body.classList.add("light");
    }

    function updateThemeIcon() {
        if (!themeToggle) return;
        themeToggle.innerHTML = body.classList.contains("light")
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {
        body.classList.toggle("light");
        const mode = body.classList.contains("light") ? "light" : "dark";
        window.localStorage.setItem("resume-theme", mode);
        updateThemeIcon();
    });

    /* ----- Nav scroll & mobile toggle ----- */
    const navLinks = document.querySelector(".nav-links");
    const navToggle = document.querySelector(".nav-toggle");
    const links = document.querySelectorAll(".nav-link");

    navToggle?.addEventListener("click", () => {
        navLinks?.classList.toggle("open");
    });

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.getAttribute("href").slice(1);
            const section = document.getElementById(id);
            if (section) {
                const rect = section.getBoundingClientRect();
                const absoluteTop = rect.top + window.scrollY - 70;
                window.scrollTo({ top: absoluteTop, behavior: "smooth" });
            }
            navLinks?.classList.remove("open");
        });
    });

    /* ----- Certificates Grid ----- */
    const certGrid = document.getElementById("certGrid");
    if (certGrid && Array.isArray(data.certificates)) {
        data.certificates.forEach((cert) => {
            const card = document.createElement("article");
            card.className = "cert-card";

            card.innerHTML = `
                <button class="cert-card-inner" type="button">
                    <div class="cert-img-wrap">
                        <img src="${cert.image}" alt="${cert.name} badge" loading="lazy" />
                    </div>
                    <div class="cert-text">
                        <div class="cert-name">${cert.name}</div>
                        <div class="cert-issuer">${cert.issuer}</div>
                    </div>
                </button>
            `;

            const btn = card.querySelector(".cert-card-inner");
            btn.addEventListener("click", () => {
                if (cert.url) {
                    window.open(cert.url, "_blank", "noreferrer");
                }
            });

            certGrid.appendChild(card);
        });
    }


    // Update active nav link on scroll
    const sectionIds = ["hero", "about", "experience", "projects", "skills", "courses", "certificates", "contact"];


    const sectionEls = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el) => el !== null);

    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        let current = "hero";
        sectionEls.forEach((sec) => {
            const top = sec.offsetTop - 100;
            if (y >= top) {
                current = sec.id;
            }
        });
        links.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const id = href.startsWith("#") ? href.slice(1) : "";
            link.classList.toggle("active", id === current);
        });
    });


    /* ----- 2048 AI Integration ----- */
    const gridEl = document.getElementById("game2048Grid");
    const statusEl = document.getElementById("ai2048Status");
    const btnStep = document.getElementById("ai2048Step");
    const btnAuto = document.getElementById("ai2048Auto");
    const btnReset = document.getElementById("ai2048Reset");

    // Simple front-end board (4x4)
    let board2048 = [
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    function render2048() {
        if (!gridEl) return;
        gridEl.innerHTML = "";
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                const v = board2048[r][c];
                const cell = document.createElement("div");
                cell.className = `grid-2048-cell val-${v}`;
                cell.textContent = v === 0 ? "" : v;
                gridEl.appendChild(cell);
            }
        }
    }

    function randomEmptyCell() {
        const empty = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (board2048[r][c] === 0) empty.push([r, c]);
            }
        }
        if (!empty.length) return null;
        return empty[Math.floor(Math.random() * empty.length)];
    }

    function spawnRandomTile() {
        const cell = randomEmptyCell();
        if (!cell) return;
        const [r, c] = cell;
        board2048[r][c] = Math.random() < 0.9 ? 2 : 4;
    }

    function slideAndMerge(row) {
        const filtered = row.filter(v => v !== 0);
        const result = [];
        let i = 0;
        while (i < filtered.length) {
            if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
                result.push(filtered[i] * 2);
                i += 2;
            } else {
                result.push(filtered[i]);
                i += 1;
            }
        }
        while (result.length < 4) result.push(0);
        return result;
    }

    function applyMove(direction) {
        // direction: "UP", "DOWN", "LEFT", "RIGHT"
        let moved = false;

        if (direction === "LEFT" || direction === 2) {
            for (let r = 0; r < 4; r++) {
                const before = board2048[r].slice();
                const after = slideAndMerge(before);
                board2048[r] = after;
                if (before.toString() !== after.toString()) moved = true;
            }
        } else if (direction === "RIGHT" || direction === 3) {
            for (let r = 0; r < 4; r++) {
                const before = board2048[r].slice().reverse();
                const after = slideAndMerge(before).reverse();
                if (board2048[r].toString() !== after.toString()) moved = true;
                board2048[r] = after;
            }
        } else if (direction === "UP" || direction === 0) {
            for (let c = 0; c < 4; c++) {
                const col = [board2048[0][c], board2048[1][c], board2048[2][c], board2048[3][c]];
                const before = col.slice();
                const after = slideAndMerge(col);
                for (let r = 0; r < 4; r++) board2048[r][c] = after[r];
                if (before.toString() !== after.toString()) moved = true;
            }
        } else if (direction === "DOWN" || direction === 1) {
            for (let c = 0; c < 4; c++) {
                const col = [board2048[0][c], board2048[1][c], board2048[2][c], board2048[3][c]].reverse();
                const before = col.slice();
                const after = slideAndMerge(col).reverse();
                for (let r = 0; r < 4; r++) board2048[r][c] = after[r];
                if (before.toString() !== after.toString()) moved = true;
            }
        }

        if (moved) {
            spawnRandomTile();
        }
        render2048();
    }

    async function get2048MoveFromAI() {
        if (!AI_2048_ENDPOINT) {
            console.warn("AI_2048_ENDPOINT not set");
            return null;
        }
        try {
            if (statusEl) statusEl.textContent = "Querying AI agent…";
            const res = await fetch(AI_2048_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ board: board2048 })
            });
            const json = await res.json();
            const move = json.move;
            if (statusEl) statusEl.textContent = `AI chose: ${move}`;
            return move;
        } catch (err) {
            console.error(err);
            if (statusEl) statusEl.textContent = "Error contacting AI backend.";
            return null;
        }
    }

    if (btnStep) {
        btnStep.addEventListener("click", async () => {
            const move = await get2048MoveFromAI();
            if (!move) return;
            applyMove(move);
        });
    }

    let autoInterval = null;
    if (btnAuto) {
        btnAuto.addEventListener("click", async () => {
            if (autoInterval) {
                clearInterval(autoInterval);
                autoInterval = null;
                btnAuto.textContent = "Auto-play (AI)";
                return;
            }
            btnAuto.textContent = "Stop auto-play";
            autoInterval = setInterval(async () => {
                const move = await get2048MoveFromAI();
                if (!move) {
                    clearInterval(autoInterval);
                    autoInterval = null;
                    btnAuto.textContent = "Auto-play (AI)";
                    return;
                }
                applyMove(move);
            }, 800);
        });
    }

    if (btnReset) {
        btnReset.addEventListener("click", () => {
            board2048 = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            spawnRandomTile();
            spawnRandomTile();
            render2048();
            if (statusEl) statusEl.textContent = "Game reset.";
        });
    }

    // initial setup
    if (gridEl) {
        board2048 = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        spawnRandomTile();
        spawnRandomTile();
        render2048();
    }


});
