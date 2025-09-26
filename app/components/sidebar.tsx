"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';

import { pinBoardFont } from '@/app/lib/tools.tsx';

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

  return (
    <Link
      href="/blog/riemann_roch"
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
        <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-gray-800"></div>
        
        <div className="w-0.5 h-3 bg-gray-800 "></div>
        <p className={pinBoardFont.className}>{text}</p>
      </div>
    </Link>
  );
}

export default function Sidebar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  function handleMove(dx, dy) {
    if (!containerRef.current || !pinRef.current) return;


    const containerRect = containerRef.current.getBoundingClientRect();
    const pinRect = pinRef.current.getBoundingClientRect();

    const offsetX = pinRect.left - containerRect.left;
    const offsetY = pinRect.top - containerRect.top;

    const newX = Math.max(-offsetX, Math.min(position.x + dx, containerRect.width - pinRect.width));
    const newY = Math.max(-offsetY, Math.min(position.y + dy, containerRect.height - pinRect.height));

    setPosition({
      x: newX,
      y: newY,
    });
  }

  return (
          <div ref={containerRef} className="flex flex-col w-1/7 min-h-screen border-t-3 border-l-3 border-b-3 border-[#5A3A22] bg-[#8B5E3C]">
            <div className={`absolute self-center text-2xl mt-2 ${pinBoardFont.className}`}>Categories</div>
            <Pin text="Math" position={position} onMove={handleMove} linkEnabled={false} ref={pinRef}/>
          </div>
  );
}
