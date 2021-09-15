import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Gram from "../components/gram"
import SEO from "../components/seo"

const BlogListTempate = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/blog" : `/blog/${(currentPage - 1).toString()}`
  const nextPage = (currentPage + 1).toString()
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
       <SEO title="Blog Post" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div>
            {posts.map(post => (
              <article
                className="blog-post mb-5"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <Link to={post.node.fields.slug} itemProp="url">
                    <h1 itemProp="headline" className="text-lg md:text-3xl font-medium leading-6 md:leading-10 tracking-wide">{post.node.frontmatter.title}</h1>
                  </Link>
                  <p className="font-light text-sm tracking-widest">{post.node.frontmatter.date}</p>
                </header>
                <section
                  dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
                  itemProp="articleBody"
                  className="font-light leading-7 mt-2 text-sm"
                  style={{ color: '#4B4747' }}
                />
              </article>
            ))}
          </div>
          <div className="my-8 flex justify-between">
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
            {!isLast && (
              <Link to={"/blog/" + nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </div>
        </div>
        <div>
          <Gram />
        </div>
      </div>
    </Layout>
  )
}

export default BlogListTempate
export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {fileAbsolutePath: {regex: "/content/blog/"}}
    ) {
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
    tags:allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {fileAbsolutePath: {regex: "/content/blog/"}}
    ) {
      tag: group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;