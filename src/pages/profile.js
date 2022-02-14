import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ProfilePage = ({ location }) => {
  const siteTitle = "CV & Portofolio";
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <h1 className="text-center font-bold text-xl">CV</h1>
      <div className="border-2 border-gray-200">
        <iframe
          className="w-full h-screen"
          title="CV"
          src="https://docs.google.com/document/d/e/2PACX-1vRZ0KNZTdLuaWsbRmjxiOUnxVFPaQ1HX1z307etYmd7yuT8WD2-WZZmMy-MUiel3xvXfMjFHO2gyN0Y/pub?embedded=true">
        </iframe>
      </div>
      <h1 className="text-center font-bold text-xl mt-10">Portofolio</h1>
      <div className="border-2 border-gray-200">
        <iframe
          className="w-full h-screen"
          title="Portfolio"
          src="https://docs.google.com/document/d/e/2PACX-1vRbgAr1HDDiTxO6WBN-B0M3-yfrUGfQXkerjc-lB3OxwuWJApvyfrKLg7ZQpNga4zEWucAJNOTIiIwb/pub?embedded=true">  
        </iframe>
      </div>
    </Layout>
  )
}

export default ProfilePage