import { Link } from 'gatsby'
import React from 'react'

const _ = require('lodash')

export default function Tag({ tags }){
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-3" style={{ color: '#001529' }}>Browse By Tag</h3>
      <div className="grid sm:grid-cols-5 grid-cols-3 gap-2">
        {tags.map(tag => (
          <Link to={`/tags/${_.kebabCase(tag.tag)}`} className="text-sm text-dark font-light p-2 bg-gray-200 text-center rounded-xl" key={tag.tag}>
            {tag.tag}
          </Link>
        ))}
      </div>
    </div>
  )
}