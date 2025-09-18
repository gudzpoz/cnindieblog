# 介绍

<script setup>
async function blogs() {
  const data = await import('./blogs.data.js')
  return data.data
}

async function randomBlog() {
  const { entries } = await blogs()
  const i = Math.floor(Math.random() * entries.length)
  window.open(entries[i].url, '_blank')
}
</script>

> ## 为什么要收集这张列表
>
> 不止一次听到有人说：“在中国, 独立博客的时代已经过去了”。
> 确实，很多博主都转到了公众号，知乎专栏，小密圈，微博……
> 这些平台读者比较多、他们的推荐算法可以让你的内容被更多人看到。
>
> 但我还是更喜欢独立博客，因为有属于自己的域名，因为可以自由地排版，自由地说话。
>
> 不得不承认，独立博客在如何获取新读者方面确实存在问题。
> “酒香也怕巷子深”，同样的内容放在自己的博客和上述的“自媒体平台”上，
> 哪怕有自己的主动宣传，读者的增长速度看起来也远不及自媒体平台上的增粉速度，对吧？
>
> 是否可以做一个工具，可以连接这些独立博主，
> 在保持独立博客的自由的同时，组织一个独立博客的创作和读者群体，
> 让独立博客们也有一个稳定的被发现的渠道。
> 这个工具可能是一个带个性化推荐系统的 RSS 客户端，
> 可能是一个类似微博、twitter 但是主要内容是独立博客的新东西，
> 读者可以点赞，评论。可以知道我们 follow 的博主 follow 了谁……
>
> 这个列表是一个开始，先把独立博客们收集起来。
> 欢迎加入 [Telegram 群]一起思考和讨论如何构建这样一个工具。

——<cite>[中文独立博客列表]</cite>

[中文独立博客列表]: https://github.com/timqian/chinese-independent-blogs
[Telegram 群]: https://t.me/indieBlogs

> ## 什么是IndieWeb?
>
> [IndieWeb] 是以人为本的、与“大公司商业网站”相对的网络形式。
>
> 我们是由独立的个人网站组成的社区，有着以下的基本原则：
> 有着自己域名的所有权、使用此域名作为身份标志、
> 优先在自己的站点上发布内容（也可同步到其他服务上）并掌控自己创作内容。
>
> - 你的创作内容将属于你，且由你掌控。
>
>   有太多的用户数据在公司停止运营的同时被丢失。
>   你在网上发布的内容应当属于你，而非某个企业。
>
> - 你更能与世界互联。
>
>   你的文章和状态更新可以被散布到任何服务上，而不用受到某一平台的限制。
>   这使你能够和所有人进行互动，而其他平台上的回复与点赞也可以回流到你的站点上。
>
> - 你能够控制一切。
>
>   你可以用任意格式发表你想发表的一切东西，不用受他人监控。
>   此外，你也可以用简短易读的永久链接分享内容，而不必担心链接失效。

——<cite>[什么是 IndieWeb？]</cite>

[IndieWeb]: https://indieweb.org/IndieWeb
[什么是 IndieWeb？]: https://indieweb.org/Main_Page-zh

本站点基于[中文独立博客列表]所收录的博客，定期从 RSS 链接抓取新内容，
希望能够帮助大家找到自己感兴趣的博客内容。
你可以 ↓ 手动点击随机发现，或是订阅本站点的 → [随机 RSS]。

[随机 RSS]: ./rss.md

## 👋 手气不错？ {#random}

<div class="random">
<button @click="randomBlog">
<span class="dice">🎲</span>
随机博客站点 🔗
</button>
<button @click="randomBlogPost">
<span class="dice">🎲</span>
随机博文 📝
</button>
</div>

<style>
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .dice {
    display: inline-block;
  }
  button:hover .dice {
    animation: rotating 1.5s ease infinite;
  }
  .random {
    display: flex;
    justify-content: center;
  }
</style>
