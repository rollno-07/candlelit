/**
 * Client-side Image Optimizer & Compressor
 * Compresses camera and gallery images (from 5MB-20MB down to ~120KB)
 * to ensure lightning-fast uploads and eliminate storage quota limits.
 */

export async function compressImageFile(
  fileOrBase64: File | string,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  if (typeof window === "undefined") {
    if (typeof fileOrBase64 === "string") return fileOrBase64;
    return "";
  }

  return new Promise((resolve) => {
    // 1. Convert File to Data URL if needed
    const processDataUrl = (dataUrl: string) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // If image is already smaller than target, still re-encode as clean JPEG to strip heavy metadata
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Export compressed JPEG
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };

      img.onerror = () => {
        resolve(dataUrl);
      };

      img.src = dataUrl;
    };

    if (typeof fileOrBase64 === "string") {
      processDataUrl(fileOrBase64);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        processDataUrl(result);
      };
      reader.onerror = () => {
        resolve("");
      };
      reader.readAsDataURL(fileOrBase64);
    }
  });
}

