import PostList from '@/app/components/postList.tsx';
import { getAllPostIds, parsePostData } from '@/app/lib/posts.ts';
import Title from '@/app/components/title.tsx';
import { chalkFont } from '@/app/lib/tools.tsx';

export default function Home() {
  const postIds = getAllPostIds();
  const posts = postIds.map(id => {
    const { data: frontmatter } = parsePostData(id.params.id);

    return {
      id: id.params.id,
      frontmatter
    };
  });

  return (<>
    <Title value="Articles"/>
    <PostList posts={posts} />
  </>);
}
