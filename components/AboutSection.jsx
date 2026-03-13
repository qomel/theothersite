"use client";
import { useEffect, useRef } from "react";

const row1items = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", learning: true },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "Webflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const row2items = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "Lightroom", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" },
  { name: "Affinity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
];

function StackItem({ name, icon, learning }) {
  return (
    <div
      className={`stack-item flex items-center gap-3 px-6 py-[14px] rounded-xl border border-[rgba(240,232,213,0.1)] bg-[rgba(240,232,213,0.03)] whitespace-nowrap flex-shrink-0 hover:-translate-y-0.5 cursor-default transition-all duration-[250ms]${learning ? " learning" : ""}`}
      data-hoverable
    >
      <img
        src={icon}
        alt={name}
        width={24}
        height={24}
        style={{ filter: "brightness(0.85)", transition: "filter 0.2s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(0.85)")}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span
        style={{
          fontFamily: "var(--dm, sans-serif)",
          fontSize: "13px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(240,232,213,0.7)",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function AboutSection() {
  const bioRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  /* IntersectionObserver for bio reveal */
  useEffect(() => {
    const bio = bioRef.current;
    if (!bio) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bio.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(bio);
    return () => obs.disconnect();
  }, []);

  /* Marquee ready class — add after images settle */
  useEffect(() => {
    const t1 = track1Ref.current;
    const t2 = track2Ref.current;
    if (!t1 || !t2) return;

    const allImgs = [...t1.querySelectorAll("img"), ...t2.querySelectorAll("img")];
    let loaded = 0;

    function start() {
      t1.classList.add("animate-left");
      t2.classList.add("animate-right");
    }

    if (allImgs.length === 0) {
      start();
      return;
    }

    function onLoad() {
      loaded++;
      if (loaded >= allImgs.length) start();
    }

    allImgs.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onLoad);
      }
    });

    /* Fallback: start after 1s regardless */
    const timer = setTimeout(start, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      className="relative z-10 py-[120px] px-5 md:px-[84px] pb-[160px]"
      style={{
        background: "#260009",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      {/* Section header */}
      <div className="flex justify-between items-end mb-[72px]">
        <div>
          <p className="section-label">Who I am</p>
          <h2 className="section-title">About</h2>
        </div>
      </div>

      {/* About grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] mt-[80px]">
        {/* Bio column */}
        <div ref={bioRef} className="about-bio">
          <div className="accent-line" />

          <p
            style={{
              fontFamily: "var(--cormorant, serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.25rem",
              lineHeight: 1.8,
              color: "rgba(240,232,213,0.72)",
              marginBottom: "1.5rem",
            }}
          >
            I&apos;m a <strong style={{ fontWeight: 400, color: "rgba(240,232,213,0.9)", fontStyle: "normal" }}>frontend developer</strong> based in Racibórz, Poland, passionate about crafting digital experiences that blend aesthetics with engineering precision.
          </p>

          <p
            style={{
              fontFamily: "var(--cormorant, serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.25rem",
              lineHeight: 1.8,
              color: "rgba(240,232,213,0.72)",
              marginBottom: "1.5rem",
            }}
          >
            Currently pursuing an <strong style={{ fontWeight: 400, color: "rgba(240,232,213,0.9)", fontStyle: "normal" }}>Engineering degree in Computer Science</strong> with a Frontend Development specialisation at Merito WSB Chorzów, expected to graduate in 2026.
          </p>

          <p
            style={{
              fontFamily: "var(--cormorant, serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.25rem",
              lineHeight: 1.8,
              color: "rgba(240,232,213,0.72)",
              marginBottom: "1.5rem",
            }}
          >
            When I&apos;m not writing code, I&apos;m exploring <strong style={{ fontWeight: 400, color: "rgba(240,232,213,0.9)", fontStyle: "normal" }}>photography, design systems</strong>, and the intersection of technology and visual storytelling.
          </p>
        </div>

        {/* Skills placeholder */}
        <div className="about-skills" />
      </div>

      {/* Stack & Tools */}
      <p className="section-label mt-16">Stack & Tools</p>

      <div className="stack-wrap">
        {/* Row 1 — left scroll */}
        <div
          ref={track1Ref}
          className="stack-track"
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {[...row1items, ...row1items, ...row1items, ...row1items].map((item, i) => (
            <StackItem key={`r1-${i}`} {...item} />
          ))}
        </div>

        {/* Row 2 — right scroll */}
        <div
          ref={track2Ref}
          className="stack-track"
          style={{ marginTop: "12px" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {[...row2items, ...row2items, ...row2items, ...row2items].map((item, i) => (
            <StackItem key={`r2-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
