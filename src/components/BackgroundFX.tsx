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

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
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
    const particleColors = ["#ffbe53", "#e0a96d", "#ff7b90", "#ffd166"];

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

    // Floating Stardust Particles
    const particles: Particle[] = [];
    const maxParticles = 35;

    const spawnParticle = (): Particle => {
      return {
        x: Math.random() * width,
        y: height + 10,
        size: 1 + Math.random() * 2.2,
        speedY: 0.3 + Math.random() * 0.8,
        speedX: (Math.random() - 0.5) * 0.5,
        alpha: 0,
        life: 0,
        maxLife: 200 + Math.random() * 250,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      const p = spawnParticle();
      p.y = Math.random() * height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let time = 0;

    const render = () => {
      time += 0.03;
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

      // Draw floating stardust particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += 1;
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(time + p.life * 0.02) * 0.4;

        // Fade in and fade out
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * 0.8;
        } else if (progress > 0.8) {
          p.alpha = (1 - (progress - 0.8) / 0.2) * 0.8;
        } else {
          p.alpha = 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = spawnParticle();
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
