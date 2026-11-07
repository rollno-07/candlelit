/**
 * Candlelit Photo Beautifier & Aesthetic Filter Engine
 * Enhances user uploaded photos with warm candlelight tones, cinematic contrast, and soft vignette.
 */

export async function enhancePhotoCandlelight(dataUrl: string): Promise<string> {
  if (typeof window === "undefined") return dataUrl;

  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // 1. Warm Golden Hour Overlay
      const warmGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      warmGrad.addColorStop(0, "rgba(255, 190, 83, 0.12)");
      warmGrad.addColorStop(0.5, "rgba(224, 169, 109, 0.08)");
      warmGrad.addColorStop(1, "rgba(255, 123, 144, 0.08)");
      ctx.fillStyle = warmGrad;
      ctx.globalCompositeOperation = "color";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Soft Candlelight Glow & Contrast Boost
      ctx.globalCompositeOperation = "soft-light";
      const glowGrad = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.45,
        Math.min(canvas.width, canvas.height) * 0.15,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.75
      );
      glowGrad.addColorStop(0, "rgba(255, 220, 150, 0.35)");
      glowGrad.addColorStop(1, "rgba(20, 10, 30, 0.4)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Subtle Vignette to focus on subjects
      ctx.globalCompositeOperation = "multiply";
      const vignette = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.min(canvas.width, canvas.height) * 0.45,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.72
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(25, 15, 35, 0.45)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over";

      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

