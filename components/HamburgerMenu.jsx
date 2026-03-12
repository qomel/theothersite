"use client";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
];

const DELAYS = [0.15, 0.22, 0.29, 0.36];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    function checkHamburger() {
      setIsDark(window.scrollY > window.innerHeight * 0.85);
    }
    window.addEventListener("scroll", checkHamburger, { passive: true });
    checkHamburger();
    return () => window.removeEventListener("scroll", checkHamburger);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  /* Button background color */
  let btnBg;
  if (isOpen) {
    btnBg = "transparent";
  } else if (isDark) {
    btnBg = "#fcf5e5";
  } else {
    btnBg = "#68001a";
  }

  /* Line color */
  let lineColor;
  if (isOpen || !isDark) {
    lineColor = "#fcf5e5";
  } else {
    lineColor = "#68001a";
  }

  /* barPulse animation — only when hovered and menu is closed */
  function lineAnim(delay) {
    if (isHovered && !isOpen) {
      return { animation: `barPulse 0.7s ease-in-out ${delay}s infinite` };
    }
    return { animation: "none" };
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="hamburger-btn fixed top-8 right-10 z-[2000] w-12 h-12 rounded-full flex flex-col justify-center items-center gap-[5px] border-0 outline-none focus:outline-none"
        style={{
          background: btnBg,
          transition: "background 0.4s ease",
        }}
        onClick={toggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        data-hoverable
      >
        <span
          className="hamburger-line w-[22px]"
          style={{
            background: lineColor,
            ...lineAnim(0),
            ...(isOpen && { transform: "translateY(6.5px) rotate(45deg)", animation: "none" }),
          }}
        />
        <span
          className="hamburger-line w-[22px]"
          style={{
            background: lineColor,
            ...lineAnim(0.18),
            ...(isOpen && { opacity: 0, width: "0px", animation: "none" }),
          }}
        />
        <span
          className="hamburger-line w-[22px]"
          style={{
            background: lineColor,
            ...lineAnim(0.36),
            ...(isOpen && { transform: "translateY(-6.5px) rotate(-45deg)", animation: "none" }),
          }}
        />
      </button>

      {/* Fullscreen Menu */}
      <nav
        className={`fullmenu fixed inset-0 z-[1500] bg-primary flex flex-col justify-center items-start${isOpen ? " open" : ""}`}
        style={{ padding: "0 12vw" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="fullmenu-item"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateX(0)" : "translateX(-24px)",
              transition: `opacity 0.4s ease ${isOpen ? DELAYS[i] : 0}s, transform 0.4s cubic-bezier(0.76,0,0.24,1) ${isOpen ? DELAYS[i] : 0}s`,
            }}
            onClick={close}
            data-hoverable
          >
            <span className="fullmenu-name">{item.label}</span>
          </a>
        ))}

        <p
          className="absolute bottom-12 right-10"
          style={{
            fontFamily: "var(--dm, sans-serif)",
            fontStyle: "italic",
            fontSize: "13px",
            letterSpacing: "0.08em",
            color: "rgba(252,245,229,0.25)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.4s ease 0.5s",
          }}
        >
          click anywhere to close
        </p>
      </nav>
    </>
  );
}
