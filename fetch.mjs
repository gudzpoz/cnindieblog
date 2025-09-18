import { readFile, writeFile } from 'node:fs/promises'

import { parse } from 'csv-parse/sync'
import Parser from 'rss-parser';

async function rssLinks() {
  const csv = 'listing/blogs-original.csv'
  const content = await readFile(csv, 'utf-8')
  return parse(content, { fromLine: 2, trim: true })
    .map((line) => line[2])
    .filter((url) => !!url)
}

/**
 * @param {string} url
 */
async function fetchRss(url) {
  const parser = new Parser()
  const {
    title,
    description,
    link,
    feedUrl,
    items,
  } = await parser.parseURL(url)
  return {
    title, description,
    link, feedUrl,
    items,
  }
}

/**
 * @param {string[]} links
 */
async function fetchAllRss(links) {
  let progress = 0
  const results = await Promise.allSettled(links.map((url) =>
    fetchRss(url).finally(() => {
      progress++
      if (progress % 10 === 0 || progress === links.length) {
        console.log(`progress: ${progress}/${links.length}`)
      }
    }),
  ))
  const feeds = Object.fromEntries(results.map((result, i) => {
    const error = result.status === 'fulfilled' ? null : `${result.reason}`
    const value = result.status === 'fulfilled' ? result.value : {}
    return [
      links[i],
      {
        history: result.status === 'fulfilled' ? 0 : 1,
        error, value,
      }
    ]
  }))
  return {
    updatedAt: Date.now(),
    feeds,
  }
}

/**
 * @returns {ReturnType<fetchAllRss>}
 */
async function fetchHistory() {
  // TODO
  return {
    updatedAt: 0,
    feeds: {},
  }
}

/**
 * @param {Awaited<ReturnType<fetchAllRss>>} history
 * @param {Awaited<ReturnType<fetchAllRss>>} update
 */
function mergeHistory(history, update) {
  Object.entries(update.feeds).forEach(([url, rss]) => {
    const last = history.feeds[url]
    const bits = last?.history
    if (bits) {
      rss.history |= (bits << 1) & 0xFFFF_FFFF
    }
    const value = last?.value
    if (value &&rss.error !== null) {
      rss.value = value
    }
  })
}

async function main() {
  const links = await rssLinks()
  const history = await fetchHistory()
  const update = await fetchAllRss(links)
  mergeHistory(history, update)
  await writeFile(
    'pages/public/feed.json',
    JSON.stringify(update),
    'utf-8',
  )
}

main().then(() => process.exit(0))
