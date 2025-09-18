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
