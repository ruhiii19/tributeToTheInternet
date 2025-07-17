import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";

// Rectangle color options (light shades)
const RECT_COLORS = [
  "#222",
  "#333",
  "#444",
  "#555",
  "#666",
  "#777",
  "#888",
  "#999",
];

type RectType = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
};

// Generate a random rectangle
function randomRect(width: number, height: number): RectType {
  const w = 60 + Math.random() * 60;
  const h = 30 + Math.random() * 40;
  return {
    x: Math.random() * (width - w),
    y: Math.random() * (height - h),
    width: w,
    height: h,
    fill: RECT_COLORS[Math.floor(Math.random() * RECT_COLORS.length)],
    id: Math.random().toString(36).substr(2, 9),
  };
}

function isOverlapping(rect: RectType, others: RectType[]): boolean {
  return others.some(
    (other) =>
      rect.x < other.x + other.width &&
      rect.x + rect.width > other.x &&
      rect.y < other.y + other.height &&
      rect.y + rect.height > other.y
  );
}

function generateNonOverlappingRects(
  count: number,
  width: number,
  height: number,
  maxTries = 100
): RectType[] {
  const rects: RectType[] = [];
  let tries = 0;
  while (rects.length < count && tries < count * maxTries) {
    const rect = randomRect(width, height);
    if (!isOverlapping(rect, rects)) {
      rects.push(rect);
    }
    tries++;
  }
  return rects;
}

const INITIAL_RECT_COUNT = 20;
const SQUARE_SIZE = 32; // px

const CookieBackground: React.FC = () => {
  const [rects, setRects] = useState<RectType[]>([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [highlighted, setHighlighted] = useState<{
    row: number;
    col: number;
  } | null>(null);

  // Calculate grid size based on viewport
  const gridCols = Math.ceil(dimensions.width / SQUARE_SIZE);
  const gridRows = Math.ceil(dimensions.height / SQUARE_SIZE);

  // Generate initial rectangles
  useEffect(() => {
    const initialRects = generateNonOverlappingRects(
      INITIAL_RECT_COUNT,
      window.innerWidth,
      window.innerHeight
    );
    setRects(initialRects);
    // Update on resize
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only update the highlighted grid square on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / SQUARE_SIZE);
    const row = Math.floor(y / SQUARE_SIZE);
    setHighlighted({ row, col });
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Konva random rectangles */}
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        style={{
          background: "#000",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <Layer>
          {rects.map((rect) => (
            <Rect
              key={rect.id}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill={rect.fill}
              opacity={0.18}
              shadowBlur={2}
            />
          ))}
        </Layer>
      </Stage>
      {/* Overlay grid */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none", // allow mouse events to pass through
        }}
      >
        {Array.from({ length: gridCols * gridRows }).map((_, i) => {
          const col = i % gridCols;
          const row = Math.floor(i / gridCols);
          const isHighlighted =
            highlighted && highlighted.row === row && highlighted.col === col;
          return (
            <rect
              key={i}
              x={col * SQUARE_SIZE}
              y={row * SQUARE_SIZE}
              width={SQUARE_SIZE}
              height={SQUARE_SIZE}
              fill={isHighlighted ? "#777" : "#222"}
              opacity={isHighlighted ? 0.7 : 0.18}
              rx={6}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default CookieBackground;
