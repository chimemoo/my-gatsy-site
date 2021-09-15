import React from "react"
import Img from "gatsby-image"
import { graphql, Link, StaticQuery } from "gatsby"
import { Carousel } from 'react-responsive-carousel';

const Gram = () => {
  return (
    <div>
      <StaticQuery
        query={pageQuery}
        render={data => {
          const gram = data.gram.nodes
          return (
            <div>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#001529' }}>Latest Blog Gram</h3>
                <Link className="font-light" to="/blog">More →</Link>
              </div>
              <div className="grid grid-cols-1">
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
          )
        }}
      />
    </div>
  )
}

export default Gram

const pageQuery = graphql`
  query{
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