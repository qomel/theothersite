"use client";
import { useEffect, useRef } from "react";

const timelineData = [
  {
    side: "left",
    cat: "Education",
    name: "CKZiU Racibórz",
    role: "Technikum Informatyczne",
    date: "2018–2022",
    tags: ["Technik Informatyk"],
  },
  {
    side: "right",
    cat: "Education",
    name: "Merito WSB Chorzów",
    role: "Informatyka inż. — Frontend Dev",
    date: "2022–2026",
    tags: ["Inżynier Informatyki", "Frontend Dev"],
  },
  {
    side: "left",
    cat: "Experience",
    name: "PRO-MED",
    role: "IT Support Specialist — Volunteer",
    date: "06.2022–12.2024",
    tags: ["Hardware", "Tech Support"],
  },
  {
    side: "right",
    cat: "Experience",
    name: "Giganci Programowania",
    role: "Programming Trainer",
    date: "02.2025–07.2025",
    tags: ["Python", "Teaching"],
  },
  {
    side: "left",
    cat: "Experience",
    name: "Kostar",
    role: "IT Infrastructure Specialist",
    date: "06.2025–present",
    tags: ["Server Admin", "IT Support"],
  },
];

function TimelineCard({ entry, side }) {
  return (
    <div
      className={`rt-card${side === "left" ? " rt-left" : " rt-right"}`}
      style={{
        textAlign: side === "left" ? "right" : "left",
        paddingRight: side === "left" ? "40px" : "0",
        paddingLeft: side === "right" ? "40px" : "0",
      }}
    >
      <p
        className="rt-cat"
        style={{
          fontFamily: "var(--dm, sans-serif)",
          fontSize: "10px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(240,232,213,0.65)",
          margin: "0 0 6px 0",
        }}
      >
        {entry.cat}
      </p>

      <p
        className="rt-name"
        style={{
          fontFamily: "var(--italiana, serif)",
          fontSize: "clamp(26px, 2.8vw, 40px)",
          fontWeight: 400,
          color: "rgba(240,232,213,0.9)",
          lineHeight: 1.1,
          margin: "0 0 8px 0",
        }}
      >
        {entry.name}
      </p>

      <p
        className="rt-role"
        style={{
          fontFamily: "var(--cormorant, serif)",
          fontStyle: "italic",
          fontSize: "14px",
          color: "rgba(240,232,213,0.48)",
          margin: "0 0 6px 0",
        }}
      >
        {entry.role}
      </p>

      <p
        className="rt-date"
        style={{
          fontFamily: "var(--dm, sans-serif)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(240,232,213,0.22)",
          margin: "0 0 12px 0",
        }}
      >
        {entry.date}
      </p>

      <div
        className="rt-tags"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          justifyContent: side === "left" ? "flex-end" : "flex-start",
        }}
      >
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rt-tag"
            style={{
              fontFamily: "var(--dm, sans-serif)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(240,232,213,0.5)",
              border: "1px solid rgba(240,232,213,0.12)",
              padding: "3px 10px",
              borderRadius: "4px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ResumeSection() {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;

    /* On mobile — don't run scroll-driven animation */
    const isMobile = () => window.innerWidth < 768;

    function clamp(v, lo, hi) {
      return Math.max(lo, Math.min(hi, v));
    }

    function onScroll() {
      if (isMobile()) {
        /* On mobile just use IntersectionObserver style: mark all visible */
        rowRefs.current.forEach((row) => {
          if (!row) return;
          const rect = row.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8) {
            row.classList.add("visible");
          }
        });
        return;
      }

      const rect = wrap.getBoundingClientRect();
      const progress = clamp(
        -rect.top / (wrap.offsetHeight - window.innerHeight),
        0,
        1
      );

      fill.style.height = progress * 100 + "%";

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const threshold = (i / timelineData.length) * 0.85 + 0.05;
        if (progress >= threshold) {
          row.classList.add("visible");
        } else {
          row.classList.remove("visible");
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      id="work"
      ref={wrapRef}
      className="bg-secondary relative"
      style={{ height: "550vh", paddingBottom: "120px" }}
    >
      <section
        className="work sticky top-0 h-screen overflow-hidden flex flex-col box-border"
        style={{
          background: "#260009",
          padding: "56px 20px 100px",
        }}
      >
        {/* Override padding for desktop */}
        <style>{`
          @media (min-width: 768px) {
            .work { padding: 56px 120px 100px !important; }
          }
          @media (max-width: 767px) {
            #work { height: auto !important; }
            .work { position: relative !important; height: auto !important; overflow: visible !important; }
          }
        `}</style>

        {/* Header */}
        <div className="rt-header mb-6 flex-shrink-0">
          <p className="section-label">Career & Education</p>
          <h2 className="section-title">Resume</h2>
        </div>

        {/* Body */}
        <div
          className="rt-body flex-1 relative flex flex-col justify-evenly"
          style={{ minHeight: 0 }}
        >
          {/* Spine background */}
          <div
            className="rt-spine-bg hidden md:block absolute top-0 bottom-0"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              background: "rgba(240,232,213,0.07)",
            }}
          />

          {/* Spine fill */}
          <div
            ref={fillRef}
            className="hidden md:block absolute top-0"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              height: "0%",
              background:
                "linear-gradient(to bottom, #68001a, rgba(104,0,26,0.2))",
              zIndex: 1,
              transition: "height 0.1s ease",
            }}
          />

          {/* Timeline rows */}
          {timelineData.map((entry, i) => (
            <div
              key={i}
              ref={(el) => (rowRefs.current[i] = el)}
              data-idx={i}
              className="rt-row"
              style={{
                /* Desktop: 3-col grid */
                display: "grid",
              }}
            >
              <style>{`
                .rt-row {
                  grid-template-columns: 1fr 48px 1fr;
                  align-items: center;
                }
                @media (max-width: 767px) {
                  .rt-row {
                    grid-template-columns: 1fr !important;
                    gap: 8px;
                    padding: 16px 0;
                    border-bottom: 1px solid rgba(240,232,213,0.07);
                  }
                  .rt-mid { display: none !important; }
                  .rt-left, .rt-right {
                    text-align: left !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                  }
                  .rt-space { display: none !important; }
                }
              `}</style>

              {entry.side === "left" ? (
                <>
                  <TimelineCard entry={entry} side="left" />
                  <div
                    className="rt-mid hidden md:flex justify-center items-center"
                    style={{ zIndex: 2 }}
                  >
                    <div
                      className="rt-node"
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: "#260009",
                        border: "1px solid rgba(240,232,213,0.15)",
                        transition:
                          "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
                      }}
                    />
                  </div>
                  <div className="rt-space hidden md:block" />
                </>
              ) : (
                <>
                  <div className="rt-space hidden md:block" />
                  <div
                    className="rt-mid hidden md:flex justify-center items-center"
                    style={{ zIndex: 2 }}
                  >
                    <div
                      className="rt-node"
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: "#260009",
                        border: "1px solid rgba(240,232,213,0.15)",
                        transition:
                          "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
                      }}
                    />
                  </div>
                  <TimelineCard entry={entry} side="right" />
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
