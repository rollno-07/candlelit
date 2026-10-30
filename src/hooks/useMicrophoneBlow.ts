"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseMicrophoneBlowProps {
  onBlowDetected: () => void;
  threshold?: number; // 0 to 1
  enabled?: boolean;
}

export function useMicrophoneBlow({
  onBlowDetected,
  threshold = 0.18,
  enabled = true,
}: UseMicrophoneBlowProps) {
  const [isListening, setIsListening] = useState(false);
  const [micPermissionState, setMicPermissionState] = useState<"idle" | "granted" | "denied" | "unsupported">("idle");
  const [volume, setVolume] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const blowCountRef = useRef<number>(0);
  const hasTriggeredRef = useRef<boolean>(false);

  const stopListening = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(async () => {
    if (hasTriggeredRef.current) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicPermissionState("unsupported");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      micStreamRef.current = stream;
      setMicPermissionState("granted");

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkBlow = () => {
        if (!analyserRef.current || hasTriggeredRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average amplitude
        let sum = 0;
        // Blowing into mic creates broad low-mid frequency turbulence (bins 5 to 50)
        const relevantBins = Math.min(60, bufferLength);
        for (let i = 2; i < relevantBins; i++) {
          sum += dataArray[i];
        }
        const avg = sum / (relevantBins - 2) / 255;
        setVolume(avg);

        // Check if blow exceeds threshold
        if (avg > threshold) {
          blowCountRef.current += 1;
          // Must sustain for at least 3 consecutive frames to prevent momentary noise spikes
          if (blowCountRef.current >= 3) {
            hasTriggeredRef.current = true;
            onBlowDetected();
            stopListening();
            return;
          }
        } else {
          blowCountRef.current = Math.max(0, blowCountRef.current - 1);
        }

        animFrameRef.current = requestAnimationFrame(checkBlow);
      };

      checkBlow();
    } catch {
      setMicPermissionState("denied");
      setIsListening(false);
    }
  }, [onBlowDetected, stopListening, threshold]);

  useEffect(() => {
    if (!enabled) {
      stopListening();
    }
    return () => {
      stopListening();
    };
  }, [enabled, stopListening]);

  return {
    isListening,
    micPermissionState,
    volume,
    startListening,
    stopListening,
  };
}
