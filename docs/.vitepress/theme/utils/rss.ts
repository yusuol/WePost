import path from "node:path";
import { writeFileSync } from "node:fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const hostname = "https://yusuol.com";

export async function createRssFileZH(config: SiteConfig) {
  const feed = new Feed({
    title: 'Yusuol',
    description: '科技让生活更美好？',
    id: hostname,
    link: hostname,
    language: "zh-Hans",
    image: "https://techdaily.oss-cn-shanghai.aliyuncs.com/Yusuol/Yusuol.png",
    favicon: `https://techdaily.oss-cn-shanghai.aliyuncs.com/Yusuol/Yusuol.ico`,
    copyright: "Copyright© 2025-present Yusuol",
  });

  const posts = await createContentLoader("posts/**/*.md", {
    excerpt: true,
    render: true,
  }).load();

  posts.sort((a, b) => Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)));

  for (const { url, excerpt, html, frontmatter } of posts) {
    // 仅保留最近 5 篇文章
    if (feed.items.length >= 5) {
      break;
    }

    feed.addItem({
      title: frontmatter.title,
      id: `${hostname}${url}`,
      link: `${hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: "Yusuol",
          link: "https://Yusuol.com",
        },
      ],
      date: frontmatter.date,
    });
  }

  writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
}

export async function createRssFileEN(config: SiteConfig) {
  const feed = new Feed({
    title: "Yusuol",
    description: "A T-shaped front-end developer who is committed to deepening expertise in the technical field, focuses on independent development, enjoys working with Vue.js and Nest.js, and has some knowledge of Python, search engines, NLP, Web3, and back-end development.",
    id: hostname,
    link: hostname,
    language: "en-US",
    image: "https://techdaily.oss-cn-shanghai.aliyuncs.com/Yusuol/Yusuol.png",
    favicon: `https://techdaily.oss-cn-shanghai.aliyuncs.com/Yusuol/Yusuol.ico`,
    copyright: "Copyright© 2025-present Yusuol",
  });

  const posts = await createContentLoader("en/posts/**/*.md", {
    excerpt: true,
    render: true,
  }).load();

  posts.sort((a, b) => Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)));

  for (const { url, excerpt, html, frontmatter } of posts) {
    // 仅保留最近 5 篇文章
    if (feed.items.length >= 5) {
      break;
    }

    feed.addItem({
      title: frontmatter.title,
      id: `${hostname}${url}`,
      link: `${hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: "Yusuol",
          link: "https://Yusuol.com",
        },
      ],
      date: frontmatter.date,
    });
  }

  writeFileSync(path.join(config.outDir, "feed-en.xml"), feed.rss2(), "utf-8");
}
