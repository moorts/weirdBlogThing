"use client";

import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { pinBoardFont } from '@/app/lib/tools.tsx';
import { categories } from '@/app/lib/constants.tsx';

function Pin({text, position, onMove, linkEnabled, ref}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    if (linkEnabled) {
      return;
    }

    e.preventDefault();
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (linkEnabled) {
      return;
    }

    e.preventDefault();
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });

      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;

      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    if (linkEnabled) {
      return;
    }

    e.preventDefault();
    setLastCoordinates(null);
  }

  function onClick(e) {
    if (linkEnabled) {
      return;
    }
  }

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const pinColor = (category === text) ? "bg-green-600" : "bg-red-600";
  const target = (category === text) ? "/" : `/?category=${text}`;

  return (
    <Link
      href={target}
      className="w-fit group block"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={linkEnabled ? null : (e) => e.preventDefault()}
      style={{
        // width: 100,
        // height: 100,
        cursor: linkEnabled ? 'pointer' : 'grab',
        position: 'absolute',
        // border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
        ${position.x}px,
        ${position.y}px
        )`,
      }}
    >
      <div
        ref={ref}
        className="flex flex-col w-fit items-center"
      >
        <div className={`w-6 h-6 ${pinColor} rounded-full border-2 border-gray-800`}></div>
        
        <div className="w-0.5 h-3 bg-gray-800 "></div>
        <p className={pinBoardFont.className}>{text}</p>
      </div>
    </Link>
  );
}

type Position = {
  x: number,
  y: number,
}

export default function Sidebar() {
  const containerRef = useRef<HTMLDivElement>(null);

  const pinRefs = categories.map(cat => useRef<HTMLDivElement>(null));

  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPositions(Array.from(categories
                              .entries()
                              .map(([i, cat]) => {
                                return { x: rect.width * (Math.random() * 0.7), y: rect.height * (Math.random() * 0.6 + 0.1) };
                              })));
    }
  }, []);


  function handleMove(i, dx, dy) {
    if (!containerRef.current || !pinRefs[i].current) return;


    const containerRect = containerRef.current.getBoundingClientRect();
    const pinRect = pinRefs[i].current.getBoundingClientRect();

    const offsetX = pinRect.left - containerRect.left;
    const offsetY = pinRect.top - containerRect.top;

    const newX = Math.max(-offsetX, Math.min(positions[i].x + dx, containerRect.width - pinRect.width));
    const newY = Math.max(-offsetY, Math.min(positions[i].y + dy, containerRect.height - pinRect.height));

    setPositions([...positions.slice(0, i), {x: newX, y: newY}, ...positions.slice(i+1)]);
  }

  return (
          <div ref={containerRef} className="flex flex-col w-1/7 min-h-screen border-t-3 border-l-3 border-b-3 border-[#5A3A22] bg-[#8B5E3C]">
            <div className={`absolute self-center text-2xl mt-2 ${pinBoardFont.className}`}>Categories</div>
            {Array.from(positions.entries().map(([i, position]) => 
              <Pin key={i} text={categories[i]} position={position} onMove={(dx: number, dy: number) => handleMove(i, dx, dy)} linkEnabled={false} ref={pinRefs[i]}/>
            ))}
          </div>
  );
}
