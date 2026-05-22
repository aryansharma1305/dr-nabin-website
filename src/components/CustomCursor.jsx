import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = ringRef.current;
    if (!cursor || !cursorRing) return undefined;

    let ringTimeout;

    const handleMouseMove = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      window.clearTimeout(ringTimeout);
      ringTimeout = window.setTimeout(() => {
        cursorRing.style.left = `${event.clientX}px`;
        cursorRing.style.top = `${event.clientY}px`;
      }, 80);
    };

    const handleEnter = () => {
      cursorRing.style.width = "50px";
      cursorRing.style.height = "50px";
      cursorRing.style.borderColor = "#D4A843";
      cursorRing.style.backgroundColor = "rgba(212, 168, 67, 0.15)";
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
    };

    const handleLeave = () => {
      cursorRing.style.width = "2.5rem";
      cursorRing.style.height = "2.5rem";
      cursorRing.style.borderColor = "rgba(212, 168, 67, 0.5)";
      cursorRing.style.backgroundColor = "transparent";
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const interactables = document.querySelectorAll("a, button, .group, .magnetic-btn");
    document.addEventListener("mousemove", handleMouseMove);
    interactables.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.clearTimeout(ringTimeout);
      document.removeEventListener("mousemove", handleMouseMove);
      interactables.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className="hidden md:block fixed w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-[100] transition-transform duration-100 ease-out cursor-primary-glow mix-blend-screen"
        id="custom-cursor"
        ref={cursorRef}
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
      <div
        className="hidden md:block fixed w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-[99] transition-all duration-300 ease-out cursor-ring-glow"
        id="cursor-ring"
        ref={ringRef}
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
    </>
  );
}
