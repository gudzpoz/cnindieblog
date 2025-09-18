import { parse } from 'csv-parse/sync'
import { assert } from 'node:console'
import { readFile } from 'node:fs/promises'
import { Converter } from 'opencc-js'

interface Entry {
  title: string,
  url: string,
  rss: string,
  tags: string[],
}

const TW2SC = Converter({ from: 'tw', to: 'cn' })
const HK2SC = Converter({ from: 'hk', to: 'cn' })
const NAME_MAPPING: Record<string, string> = {
  'Go': 'Golang',
  '读书': '读书笔记',
  '个人随笔': '随笔',
  'JS': 'JavaScript',
  'ACG': '二次元',
}
const CANON_NAMES = Object.fromEntries(Object.entries(NAME_MAPPING).map(
  ([_, v]) => ([v.toLowerCase(), v]),
))
const CANON = Object.fromEntries(Object.entries(NAME_MAPPING).map(
  ([k, v]) => [k.toLowerCase(), v.toLowerCase()],
))

function canonicalName(s: string, tag: string) {
  s = TW2SC(s)
  s = HK2SC(s)
  s = CANON_NAMES[tag] ?? s
  return s
}
function canonical(s: string) {
  s = s.toLowerCase()
    .replaceAll(/(?<=[ -~]) (?![ -~])/g, '')
    .replaceAll(/(?<![ -~]) (?=[ -~])/g, '')
    .replaceAll(/(?<![ -~]) (?![ -~])/g, '')
    .replaceAll(/ +/g, '-')
  s = CANON[s] ?? s
  s = TW2SC(s)
  s = HK2SC(s)
  return s
}

function buildTagIndices(entries: Entry[]) {
  const indices: Record<string, [string, string, number[]]> = {};
  entries.forEach(({ tags }, i) => tags.forEach((tag) => {
    const canon = canonical(tag)
    if (!indices[canon]) {
      indices[canon] = [canon, canonicalName(tag, canon), []]
    }
    const list = indices[canon][2]
    if (!list.includes(i)) {
      list.push(i)
    }
  }))
  return Object.values(indices)
    .filter((e) => e[2].length > 1)
    .sort((a, b) => b[2].length - a[2].length)
}

export default {
  watch: ['../listing/blogs-original.csv'],
  async load (watchedFiles: string[]) {
    assert(watchedFiles.length == 1)
    const file = watchedFiles[0]
    const content = await readFile(file, 'utf-8')
    assert(content.startsWith('Introduction, Address, RSS feed, tags\n'))
    const entries: Entry[] = parse(content, {
      fromLine: 2,
      trim: true,
    }).map(([title, url, rss, tags]) => ({
      title, url, rss, tags: tags.split(/[;；,，、]/).map((s) => s.trim()).filter((s) => !!s),
    }))
    return {
      entries,
      tags: buildTagIndices(entries),
    }
  }
}
