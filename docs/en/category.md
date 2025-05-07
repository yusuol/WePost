---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="[category, postGroup] in sortedCategoryGroups" :key="category">
  <h2 :id="category" class="post-title">
    <a
      class="header-anchor"
      :href="`#${category}`"
      :aria-label="`Permalink to &quot;${category}&quot;`"
    >​</a>
    <div class="post-year hollow-text source-han-serif">{{ category }}</div>
  </h2>
  <div class="post-container" v-for="post in postGroup" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
    <span class="post-date">
      {{ post.date.monthDay }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { data as posts } from "../.vitepress/theme/posts-en.data.mts";

// 格式化时间为 MM/DD/YYYY 格式
function formatDate(raw: string) {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    year: date.toLocaleDateString('en-US', {
      year: 'numeric',
    }),
    monthDay: date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    })
  };
}

// 按时间倒序排序并生成分类
const sortedCategoryGroups = computed(() => {
  const groups = new Map<string, typeof posts>();

  posts.forEach((post) => {
    const category = post.category || "Uncategorized";
    const formattedDate = formatDate(post.date);
    post.date = formattedDate;

    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)?.push(post);
  });

  // 对每个分类内的文章按时间倒序排列
  const sortedEntries = Array.from(groups.entries()).map(([category, group]) => {
    group.sort((a, b) => b.date.time - a.date.time); // 按时间排序
    return [category, group];
  });

  // 按每个分类的最新文章排序
  sortedEntries.sort((a, b) => b[1][0].date.time - a[1][0].date.time);

  return Object.fromEntries(sortedEntries);
});
</script>

<style lang="scss" scoped>
.mr-2 {
  margin-right: 2px;
}

.post-title {
  margin-bottom: 6px;
  border-top: 0px;
  position: relative;
  top: 0;
  left: 0;

  .post-year {
    position: absolute;
    top: -6px;
    left: -10px;
    z-index: -1;
    opacity: .16;
    font-size: 86px;
    font-weight: 900;
  }
}

.post-container {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;

  > a {
    font-weight: 400;
  }

  .post-date {
    opacity: .6;
  }
}

.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>
