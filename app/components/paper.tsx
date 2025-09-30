import { Octagon } from 'lucide-react';

export default function Paper({children}) {
  return (
    <div className="relative bg-[#fffaf0] w-full bg-[#fffaf0] text-black p-5 rounded shadow-inner shadow-xl">
      <Octagon className="absolute top-1 left-1 size-4 text-[#383838] fill-[#383838]"/>

      <Octagon className="absolute top-1 right-1 size-4 text-[#383838] fill-[#383838]"/>

      <Octagon className="absolute bottom-1 left-1 size-4 text-[#383838] fill-[#383838]"/>

      <Octagon className="absolute bottom-1 right-1 size-4 text-[#383838] fill-[#383838]"/>

      <div className="">
        {children}
      </div>
    </div>
  );
}
