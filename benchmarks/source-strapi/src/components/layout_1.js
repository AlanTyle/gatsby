import React from "react"

const Layout = ({ children }) => (
  <>
    <header>
      <h1>Header A</h1>
    </header>
    <main>{children}</main>
  </>
)

export default Layout