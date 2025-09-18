<script setup lang="ts">
import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, page } = useData()

const links = [
  ['/', 'index.md', '介绍'],
  ['/#random', '', '随机'],
  ['/sites', 'sites.md', '站点列表'],
  ['/tags', 'tags.md', '类别'],
  ['https://github.com/timqian/chinese-independent-blogs/tree/master?tab=readme-ov-file#%E5%A6%82%E4%BD%95%E6%8F%90%E4%BA%A4',
   '', '提交站点', '_blank'],
]
</script>

<template>
  <header>
    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <nav>
      <ul>
        <li v-for="v, i in links" :key="i">
          <a v-if="v[3]" :href="v[0]" :target="v[3]">{{ v[2] }}</a>
          <a v-else :href="v[0]" :class="{now: page.filePath === v[1]}">{{ v[2] }}</a>
        </li>
      </ul>
    </nav>
  </header>
  <Content as="main" />
  <footer>
  <p>
    本站点由 <a href="https://kyo.iroiro.party/">Kana</a>
    受 <a href="https://indieblog.page">indieblog.page</a> 启发，
    基于<a href="https://github.com/timqian/chinese-independent-blogs">中文独立博客列表</a>
    使用 <a href="https://vitepress.dev/">VitePress</a> 构建。
  </p>
  <p>
    其它链接：
    <a href="https://indieweb.org/Main_Page-zh">什么是 IndieWeb？</a>
  </p>
  </footer>
</template>
