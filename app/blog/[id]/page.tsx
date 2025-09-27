import { getAllPostIds, parsePostData } from '@/app/lib/posts.ts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Title from '@/app/components/title.tsx';
import { Tex } from '@/app/lib/math.tsx';
import { notFound } from 'next/navigation';
import rehypeStarryNight from 'rehype-starry-night';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAddClasses from 'rehype-add-classes';

import '@/app/code_colors.css';

export default async function Page({
  params
}: {
  params: Promise<{id: string}>
}) {
  const { id } = await params;

  const matchingIds = getAllPostIds().find((element) => element.params.id === id);
  if (!matchingIds) {
    notFound();
  }

  const { content, data: frontmatter } = parsePostData(id);

  const title = frontmatter.title || id;
  return (<>
    <Title value={title} />
    <MDXRemote
      source={content}
      components={{Tex: Tex}}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeStarryNight,
            [rehypeAddClasses, { pre: "w-full bg-[#fffaf0] text-black p-2 rounded shadow-inner shadow-xl" }],
          ]  
        }
      }}
    />
  </>);
}

export function generateStaticParams() {
  return getAllPostIds();
}

export const dynamicParams = false;
