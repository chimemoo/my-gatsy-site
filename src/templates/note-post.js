import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NoteTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-12 mx-1">
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline" className="text-3xl font-semibold leading-10 tracking-wide">{post.frontmatter.title}</h1>
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
                  <Link to={'/note'+previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={'/note'+next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Layout>
  )
}

export default NoteTemplate

export const pageQuery = graphql`
  query NotePostBySlug(
    $id: String!
    $previousNoteId: String
    $nextNoteId: String
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
    previous: markdownRemark(id: { eq: $previousNoteId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextNoteId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
