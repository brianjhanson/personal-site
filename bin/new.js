#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const pwd = process.env.PWD
const dataPath = path.resolve(pwd, "./src/data")
const { _: title } = require("yargs").argv
const slugify = require("slugify")
const format = require("date-fns/format")

const now = new Date()
const slug = slugify(title[0])

const FRONTMATTER = `---
path: "/${slug}"
date: ${now.toISOString()}
title: "${title}"
status: "published"
---
`

const fileName = `${format(now, "yyyy-MM-dd")}-${slug}.md`
const fullPath = path.join(dataPath, fileName)

fs.writeFile(fullPath, FRONTMATTER, err => {
  if (err) {
    console.error("Failed to create file") // eslint-disable-line
    throw err;
  }

  console.log("Successfully created file:\n%s", fullPath) // eslint-disable-line
})

