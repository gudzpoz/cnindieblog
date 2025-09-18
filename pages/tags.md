# 类别与关键词

<script setup>
import { data } from './blogs.data.js'

const { entries, tags } = data
</script>

这里是对各站点提交时自行填写的关键词列表的一个汇总。
（我会手动合并部分关键词，例如 Go 和 Golang。若你发现更多的同义项也欢迎提出！）

<details>
<summary>所有关键词列表</summary>
<ul class="tags">
<li v-for="tag in tags" :key="tag[0]">
<a :href="`#${tag[0]}`">{{ tag[1] }} ({{ tag[2].length }})</a>
</li>
</ul>
</details>

<div class="masonry">
<section v-for="tag, i in tags" :key="i">
<h2 :id="tag[0]">{{ tag[1] }}</h2>
<ul>
  <li v-for="j in tag[2]" :key="j">
    <a :href="entries[j].url" target="_blank">{{ entries[j].title }}</a>
    <span class="rss" v-if="entries[j].rss">(
      <a :href="entries[j].rss" target="_blank">📢</a>
    )</span>
  </li>
</ul>
</section>
</div>

<style>
  .tags {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    font-size: smaller;
  }
  .tags li {
    list-style: none;
    margin: 0.1em 0.5em;
  }
  .masonry {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
    grid-template-rows: masonry;
    margin: 2em 0;
  }
  section {
    background-color: var(--tint);
    border-radius: 1em;
    box-shadow: 3px 0 15px var(--sec);
  }
  h2 {
    margin-left: 1em;
  }
  section ul {
    max-height: 16em;
    overflow-y: auto;
  }
  span.rss {
    font-size: small;
  }
</style>
