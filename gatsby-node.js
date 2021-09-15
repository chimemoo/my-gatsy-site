const path = require(`path`)
const _ = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve(`./src/templates/tag-template.js`)
  const blogListTemplate = path.resolve(`./src/templates/blog-list-template.js`)
  const noteListTemplate = path.resolve(`./src/templates/note-list-template.js`)
  const notePost = path.resolve(`./src/templates/note-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
          filter: {fileAbsolutePath: {regex: "/content/blog/"}}
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        gram:allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
          filter: {fileAbsolutePath: {regex: "/content/gram/"}}
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        note: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
          filter: {fileAbsolutePath: {regex: "/content/note/"}}
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes
  const notes = result.data.note.nodes
  const blogPosts = result.data.allMarkdownRemark.edges
  const notePosts = result.data.note.edges
  const tags = result.data.tagsGroup.group

  // Create blog posts pages
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Create tag detail pages
  if (tags.length > 0) {
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })
  }

  // Create blog list pages
  if (blogPosts.length > 0) {
    const postsPerPage = 4
    const numPages = Math.ceil(blogPosts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: blogListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  }

  // Create notes page
  if (notes.length > 0) {
    notes.forEach((note, index) => {
      const previousNoteId = index === 0 ? null : notes[index - 1].id
      const nextNoteId = index === notes.length - 1 ? null : notes[index + 1].id

      createPage({
        path: `/note${note.fields.slug}`,
        component: notePost,
        context: {
          id: note.id,
          previousNoteId,
          nextNoteId,
        },
      })
    })
  }

  // Create blog list pages
  if (notePosts.length > 0) {
    const postsPerPage = 10
    const numPages = Math.ceil(notePosts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/notes` : `/notes/${i + 1}`,
        component: noteListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
