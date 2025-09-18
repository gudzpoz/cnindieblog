# 博客站点列表

<script setup>
import { computed, ref } from 'vue'

import { data } from './blogs.data.js'

const { entries } = data
const siteFilter = ref('')
const tagFilter = ref('')
const filtered = computed(() => {
  let sites = entries
  if (!!siteFilter.value.trim()) {
    let filter = siteFilter.value.toLowerCase().split(' ')
    sites = entries.filter(
      (e) => filter.every((word) => e.title.toLowerCase().includes(word)),
    )
  }
  if (!!tagFilter.value.trim()) {
    let filter = tagFilter.value.toLowerCase().split(' ')
    sites = sites.filter(
      (e) => filter.every((word) => e.tags.some((tag) => tag.toLowerCase().includes(word))),
    )
  }
  return sites
})
</script>

所有收录的中文博客的列表。
若您开启了 JavaScript，可以在输入框中输入关键词对站点名称、关键词等进行过滤。
（可用空格分隔多个限定词语。）

<table>
  <thead>
    <tr>
      <th>RSS</th>
      <th>
        站点
        <input type="text" placeholder="搜索站点标题" v-model="siteFilter" />
      </th>
      <th>
        关键词
        <input type="text" placeholder="搜寻关键词" v-model="tagFilter" />
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="site in filtered" :key="site.url">
    <td><a v-if="site.rss" :href="site.rss">📢</a></td>
    <td>
      <a :href="site.url" target="_blank">{{ site.title }}</a>
    </td>
    <td>
      <span v-for="tag in site.tags">{{ tag }}</span>
    </td>
    </tr>
  </tbody>
</table>

<style>
  table {
    width: 100%;
  }
  th input {
    display: block;
    margin: auto;
  }
  td:first-child {
    text-align: center;
  }
  td:last-child span {
    display: inline-block;
    background-color: var(--sec);
    margin: 0.1em 0.5em;
    padding: 0.1em 0.5em;
    border-radius: 3px;
    font-size: 0.8em;
  }
</style>
