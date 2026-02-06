import { useEffect, useState } from "react";

export const MouseTrace = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (opacity === 0) setOpacity(1);

      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive") ||
        target.tagName === "H1" ||
        target.tagName === "H2";

      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
    `;
    style.id = "hide-cursor-style";
    document.head.appendChild(style);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
      const existingStyle = document.getElementById("hide-cursor-style");
      if (existingStyle) existingStyle.remove();
    };
  }, [opacity, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: "8px",
          height: "8px",
          backgroundColor: "var(--color-primary-inverse, white)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: opacity,
          transition: "opacity 0.2s ease, background-color 0.3s",
          mixBlendMode: "difference",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: isHovering ? "40px" : "30px",
          height: isHovering ? "40px" : "30px",
          border: isHovering
            ? "none"
            : "1px solid var(--color-primary-inverse, white)",
          backgroundColor: isHovering ? "white" : "transparent",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: opacity,
          transition:
            "width 0.3s ease, height 0.3s ease, background-color 0.3s ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
};
