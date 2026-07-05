import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  type: "heart" | "sparkle" | "petal";
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 60; // Perfect balance for visuals and performance

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Color definitions in Rose Gold, Pink, Lavender, Cream, Gold
    const colors = {
      roseGold: "rgba(183, 110, 121, ",
      pink: "rgba(255, 182, 193, ",
      lavender: "rgba(230, 230, 250, ",
      cream: "rgba(253, 244, 245, ",
      gold: "rgba(212, 163, 115, ",
    };

    const getRandomType = (): "heart" | "sparkle" | "petal" => {
      const rand = Math.random();
      if (rand < 0.25) return "heart";
      if (rand < 0.7) return "sparkle";
      return "petal";
    };

    const getRandomColorPrefix = (type: string): string => {
      if (type === "heart") return Math.random() > 0.4 ? colors.pink : colors.roseGold;
      if (type === "petal") return colors.roseGold;
      return Math.random() > 0.5 ? colors.gold : colors.lavender;
    };

    const createParticle = (x: number, y: number, isCursor = false): Particle => {
      const type = getRandomType();
      const colorPrefix = getRandomColorPrefix(type);
      return {
        x,
        y,
        size: isCursor ? Math.random() * 5 + 2 : Math.random() * 8 + 3,
        speedY: isCursor ? -(Math.random() * 0.8 + 0.4) : -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * (isCursor ? 0.8 : 0.4),
        opacity: isCursor ? 1.0 : Math.random() * 0.6 + 0.2,
        fadeSpeed: isCursor ? Math.random() * 0.015 + 0.008 : 0,
        type,
        color: colorPrefix,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      };
    };

    // Initialize ambient particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(
        createParticle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        )
      );
    }

    // Capture cursor movement for sparkle trail
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only generate particles if moved significantly
      if (dist > 15) {
        // Generate sparkles
        particles.push(createParticle(e.clientX, e.clientY, true));
        if (particles.length > maxParticles + 40) {
          // Remove non-fading old particles if we exceed limit
          const firstAmbientIndex = particles.findIndex(p => p.fadeSpeed === 0);
          if (firstAmbientIndex !== -1) {
            particles.splice(firstAmbientIndex, 1);
          }
        }
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        mouseMoved = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Drawing helpers
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, colorPrefix: string) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      c.fillStyle = colorPrefix + opacity + ")";
      c.moveTo(0, -size / 4);
      c.bezierCurveTo(-size / 2, -size, -size, -size / 3, -size, size / 3);
      c.bezierCurveTo(-size, size, -size / 4, size * 1.3, 0, size * 1.6);
      c.bezierCurveTo(size / 4, size * 1.3, size, size, size, size / 3);
      c.bezierCurveTo(size, -size / 3, size / 2, -size, 0, -size / 4);
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, colorPrefix: string) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      c.fillStyle = colorPrefix + opacity + ")";
      c.strokeStyle = colorPrefix + opacity * 0.5 + ")";
      c.lineWidth = 1;

      // 4-point star
      for (let i = 0; i < 4; i++) {
        c.rotate(Math.PI / 2);
        c.lineTo(0, -size);
        c.lineTo(size * 0.25, 0);
      }
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawPetal = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      colorPrefix: string,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();
      c.fillStyle = colorPrefix + opacity + ")";
      
      // Draw almond shaped petal
      c.moveTo(0, -size);
      c.bezierCurveTo(-size * 0.7, -size * 0.5, -size * 0.7, size * 0.5, 0, size);
      c.bezierCurveTo(size * 0.7, size * 0.5, size * 0.7, -size * 0.5, 0, -size);
      
      c.fill();
      c.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background elegant slow-moving radial light gradients
      const time = Date.now() * 0.0005;
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.5) * 100,
        canvas.height * 0.5 + Math.cos(time * 0.3) * 100,
        20,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, "rgba(255, 250, 251, 1)");
      gradient.addColorStop(0.5, "rgba(253, 244, 245, 0.95)");
      gradient.addColorStop(1, "rgba(245, 235, 240, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, idx) => {
        // Drift movement
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.size) * 0.15; // smooth wave
        p.rotation += p.rotationSpeed;

        // Opacity fading for cursor trail or standard gentle pulsing
        if (p.fadeSpeed > 0) {
          p.opacity -= p.fadeSpeed;
          // Recycle cursor sparkle when completely invisible
          if (p.opacity <= 0) {
            particles.splice(idx, 1);
            return;
          }
        } else {
          // Ambient particles soft pulsing
          p.opacity = 0.25 + Math.sin(time + p.x * 0.01) * 0.15;
          
          // Recycle standard particles when they go off top screen
          if (p.y < -30) {
            p.y = canvas.height + 20;
            p.x = Math.random() * canvas.width;
          }
        }

        // Draw depending on type
        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.color);
        } else if (p.type === "petal") {
          drawPetal(ctx, p.x, p.y, p.size, p.opacity, p.color, p.rotation);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.opacity, p.color);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
