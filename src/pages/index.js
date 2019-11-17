import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Entry from "../components/Entry"

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO title="Home" />
      <div className="entry-list">
        {posts
          .filter(entry => entry.node.frontmatter.title.length > 0)
          .map(({ node: entry }) => {
            return (
              <Entry {...entry} />
            )
          })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostListing {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { status: { ne: "draft" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            path
            title
            timestamp:date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default IndexPage
