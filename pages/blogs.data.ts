import { parse } from 'csv-parse/sync'
import { assert } from 'node:console'
import { readFile } from 'node:fs/promises'

interface Entry {
  title: string,
  url: string,
  rss: string,
  tags: string[],
}

function canonical(s: string) {
  s = s.toLowerCase()
    .replaceAll(/(?<=[ -~]) (?![ -~])/g, '')
    .replaceAll(/(?<![ -~]) (?=[ -~])/g, '')
    .replaceAll(/(?<![ -~]) (?![ -~])/g, '')
    .replaceAll(/ +/g, '-')
  let hasAscii = false, hasNonAscii = false
  for (const c of s) {
    hasAscii ||= c.codePointAt(0)! < 0x80
    hasNonAscii ||= c.codePointAt(0)! >= 0x80
  }
  return s
}

function buildTagIndices(entries: Entry[]) {
  const indices: Record<string, number[]> = {};
  entries.forEach(({ tags }, i) => tags.forEach((tag) => {
    tag = canonical(tag)
    if (!indices[tag]) {
      indices[tag] = []
    }
    indices[tag].push(i)
  }))
  return Object.fromEntries(Object.entries(indices).filter((e) => e[1].length > 1))
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
