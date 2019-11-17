import React from "react"
import { Link } from "gatsby"

const Entry = ({ id, linkTitle = true, frontmatter, html, ...rest }) => {
  return (
    <div className="entry-preview" key={id}>
      <time className="entry-date" dateTime={frontmatter.timestamp}>
        {frontmatter.date}
      </time>
      <h1 className="entry-title">
        {linkTitle ? (
          <Link to={frontmatter.path}>{frontmatter.title}</Link>
        ) : (
          frontmatter.title
        )}
      </h1>
      <div
        className="entry-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default Entry
