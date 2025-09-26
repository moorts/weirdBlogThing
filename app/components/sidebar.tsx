"use client";

import { useState } from 'react';

import Link from 'next/link';

function Pin({text, position, onMove, linkEnabled}) {
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
        className="flex flex-col group-hover:bg-blue-700 w-fit items-center"
      >
        <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-gray-800"></div>
        
        <div className="w-0.5 h-3 bg-gray-800 "></div>
        <p className="group-hover:bg-blue-700">{text}</p>
      </div>
    </Link>
  );
}

export default function Sidebar() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  function handleMove(dx, dy) {
    setPosition({
      x: position.x + dx,
      y: position.y + dy,
    });
  }

  return (
          <div className="w-1/7 min-h-screen border-t-3 border-l-3 border-b-3 border-[#5A3A22] bg-[#8B5E3C] p-4">
            Sidebar
            <Pin text="test" position={position} onMove={handleMove} linkEnabled={true}/>
          </div>
  );
}
