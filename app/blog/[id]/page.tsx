import { getAllPostIds, parsePostData } from '@/app/lib/posts.ts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Title from '@/app/components/title.tsx';
import { Tex } from '@/app/lib/math.tsx';
import { notFound } from 'next/navigation';

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
    <MDXRemote source={content} components={{Tex: Tex}}/>
  </>);
}

export function generateStaticParams() {
  return getAllPostIds();
}

export const dynamicParams = false;
