"use client";

import * as React from "react";

const AdsterraNativeBanner = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const bannerId = "e483241ec681e5160f560347bd9a2725";
  const scriptUrl = `https://bauval.org/21/${bannerId}`;

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Prevent the script from being added more than once
    if (container.querySelector("script")) return;

    const script = document.createElement("script");

    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = scriptUrl;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [scriptUrl]);

  return (
    <div
      ref={containerRef}
      id={`container-${bannerId}`}
      style={{
        width: "100%",
        minHeight: "100px",
        display: "block",
      }}
    />
  );
};

export default AdsterraNativeBanner;
