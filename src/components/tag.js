import { Link } from 'gatsby'
import React from 'react'

const _ = require('lodash')

export default function Tag({ tags }){
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-3" style={{ color: '#001529' }}>Browse By Tag</h3>
      <div className="grid grid-cols-5 gap-2">
        {tags.map(tag => (
          <div className="p-1 bg-dark text-center" key={tag.tag}>
            <Link to={`/tags/${_.kebabCase(tag.tag)}`} className="text-xs text-white font-light">
              {tag.tag}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}