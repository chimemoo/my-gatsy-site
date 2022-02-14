import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"

import "react-responsive-carousel/lib/styles/carousel.min.css";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tags = data.allMarkdownRemark.tag
  // const gram = data.gram.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {/* <Bio /> */}
      <div>
        <div className="md:col-span-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#001529' }}>Latest Article</h3>
            <Link className="font-light" to="/blog">More →</Link>
          </div>
          <ul className="grid gap-2">
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug

              return (
                <li className="bg-dark text-light p-4 rounded-xl" key={post.fields.slug}>
                  <Link to={post.fields.slug} itemProp="url" className="text-lg text-white flex justify-between">
                    <span>{title}</span>
                    <span className="text-light">→</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <Tag tags={tags} />
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fileAbsolutePath: {regex: "/content/blog/"}}
      ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
      tag:group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
    gram: allMarkdownRemark(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fileAbsolutePath: {regex: "/content/gram/"}}
      ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          content {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
