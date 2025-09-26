"use client";

import Link from 'next/link';
import { Star, Pentagon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { chalkFont } from '@/app/lib/tools.tsx';


function PostPreview({postId, frontmatter}) {
  const title = frontmatter["title"] ? frontmatter.title : postId;
  return (
    // <div className="w-full mx-auto p-8 bg-gradient-to-b from-yellow-100 via-yellow-50 to-yellow-100 rounded-xl shadow-lg border border-yellow-200 [box-shadow:inset_0_1px_3px_rgba(0,0,0,0.15)]">
    // <div className="w-full mx-auto p-8 rounded-sm shadow-lg border-4 border-dashed border-white/60 border-[#F5F5F5]/70 shadow-[0_0_6px_rgba(255,255,255,0.4)] ">
    <Link href={"/blog/" + postId} className={`text-2xl font-bold tracking-tight hover:underline hover:decoration-3 ${chalkFont.className}`}>{title}</Link>
    // </div>
  );
}

type PostData = {
  id: string,
  frontmatter: object,
}
interface PostListProps {
  posts: PostData[],
}

export default function PostList({posts}: PostListProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <ul className="list-none space-y-2">
      {posts.filter(({id, frontmatter }) => {
        if (!category) {
          return true;
        }
        if("categories" in frontmatter) {
          // TODO: maybe make this less error-prone.
          return frontmatter.categories.includes(category);
        }

        return true;
      }).map(({ id, frontmatter }) => {
        return (
          <li key={id} className="flex items-center gap-2">
            <Pentagon className="w-4 h-4 text-[#F5F5F5]" />
            <PostPreview key={id} postId={id} frontmatter={frontmatter}/>
          </li>
        );
      })}
    </ul>
  );
}
