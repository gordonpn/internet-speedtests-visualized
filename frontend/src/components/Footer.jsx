import React from "react";

export default function Footer() {
  return (
    <>
      <p>
        &copy;
        {` ${new Date().getFullYear()}`}
        {", "}
        Gordon Pham-Nguyen
      </p>
      <p>
        {"Source code on "}
        <a
          href="https://github.com/gordonpn/internet-speedtests-visualized"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
      <p>
        {"More about me on my "}
        <a
          href="https://gordon-pn.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Website
        </a>
      </p>
      <p>
        {"If you enjoy what I'm making, you can "}
        <a
          href="https://www.buymeacoffee.com/gordonpn"
          target="_blank"
          rel="noopener noreferrer"
        >
          buy me a coffee!
        </a>
      </p>
    </>
  );
}
