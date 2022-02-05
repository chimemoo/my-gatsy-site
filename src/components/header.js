import { Link } from "gatsby";
import * as React from "react"
import Logo from "../images/profile.png";

const Header = ({ location }) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false)
  // console.log(isActive('blog'))
  const isActive = page => {
    /`${page}`/.test(location?.path)
  }

  return (
    <div>
      <div className="py-3 sm:px-0 px-5 my-0 flex flex-wrap justify-between bg-white fixed z-10 top-0 left-0 right-0 max-w-screen-md mx-auto">
        <div className="flex items-center">
          <img src={Logo} className="w-14 h-14" alt="logo" />
          <div className="ml-1">
            <Link to="/" className="text-xl">Christmemory</Link>
            <p className="text-sm font-extralight">Software Developer</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center">
          <Link to="/blog" className={isActive('blog') ? "font-bold text-sm": "font-light text-sm"}>BLOG</Link>
          <Link to="/notes" className="ml-8 font-light text-sm">NOTE</Link>
          <a href="https://github.com/chimemoo" className="ml-8 font-light text-sm">GITHUB</a>
          <a href="https://linkedin.com/in/christmemory" className="ml-8 font-light text-sm">LINKEDIN</a>
        </div>
        <button className="flex sm:hidden items-center" onClick={() => setIsMenuVisible(!isMenuVisible)}><span role="img" aria-label="menu">🙌</span> Menu</button>
        
      </div>
      {isMenuVisible && 
        <div 
          className="flex sm:hidden fixed flex items-center justify-center 
          flex-col bg-white w-100 top-0 right-0 bottom-0 left-0 z-30"
        >
          <Link to="/blog" className="font-light text-sm">BLOG</Link>
          <Link to="/notes" className="mt-8 font-light text-sm">NOTE</Link>
          <a href="https://github.com/chimemoo" className="mt-8 font-light text-sm">GITHUB</a>
          <a href="https://linkedin.com/in/christmemory" className="mt-8 font-light text-sm">LINKEDIN</a>
          <button className="mt-20 w-28" onClick={() => setIsMenuVisible(false)}><span role="img" aria-label="close">🙅</span> Close</button>
       </div>
      }
    </div>
  )
}

export default Header