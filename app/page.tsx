import Link from 'next/link';
import { Star, Pentagon } from 'lucide-react';

import { postsDirectory, getAllPostIds, parsePostData } from './lib/posts.ts';
import path from 'path';
import { chalkFont } from './lib/tools.tsx';



function PostPreview({postId}) {
  const { data: frontmatter } = parsePostData(postId);
  const title = frontmatter["title"] ? frontmatter.title : postId;
  return (
    // <div className="w-full mx-auto p-8 bg-gradient-to-b from-yellow-100 via-yellow-50 to-yellow-100 rounded-xl shadow-lg border border-yellow-200 [box-shadow:inset_0_1px_3px_rgba(0,0,0,0.15)]">
    // <div className="w-full mx-auto p-8 rounded-sm shadow-lg border-4 border-dashed border-white/60 border-[#F5F5F5]/70 shadow-[0_0_6px_rgba(255,255,255,0.4)] ">
    <Link href={"/blog/" + postId} className={`text-2xl font-bold tracking-tight hover:underline hover:decoration-3 ${chalkFont.className}`}>{title}</Link>
    // </div>
  );
}

function Posts() {
  const postIds = getAllPostIds();

  return (
    <ul className="list-none space-y-2">
      {postIds.map(obj => {
        const id = obj.params.id;
        return (
          <li key={id} className="flex items-center gap-2">
            <Pentagon className="w-4 h-4 text-[#F5F5F5]" />
            <PostPreview key={id} postId={id}/>
          </li>
        );
      })}
    </ul>
  );
}

export default function Home() {

  return (
    Posts()
  );
}
