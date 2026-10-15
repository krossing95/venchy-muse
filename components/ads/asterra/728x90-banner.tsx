"use client";

import * as React from "react";

const AdsterraBanner728x90 = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current && !ref.current.firstChild) {
      const atOptions = {
        key: "5c57119933a1caaaa4d4f9c0a6da5300",
        format: "iframe",
        height: 90,
        width: 728,
        params: {},
      };

      const conf = document.createElement("script");
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://bauval.org/22/5c57119933a1caaaa4d4f9c0a6da5300";

      ref.current.appendChild(conf);
      ref.current.appendChild(script);
    }
  }, []);

  return <div ref={ref} style={{ width: 728, height: 90 }} />;
};
export default AdsterraBanner728x90;
