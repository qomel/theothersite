"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let rafId = null;

    function loop() {
      curX += (mouseX - curX) * 0.45;
      curY += (mouseY - curY) * 0.45;
      cursor.style.left = curX + "px";
      cursor.style.top = curY + "px";
      rafId = requestAnimationFrame(loop);
    }

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onMouseOver(e) {
      const target = e.target;
      if (target.closest("a, button, [data-hoverable]")) {
        document.body.classList.add("hovering");
      } else {
        document.body.classList.remove("hovering");
      }
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
}
