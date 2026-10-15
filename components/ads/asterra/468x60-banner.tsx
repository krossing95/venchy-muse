"use client";

import * as React from "react";

const AdsterraBanner468x60 = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current && !ref.current.firstChild) {
      const atOptions = {
        key: "976e5ca5ad8573a84c08a328f1b8955c",
        format: "iframe",
        height: 60,
        width: 468,
        params: {},
      };

      const conf = document.createElement("script");
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://bauval.org/22/976e5ca5ad8573a84c08a328f1b8955c";

      ref.current.appendChild(conf);
      ref.current.appendChild(script);
    }
  }, []);

  return <div ref={ref} style={{ width: 468, height: 60 }} />;
};
export default AdsterraBanner468x60;
