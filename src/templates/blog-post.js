import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"

const _ = require('lodash')

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const tags = data.allMarkdownRemark.tag
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2">
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline" className="text-3xl font-medium leading-10 tracking-wide">{post.frontmatter.title}</h1>
              <p className="font-light text-sm tracking-widest">{post.frontmatter.date}</p>
            </header>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
              className="markdown-body font-light leading-7 mt-3"
              style={{ color: '#4B4747' }}
            />
            <hr className="my-5" />
          </article>
          <nav className="blog-post-nav mb-4">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev" className="mx-1">
                    ← {_.truncate(previous.frontmatter.title, 3)}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next" className="mx-1">
                    {_.truncate(next.frontmatter.title,3)} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Tag tags={tags} />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {fileAbsolutePath: {regex: "/content/blog/"}}
    ) {
      tag: group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
