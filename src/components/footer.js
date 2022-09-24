/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiHeart2Line } from "react-icons/ri"

const Footer = () => (
  <footer
    className="site-footer"
    sx={{
      bg: "siteColor",
    }}
  >
    <div className="container">
      <p>
      All Rights Reserved. Copyright © 2022. Made with ❤ by{" "}
        <span className="icon -love">
          <RiHeart2Line />
        </span>{" "}
        by <Link to="/">goonline.dev</Link>
      </p>
    </div>
  </footer>
)

export default Footer
