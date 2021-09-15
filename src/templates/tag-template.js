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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
        <SEO title="All Tags" />
          <h1 className="mb-2">{tagHeader}</h1>
          {edges.map(({ node }) => {
            const { slug } = node.fields
            const { title, date } = node.frontmatter
            return (
              <article
                className="blog-post mb-5"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <Link to={slug} itemProp="url">
                    <h1 itemProp="headline" className="text-3xl font-medium leading-10 tracking-wide">{title}</h1>
                  </Link>
                  <p className="font-light text-sm tracking-widest">{date}</p>
                </header>
                <section
                  dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  itemProp="articleBody"
                  className="font-light leading-7 mt-2 text-sm"
                  style={{ color: '#4B4747' }}
                />
              </article>
            )
          })}
        </div>
        <div>
          <Gram />
        </div>
      </div>
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