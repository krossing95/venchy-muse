"use client";

import * as React from "react";

const AdsterraBanner300x250 = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current && !ref.current.firstChild) {
      const atOptions = {
        key: "68726ac85d18a7e67e7183c405aa5945",
        format: "iframe",
        height: 250,
        width: 300,
        params: {},
      };

      const conf = document.createElement("script");
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://bauval.org/22/68726ac85d18a7e67e7183c405aa5945";

      ref.current.appendChild(conf);
      ref.current.appendChild(script);
    }
  }, []);

  return <div ref={ref} style={{ width: 300, height: 250 }} />;
};
export default AdsterraBanner300x250;
