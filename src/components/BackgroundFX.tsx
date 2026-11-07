"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  color: string;
}

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  color: string,
  alpha: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  const w = size;
  const h = size * 1.1;
  ctx.moveTo(0, -h * 0.2);
  ctx.bezierCurveTo(-w * 0.55, -h * 0.75, -w * 0.95, -h * 0.05, 0, h * 0.65);
  ctx.bezierCurveTo(w * 0.95, -h * 0.05, w * 0.55, -h * 0.75, 0, -h * 0.2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.shadowBlur = 10;
  ctx.shadowColor = color;
  ctx.fill();
  ctx.restore();
}

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // Star colors: champagne, rose gold, pale warm white
    const starColors = ["#ffffff", "#ffe8cc", "#ffd8a8", "#ffc9c9", "#ffe0e6"];
    // Romantic floating heart colors: glowing ruby, warm gold, blush pink, soft rose
    const heartColors = [
      "#ff4d6d",
      "#ff758f",
      "#ff85a1",
      "#ffbe53",
      "#ffd166",
      "#f472b6",
      "#ffc2d1",
      "#e0a96d",
    ];

    let stars: Star[] = [];
    const initStars = () => {
      const starCount = Math.floor((width * height) / 9000);
      stars = Array.from({ length: Math.min(120, Math.max(50, starCount)) }, () => {
        const baseAlpha = 0.2 + Math.random() * 0.6;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.8 + Math.random() * 1.8,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: 0.008 + Math.random() * 0.02,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        };
      });
    };

    initStars();

    // Floating Little Heart Particles
    const hearts: HeartParticle[] = [];
    const maxHearts = 45;

    const spawnHeart = (): HeartParticle => {
      return {
        x: Math.random() * width,
        y: height + 20,
        size: 5 + Math.random() * 7,
        speedY: 0.35 + Math.random() * 0.65,
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: (Math.random() - 0.5) * 0.6,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        alpha: 0,
        life: 0,
        maxLife: 260 + Math.random() * 260,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      };
    };

    for (let i = 0; i < maxHearts; i++) {
      const h = spawnHeart();
      h.y = Math.random() * height;
      h.life = Math.random() * h.maxLife;
      hearts.push(h);
    }

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Deep celestial background gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, "#160e29");
      bgGrad.addColorStop(0.45, "#0d0918");
      bgGrad.addColorStop(1, "#07040d");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Warm subtle ambient glows
      const glow1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.7,
        10,
        width * 0.2,
        height * 0.7,
        width * 0.4
      );
      glow1.addColorStop(0, "rgba(224, 169, 109, 0.08)");
      glow1.addColorStop(1, "rgba(224, 169, 109, 0)");
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, width, height);

      const glow2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        10,
        width * 0.8,
        height * 0.2,
        width * 0.45
      );
      glow2.addColorStop(0, "rgba(255, 123, 144, 0.07)");
      glow2.addColorStop(1, "rgba(255, 123, 144, 0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);

      // Draw and twinkle stars
      for (const s of stars) {
        s.alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed * 50) * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, s.alpha));
        ctx.shadowBlur = s.size > 1.5 ? 8 : 2;
        ctx.shadowColor = s.color;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Draw floating little glowing hearts
      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.life += 1;
        h.y -= h.speedY;
        h.x += h.speedX + Math.sin(time + h.life * 0.02) * 0.45;
        h.rotation += h.rotationSpeed;

        // Fade in and fade out envelope
        const progress = h.life / h.maxLife;
        if (progress < 0.15) {
          h.alpha = (progress / 0.15) * 0.85;
        } else if (progress > 0.8) {
          h.alpha = (1 - (progress - 0.8) / 0.2) * 0.85;
        } else {
          h.alpha = 0.85;
        }

        drawHeart(ctx, h.x, h.y, h.size, h.rotation, h.color, h.alpha);

        if (h.life >= h.maxLife || h.y < -25) {
          hearts[i] = spawnHeart();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ touchAction: "none" }}
    />
  );
}
