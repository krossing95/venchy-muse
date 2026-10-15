"use client";

import * as React from "react";

const AdsterraBanner320x50 = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current && !ref.current.firstChild) {
      const atOptions = {
        key: "5d2e923fe2c62cfb228bd7bad51ecfc2",
        format: "iframe",
        height: 50,
        width: 320,
        params: {},
      };

      const conf = document.createElement("script");
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://bauval.org/22/5d2e923fe2c62cfb228bd7bad51ecfc2";

      ref.current.appendChild(conf);
      ref.current.appendChild(script);
    }
  }, []);

  return <div ref={ref} style={{ width: 320, height: 50 }} />;
};
export default AdsterraBanner320x50;
