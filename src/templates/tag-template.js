import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Gram from "../components/gram"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <Layout>
      <SEO title="All Tags" />
      <h1 className="mb-2">{tagHeader}</h1>
      {edges.map(({ node }) => {
        const { slug } = node.fields
        const { title, date } = node.frontmatter
        return (
          <article
            className="blog-post mb-5 bg-dark p-5 text-white rounded-xl"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <Link to={slug} itemProp="url">
                <h1 itemProp="headline" className="text-3xl font-medium">{title}</h1>
              </Link>
              <p className="font-light text-sm tracking-widest">{date}</p>
            </header>
            <section
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
              itemProp="articleBody"
              className="font-light mt-2 text-sm text-gray-400"
            />
          </article>
        )
      })}
    </Layout>
  )
}

export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { 
        frontmatter: { tags: { in: [$tag] } } 
        fileAbsolutePath: {regex: "/content/blog/"}
      }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 300)
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`