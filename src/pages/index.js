import * as React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { Carousel } from 'react-responsive-carousel';

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"

import "react-responsive-carousel/lib/styles/carousel.min.css";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tags = data.allMarkdownRemark.tag
  const gram = data.gram.nodes
  console.log(gram);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#001529' }}>Latest Article</h3>
            <Link className="font-light" to="/blog">More →</Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug

              return (
                <div key={post.fields.slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header className="mb-1">
                      <h2>
                        <Link to={post.fields.slug} itemProp="url">
                          <span itemProp="headline" className="font-normal leading-4">{title}</span>
                        </Link>
                      </h2>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                        className="text-xs font-light tracking-wide leading-5"
                        style={{ color: '#020202' }}
                      />
                    </section>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-span-1">
          <Tag tags={tags} />
        </div>
      </div>
      

      <div className="mt-10">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-3" style={{ color: '#001529' }}>Latest Blog Gram</h3>
          <Link className="font-light" to="/blog">More →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:md-grid-cols-6 gap-1 md:gap-2 lg:gap-4">
          {
            gram.map((gramItem,i) => (
              <Carousel showArrows={true} key={i}>
                {gramItem.frontmatter.content.map(
                  (item, i) => (
                    <Img fluid={item.childImageSharp.fluid} key={i} className="max-w-32" />
                  )
                )}
              </Carousel>
            ))
          }
        </div>
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
