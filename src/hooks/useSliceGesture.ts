"use client";

import { useState, useRef, useCallback } from "react";

interface Point {
  x: number;
  y: number;
}

interface UseSliceGestureProps {
  onSliceComplete: () => void;
  minDistance?: number;
  enabled?: boolean;
}

export function useSliceGesture({
  onSliceComplete,
  minDistance = 140,
  enabled = true,
}: UseSliceGestureProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [trail, setTrail] = useState<Point[]>([]);
  const startPointRef = useRef<Point | null>(null);
  const hasCompletedRef = useRef<boolean>(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || hasCompletedRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pt: Point = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      startPointRef.current = pt;
      setTrail([pt]);
      setIsDragging(true);
    },
    [enabled]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !startPointRef.current || hasCompletedRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const currentPt: Point = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      setTrail((prev) => [...prev.slice(-15), currentPt]);

      // Calculate euclidean distance from start
      const dx = currentPt.x - startPointRef.current.x;
      const dy = currentPt.y - startPointRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance >= minDistance) {
        hasCompletedRef.current = true;
        setIsDragging(false);
        setTrail([]);
        onSliceComplete();
      }
    },
    [isDragging, minDistance, onSliceComplete]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setTrail([]);
    startPointRef.current = null;
  }, []);

  return {
    isDragging,
    trail,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
    },
  };
}
