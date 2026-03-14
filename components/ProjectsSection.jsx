"use client";
import { useEffect, useRef } from "react";

const projects = [
  {
    num: "01",
    title: "Pro-Med Racibórz",
    meta: "E-commerce — Client",
    href: "https://promed-raciborz.pl",
    preview: 0,
  },
  {
    num: "02",
    title: "Portfolio v1",
    meta: "Personal — Design & Dev",
    href: "https://theothersite.pl",
    preview: 1,
  },
  {
    num: "03",
    title: "Kostar IT",
    meta: "Corporate — Client",
    href: "https://kostar.pl",
    preview: 2,
  },
];

const previewGradients = [
  "linear-gradient(135deg, #f5e6c8 0%, #e8c99a 50%, #d4a96a 100%)",
  "linear-gradient(135deg, #c8d8f5 0%, #9ab5e8 50%, #6a8fd4 100%)",
  "linear-gradient(135deg, #c8f5d8 0%, #9ae8b5 50%, #6ad48f 100%)",
];

const previewLabels = ["Pro-Med Racibórz", "Portfolio v1", "Kostar IT"];

function PreviewPlaceholder({ index }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: previewGradients[index],
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          fontFamily: "var(--dm, sans-serif)",
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(10,10,26,0.55)",
        }}
      >
        {previewLabels[index]}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "var(--italiana, serif)",
          fontSize: "180px",
          fontWeight: 400,
          color: "rgba(10,10,26,0.05)",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="scanlines" />
    </div>
  );
}

