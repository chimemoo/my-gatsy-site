import * as React from "react"
import { Link } from "gatsby"
import Header from './header';
import Logo from "../images/profile.png";

const Layout = ({ location, title, children }) => {
  return (
    <div className="global-wrapper" >
      <Header location={location} />
      <main className="pt-24 sm:pt-28 px-6 sm:px-0 max-w-screen-md mx-auto">{children}</main>
      <footer className="py-20 max-w-screen-md mx-auto">
        <div className="flex justify-center">
          <div className="flex items-center">
            <img src={Logo} className="w-14 h-14" alt="logo" />
            <div className="ml-2">
              <Link to="/" className="text-xl">Christmemory</Link>
              <p className="text-sm font-extralight">Web Engineer</p>
            </div>
            
          </div>
        </div>
        <p className="text-center mt-2">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

// © {new Date().getFullYear()}, Built with
//         {` `}
//         <a href="https://www.gatsbyjs.com">Gatsby</a>
export default Layout
