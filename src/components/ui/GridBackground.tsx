import React, { useEffect, useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useSettings } from "../../context/useSettings";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  color: string;

  constructor(width: number, height: number, color: string) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  update(mouse: { x: number; y: number }, color: string) {
    this.color = color;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.height) this.vy *= -1;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 200;

    if (distance < maxDist) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (maxDist - distance) / maxDist;
      const directionX = forceDirectionX * force * 5;
      const directionY = forceDirectionY * force * 5;

      this.x -= directionX;
      this.y -= directionY;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export const GridBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();
  const { isAnimationEnabled } = useSettings();

  useEffect(() => {
    if (!isAnimationEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];

    const isMobile = window.innerWidth < 768;
    const particleCount = Math.min(
      window.innerWidth / (isMobile ? 25 : 15),
      100,
    );

    const getParticleColor = () =>
      theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)";

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height, getParticleColor()));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const particleColor = getParticleColor();

      particles.forEach((particle) => {
        particle.update(mouseRef.current, particleColor);
        particle.draw(ctx);
      });

      connect();

      requestAnimationFrame(animate);
    };

    const connect = () => {
      if (!ctx) return;

      const maxDist = isMobile ? 80 : 150;

      const isLight = theme === "light";
      const r = isLight ? 0 : 255;
      const g = isLight ? 0 : 255;
      const b = isLight ? 0 : 255;

      for (let a = 0; a < particles.length; a++) {
        for (let j = a; j < particles.length; j++) {
          const dx = particles[a].x - particles[j].x;
          const dy = particles[a].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDist) {
            const opacity = 1 - distance / maxDist;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    init();
    handleResize();
    const animationId = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme, isAnimationEnabled]);

  if (!isAnimationEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
});
