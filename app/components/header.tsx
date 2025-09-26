// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-[#121212] text-green relative shadow-lg border-b border-black-800">
      {/* Website Title */}
      <h1 className="text-2xl md:text-3xl font-black tracking-wider font-uncial drop-shadow-md text-[#DC143C]">
        A blog.
      </h1>
    </header>
  );
}
