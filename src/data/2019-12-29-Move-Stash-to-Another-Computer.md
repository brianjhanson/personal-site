---
path: "/Move-Stash-to-Another-Computer"
date: 2019-12-29T22:13:35.848Z
title: "Move Stash to Another Computer"
status: "published"
---

I spend my development time split between two computers, my work laptop and my home desktop. Inevitably, I start some work on my laptop and want to resume it on my desktop or vice versa. In the past, a lot of times I would create a new branch or a new commit and prefix it with `[WIP]` but lately I’ve been curious if there was a cleaner way to do this.

Turns out there is! And it’s fairly simple.

On computer A, we stash all of our changes
```sh
# Stash all the changes (stash-all is an alias to stash untracked too)
$ git stash save --include-untracked
```

Then we create a patch files from the stashed changes
```sh
# Create patch file from stash
$ git stash show -p > patch
```

Finally, we move that `patch` file to the other computer and run
```sh
# Apply the patch changes back to our project
$ cd path/to/project
$ git apply path/to/patch
```

I still think creating a WIP branch is probably easier overall, but this way we don’t have to create anything to clean up later.

