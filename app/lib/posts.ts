import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const postsDirectory = path.join(process.cwd(), 'posts');

export function parsePostData(id: string) {
  const filePath = path.join(process.cwd(), 'posts', `${id}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  return matter(source);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.mdx$/, ''),
        },
      };
    });
}