export default function ProjectsSection() {
  const floatRef = useRef(null);
  const innerRef = useRef(null);
  const listRef = useRef(null);
  const floatYRef = useRef(300);
  const targetYRef = useRef(300);
  const rafLoopRef = useRef(null);
  const currentIdxRef = useRef(-1);
  const clearTimerRef = useRef(null);

  /* Intersection observer for row reveals */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const rows = list.querySelectorAll(".project-row");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    rows.forEach((row) => obs.observe(row));
    return () => obs.disconnect();
  }, []);

  /* Floating preview + mouse tracking */
  useEffect(() => {
    const float = floatRef.current;
    const inner = innerRef.current;
    const list = listRef.current;
    if (!float || !inner || !list) return;

    let mouseY = 0;
    const isMobile = () => window.innerWidth < 1024;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function rafLoop() {
      const H = float.offsetHeight;
      const winH = window.innerHeight;
      const clamped = Math.max(H / 2, Math.min(winH - H / 2, targetYRef.current));
      floatYRef.current = lerp(floatYRef.current, clamped, 0.1);
      float.style.top = floatYRef.current - H / 2 + "px";
      rafLoopRef.current = requestAnimationFrame(rafLoop);
    }

    function onMouseMove(e) {
      mouseY = e.clientY;
      targetYRef.current = mouseY;
    }

    function swapPreview(idx) {
      if (currentIdxRef.current === idx) return;
      currentIdxRef.current = idx;

      /* Exit existing slide */
      const existing = inner.querySelector(".preview-slide:not(.exit)");
      if (existing) {
        existing.classList.add("exit");
        existing.addEventListener(
          "animationend",
          () => {
            if (existing.parentNode) existing.parentNode.removeChild(existing);
          },
          { once: true }
        );
      }

      /* Create new slide */
      const slide = document.createElement("div");
      slide.className = "preview-slide";
      slide.style.cssText = "position:absolute;inset:0;";

      const bg = document.createElement("div");
      bg.style.cssText = `position:absolute;inset:0;background:${previewGradients[idx]};`;

      const label = document.createElement("div");
      label.style.cssText =
        "position:absolute;bottom:20px;left:20px;font-family:var(--dm,sans-serif);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(10,10,26,0.55);";
      label.textContent = previewLabels[idx];

      const num = document.createElement("div");
      num.style.cssText =
        "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--italiana,serif);font-size:180px;font-weight:400;color:rgba(10,10,26,0.05);line-height:1;user-select:none;";
      num.textContent = String(idx + 1).padStart(2, "0");

      const scanlines = document.createElement("div");
      scanlines.className = "scanlines";

      bg.appendChild(label);
      bg.appendChild(num);
      bg.appendChild(scanlines);
      slide.appendChild(bg);
      inner.appendChild(slide);
    }

    function showFloat() {
      if (isMobile()) return;
      float.classList.add("visible");
      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current);
        clearTimerRef.current = null;
      }
      if (!rafLoopRef.current) {
        rafLoopRef.current = requestAnimationFrame(rafLoop);
      }
    }

    function hideFloat() {
      float.classList.remove("visible");
      if (rafLoopRef.current) {
        cancelAnimationFrame(rafLoopRef.current);
        rafLoopRef.current = null;
      }
      clearTimerRef.current = setTimeout(() => {
        inner.innerHTML = "";
        currentIdxRef.current = -1;
      }, 400);
    }

    /* Attach row events */
    const rows = list.querySelectorAll(".project-row");
    const enterHandlers = [];
    rows.forEach((row, i) => {
      const handler = () => {
        showFloat();
        swapPreview(i);
      };
      row.addEventListener("mouseenter", handler);
      enterHandlers.push({ row, handler });
    });

    list.addEventListener("mouseleave", hideFloat);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      list.removeEventListener("mouseleave", hideFloat);
      window.removeEventListener("mousemove", onMouseMove);
      enterHandlers.forEach(({ row, handler }) =>
        row.removeEventListener("mouseenter", handler)
      );
      if (rafLoopRef.current) cancelAnimationFrame(rafLoopRef.current);
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Floating preview — desktop only */}
      <div
        ref={floatRef}
        className="preview-float hidden lg:block"
        style={{
          position: "fixed",
          right: "320px",
          width: "640px",
          height: "360px",
          borderRadius: "4px",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        <div
          ref={innerRef}
          style={{ position: "absolute", inset: 0 }}
        />
      </div>

      <div className="projects-wrap relative z-10">
        <section
          id="projects"
          className="py-20 px-5 md:px-[120px] pb-[160px] relative overflow-hidden"
          style={{ background: "#260009" }}
        >
          {/* Section header */}
          <div className="flex justify-between items-end mb-[72px]">
            <div>
              <p className="section-label">Selected work</p>
              <h2 className="section-title">Projects</h2>
            </div>
          </div>

          {/* Project list */}
          <div ref={listRef} className="w-full">
            {projects.map((project, i) => (
              <a
                key={project.num}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                data-hoverable
                className={`project-row group flex md:grid items-center py-7 px-6 no-underline border-t border-[rgba(240,232,213,0.12)]${i === projects.length - 1 ? " border-b" : ""}`}
                style={{
                  color: "inherit",
                  gridTemplateColumns: "48px 260px 1fr auto",
                  gap: "0",
                }}
              >
                {/* Number */}
                <span
                  className="row-num flex-shrink-0 mr-4 md:mr-0"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.2em",
                    color: "rgba(240,232,213,0.5)",
                    transition: "color 0.3s ease",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {project.num}
                </span>

                {/* Title */}
                <span
                  className="row-title flex-1 md:flex-none"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(240,232,213,0.72)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {project.title}
                </span>

                {/* Meta — hidden on mobile */}
                <span
                  className="row-meta hidden md:block"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(240,232,213,0.4)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {project.meta}
                </span>

                {/* Right — see project + arrow */}
                <span className="row-right ml-auto">
                  <span
                    className="row-see hidden md:block"
                    style={{
                      fontFamily: "var(--cormorant, serif)",
                      fontStyle: "italic",
                      fontSize: "18px",
                      letterSpacing: "0.08em",
                      color: "rgba(240,232,213,0.7)",
                    }}
                  >
                    See project
                  </span>
                  <span
                    className="row-arrow"
                    style={{
                      transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(240,232,213,0.7)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
