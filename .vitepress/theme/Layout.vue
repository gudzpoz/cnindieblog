<script setup lang="ts">
import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, page } = useData()

const links = [
  ['/', 'index.md', '介绍'],
  ['/#random', '', '随机'],
]
</script>

<template>
  <header>
    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <nav>
      <ul>
        <li v-for="v, i in links" :key="i">
          <a :href="v[0]" :class="{now: page.filePath === v[1]}">{{ v[2] }}</a>
        </li>
      </ul>
    </nav>
  </header>
  <Content as="main" />
  <footer><p>
    本站点由 <a href="https://kyo.iroiro.party/">Kana</a>
    基于<a href="https://github.com/timqian/chinese-independent-blogs">中文独立博客列表</a>
    使用 <a href="https://vitepress.dev/">VitePress</a> 构建。
  </p></footer>
</template>
