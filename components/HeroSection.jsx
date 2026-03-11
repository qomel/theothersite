"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const heroEl = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    let W, H;
    let rotX = 0;
    let rotY = 0;
    let dragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastTouchX = 0;
    let lastTouchY = 0;
    let rafId = null;

    const RINGS = 16;
    const SEGS = 26;
    const R = 300;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    /* ── 3D rotation helpers ── */
    function rY(x, y, z, a) {
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      return {
        x: x * cos + z * sin,
        y,
        z: -x * sin + z * cos,
      };
    }

    function rX(x, y, z, a) {
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      return {
        x,
        y: y * cos - z * sin,
        z: y * sin + z * cos,
      };
    }

    function project(x, y, z, fov, cx, cy) {
      const scale = fov / (fov + z);
      return {
        sx: cx + x * scale,
        sy: cy + y * scale,
        scale,
      };
    }

    /* ── Build sphere points and lines ── */
    function buildSphere() {
      const pts = [];
      const lines = [];

      for (let ri = 0; ri <= RINGS; ri++) {
        const phi = (Math.PI * ri) / RINGS;
        for (let si = 0; si < SEGS; si++) {
          const theta = (2 * Math.PI * si) / SEGS;
          pts.push({
            x: R * Math.sin(phi) * Math.cos(theta),
            y: R * Math.cos(phi),
            z: R * Math.sin(phi) * Math.sin(theta),
          });
        }
      }

      /* horizontal rings */
      for (let ri = 0; ri <= RINGS; ri++) {
        for (let si = 0; si < SEGS; si++) {
          const a = ri * SEGS + si;
          const b = ri * SEGS + ((si + 1) % SEGS);
          lines.push([a, b]);
        }
      }

      /* vertical meridians */
      for (let si = 0; si < SEGS; si++) {
        for (let ri = 0; ri < RINGS; ri++) {
          const a = ri * SEGS + si;
          const b = (ri + 1) * SEGS + si;
          lines.push([a, b]);
        }
      }

      return { pts, lines };
    }

    const { pts, lines } = buildSphere();
    const FOV = 700;

    function loop() {
      if (!dragging) {
        rotY += 0.003;
      }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#fcf5e5";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      /* transform all points */
      const transformed = pts.map((p) => {
        let v = rY(p.x, p.y, p.z, rotY);
        v = rX(v.x, v.y, v.z, rotX);
        return v;
      });

      /* draw lines */
      for (const [a, b] of lines) {
        const pa = transformed[a];
        const pb = transformed[b];
        const pA = project(pa.x, pa.y, pa.z, FOV, cx, cy);
        const pB = project(pb.x, pb.y, pb.z, FOV, cx, cy);

        /* depth-based alpha — closer (larger scale) = more visible */
        const depth = (pA.scale + pB.scale) / 2;
        const alpha = Math.max(0, (depth - 0.28) * 0.55) * 0.4;

        ctx.beginPath();
        ctx.moveTo(pA.sx, pA.sy);
        ctx.lineTo(pB.sx, pB.sy);
        ctx.strokeStyle = `rgba(104,0,26,${alpha.toFixed(3)})`;
        ctx.lineWidth = depth * 0.5;
        ctx.stroke();
      }

      /* draw dots at vertices — skip poles (ring 0 and ring RINGS have 26 duplicate points) */
      transformed.forEach((p, idx) => {
        const ring = Math.floor(idx / SEGS);
        if (ring === 0 || ring === RINGS) return;

        const proj = project(p.x, p.y, p.z, FOV, cx, cy);
        const alpha = Math.max(0, (proj.scale - 0.28) * 0.45);

        ctx.beginPath();
        ctx.arc(proj.sx, proj.sy, proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(104,0,26,${alpha.toFixed(3)})`;
        ctx.fill();
      });

      /* random navy dot on a random sphere vertex — 4% chance per frame */
      if (Math.random() < 0.04) {
        const rp = transformed[Math.floor(Math.random() * transformed.length)];
        const rproj = project(rp.x, rp.y, rp.z, FOV, cx, cy);
        ctx.beginPath();
        ctx.arc(rproj.sx, rproj.sy, rproj.scale * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,78,${Math.max(0, (rproj.scale - 0.28) * 0.9).toFixed(3)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    }

    /* ── Drag handlers ── */
    function onMouseDown(e) {
      dragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    }

    function onMouseMove(e) {
      if (!dragging) return;
      rotY -= (e.clientX - lastMouseX) * 0.003;
      rotX += (e.clientY - lastMouseY) * 0.003;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    }

    function onMouseUp() {
      dragging = false;
    }

    function onTouchStart(e) {
      if (e.touches.length === 1) {
        dragging = true;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
      }
    }

    function onTouchMove(e) {
      if (!dragging || e.touches.length !== 1) return;
      e.preventDefault();
      rotY -= (e.touches[0].clientX - lastTouchX) * 0.003;
      rotX += (e.touches[0].clientY - lastTouchY) * 0.003;
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
    }

    function onTouchEnd() {
      dragging = false;
    }

    resize();
    loop();

    window.addEventListener("resize", resize);
    heroEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    heroEl.addEventListener("touchstart", onTouchStart, { passive: true });
    heroEl.addEventListener("touchmove", onTouchMove, { passive: false });
    heroEl.addEventListener("touchend", onTouchEnd);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      heroEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      heroEl.removeEventListener("touchstart", onTouchStart);
      heroEl.removeEventListener("touchmove", onTouchMove);
      heroEl.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section
      id="hero"
      className="sticky top-0 h-screen min-h-[700px] overflow-hidden flex flex-col items-center justify-end pb-24 z-0"
      style={{ background: "#fcf5e5", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Gradient overlay — cream fade at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to top, rgba(252,245,229,0.92) 0%, rgba(252,245,229,0.4) 40%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div
        className="absolute top-8 animate-fade-down"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          fontFamily: "var(--italiana, serif)",
          fontSize: 40,
          fontWeight: 400,
          letterSpacing: "0.04em",
          color: "rgba(38,0,9,0.85)",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        THEOTHERSITE
      </div>

      {/* Coords */}
      <div
        className="absolute top-10 left-10 animate-fade-in-2"
        style={{
          zIndex: 10,
          fontFamily: "var(--dm, sans-serif)",
          fontSize: "11px",
          letterSpacing: "0.12em",
          color: "rgba(38,0,9,0.45)",
          textTransform: "uppercase",
          lineHeight: 1.8,
        }}
      >
        50°17′32″N
        <br />
        18°40′02″E
      </div>

      {/* Hero Content */}
      <div
        className="relative text-center animate-fade-up-2"
        style={{ zIndex: 10 }}
      >
        <h1
          style={{
            fontFamily: "var(--cormorant, serif)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "0.002em",
            color: "rgba(38,0,9,0.85)",
            marginBottom: "20px",
            margin: "0 0 20px 0",
          }}
        >
          Built with passion
        </h1>
        <p
          style={{
            fontFamily: "var(--cormorant, serif)",
            fontSize: "clamp(16px, 2vw, 24px)",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "rgba(38,0,9,0.6)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Dominik Pazurek · Frontend Developer
        </p>
      </div>

      {/* Social icons */}
      <div
        className="absolute bottom-10 right-10 flex gap-[18px] animate-fade-in-4"
        style={{ zIndex: 10 }}
      >
        {/* GitHub */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          data-hoverable
          className="transition-transform duration-200 hover:-translate-y-0.5"
          style={{ color: "rgba(38,0,9,0.55)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(38,0,9,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(38,0,9,0.55)")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          data-hoverable
          className="transition-transform duration-200 hover:-translate-y-0.5"
          style={{ color: "rgba(38,0,9,0.55)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(38,0,9,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(38,0,9,0.55)")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        {/* Email */}
        <a
          href="mailto:hello@theothersite.pl"
          data-hoverable
          className="transition-transform duration-200 hover:-translate-y-0.5"
          style={{ color: "rgba(38,0,9,0.55)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(38,0,9,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(38,0,9,0.55)")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
