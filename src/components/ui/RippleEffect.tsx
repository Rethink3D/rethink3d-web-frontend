import { useEffect, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const RippleEffect = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9997, 
        overflow: "hidden",
      }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            animation: "ripple 1s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
      <style>{`
        @keyframes ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.8;
            border: 2px solid rgba(100, 100, 255, 0.5); 
            background-color: rgba(100, 100, 255, 0.1);
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
            border: 1px solid rgba(100, 100, 255, 0);
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};
