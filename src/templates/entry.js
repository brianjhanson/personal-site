import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Entry from "../components/Entry"
import { graphql } from "gatsby"

export default function Template({ data }) {
  const { markdownRemark: entry } = data

  return (
    <Layout>
      <div className="entry-container">
        <Helmet title={`${entry.frontmatter.title} | Brian Hanson`} />
        <Entry linkTitle={false} {...entry} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
