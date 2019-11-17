---
path: "/new-entry-script"
date: 2019-11-17T17:39:48.755Z
title: "New Entry Script"
status: "published"
---

To kick things off, I wanted to keep things really simple. Just me, Gatsby and some markdown files. This was great for lowering the barrier to launch, but it's not so great for lowering the barrier to posting a new entry quickly and easily. Even after a post or two my developer brain went off when copying frontmatter between posts in a consistent manner.

I decided to create a simple node script that would help me create frontmatter consistently everything. My goals is to run something like `./bin/new Post Name` and have the script create a new markdown file with the frontmatter already populated. Thankfully I don't have much frontmatter yet (just path, date, title and status) so I can keep things relatively simple.

Here's the script I ended up with:

```node
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
```

Next, I added my script to my package.json file, so I can run `npm run script -- "Post Title"` in order to generate a new file that will have today's date prepended to the slug and will have all my frontmatter filled out accordingly. I have it set to create a published entry by default for now, but I might add an option, or update that default if I don't like it. 



