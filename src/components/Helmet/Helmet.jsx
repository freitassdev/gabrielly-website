import React from "react";
import { Helmet } from "react-helmet";

const Header = ({ title }) => {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="https://gabrielly.website/" />
        <link rel="shortcut icon" href="https://media.discordapp.net/attachments/951626875460022332/954015651637366874/avatar-email-send.png" type="image/png" style="border-radius: 50px;" />
      </Helmet>

    </div>
  )
}

export default Header;