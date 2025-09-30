"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  PointerEvent,
  MouseEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { X, Pin as PinIcon } from "lucide-react";

import { pinBoardFont } from "@/app/lib/tools.tsx";
import { categories } from "@/app/lib/constants.tsx";

type Position = {
  x: number;
  y: number;
};

type Rect = {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

/**
 * Pin component that renders a movable/draggable thumbtack. Clicking the pin sets the URLSearchParam ?category to the text prop. Holding ctrl allows one to drag the pin with the mouse.
 *
 * Props:
 * - text: string - Pin links to /?category={text}
 * - position: {x: number, y: number} - position of the pin.
 * - onMove: (dx, dy) => void - callback to update position.
 * - ref: Ref for parent component to access dimensions of the rendered div.
 */
function Pin({
  category,
  position,
  onMove,
  updatePinRect,
}: {
  category: string;
  position: Position;
  onMove: (dx: number, dy: number) => void;
  updatePinRect: (rect: Rect) => void;
}) {
  // Last coordinates indicate previous position while Pin is being dragged.
  const [lastCoordinates, setLastCoordinates] = useState<Position | null>(null);

  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pinRef.current) {
      updatePinRect(pinRef.current.getBoundingClientRect());
    }
  }, [pinRef.current]);

  function handlePointerDown(e: PointerEvent): void {
    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e: PointerEvent): void {
    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });

      // Computes where the Pin has to move to follow the pointer.
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;

      onMove(dx, dy);
    }
  }

  function handlePointerUp(e: PointerEvent): void {
    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();
    setLastCoordinates(null);
  }

  function onClick(e: MouseEvent) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }

  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const pinColor = currentCategory === category ? "bg-green-600" : "bg-red-600";
  const target = currentCategory === category ? "/" : `/?category=${category}`;

  return (
    <Link
      href={target}
      className="w-fit group block"
      onClick={onClick}
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(
        ${position.x}px,
        ${position.y}px
        )`,
      }}
    >
      <div
        ref={pinRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="flex flex-col w-fit items-center"
      >
        <div
          className={`w-6 h-6 ${pinColor} rounded-full border-2 border-gray-800`}
        ></div>

        <div className="w-0.5 h-3 bg-gray-800 "></div>
        <p className={pinBoardFont.className}>{category}</p>
      </div>
    </Link>
  );
}

/**
 * Sidebar component. Imitates a pinboard.
 * Spawns a pin per category of posts and randomly positions them on the sidebar.
 */
export default function Sidebar() {
  const containerRef = useRef<HTMLDivElement>(null);

  const pinRefs = categories.map((cat) => useRef<HTMLDivElement>(null));

  const [isActive, setIsActive] = useState(true);
  const [positions, setPositions] = useState<Position[]>([]);
  const [pinRects, setPinRects] = useState<Rect[]>(
    Array(categories.length).fill(null),
  );

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPositions(
        Array.from(
          categories.entries().map(([i, cat]) => {
            return {
              x: rect.width * (Math.random() * 0.7),
              y: rect.height * (Math.random() * 0.6 + 0.1),
            };
          }),
        ),
      );
    }
  }, []);

  const handleMove = useCallback(
    function handleMove(i: number, dx: number, dy: number) {
      if (!containerRef.current || pinRects[i] === null) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      // const pinRect = pinRefs[i].current.getBoundingClientRect();
      const pinRect = pinRects[i];

      const newX = Math.max(
        0,
        Math.min(positions[i].x + dx, containerRect.width - pinRect.width),
      );
      const newY = Math.max(
        0,
        Math.min(positions[i].y + dy, containerRect.height - pinRect.height),
      );

      setPositions([
        ...positions.slice(0, i),
        { x: newX, y: newY },
        ...positions.slice(i + 1),
      ]);
    },
    [positions, setPositions, pinRects],
  );

  function updatePinRect(i: number, rect: Rect) {
    setPinRects((rects) => [...rects.slice(0, i), rect, ...rects.slice(i + 1)]);
  }

  if (!isActive) {
    return (
      <button
        className="flex right-0 items-center justify-center rounded-bl cursor-pointer shadow shadow-l h-5 w-5 border-t-2 border-l-2 border-b-2 border-[#5A3A22] bg-[#70492A] active:bg-[#4E321D] transition"
        onClick={() => setIsActive(true)}
      >
        <PinIcon className="size-4 text-[#8B5E3C]" />
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-1/7 relative min-h-screen border-t-3 border-l-3 border-b-3 border-[#5A3A22] bg-[#8B5E3C]"
    >
      <button
        className="flex items-center justify-center absolute cursor-pointer border-r-2 border-b-2 border-[#5A3A22] shadow shadow-l h-5 w-5 bg-[#70492A] active:bg-[#4E321D 70492A] transition"
        onClick={() => setIsActive(false)}
      >
        <X className="size-4 text-[#8B5E3C] rotate-90" />
      </button>
      <div
        className={`absolute self-center text-3xl mt-2 ${pinBoardFont.className}`}
      >
        Categories
      </div>
      {Array.from(
        positions
          .entries()
          .map(([i, position]) => (
            <Pin
              key={i}
              category={categories[i]}
              position={position}
              onMove={(dx: number, dy: number) => handleMove(i, dx, dy)}
              updatePinRect={(rect: Rect) => updatePinRect(i, rect)}
            />
          )),
      )}
    </div>
  );
}
