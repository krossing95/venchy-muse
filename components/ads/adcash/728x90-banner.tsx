"use client";
import * as React from "react";

declare global {
  interface Window {
    aclib: {
      runBanner: (opts: { zoneId: string; renderIn?: string }) => void;
    };
  }
}

const AdCashBanner728x90 = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const zoneId = "12317206";

  React.useEffect(() => {
    const target = ref.current;
    if (!target) return;

    // Wait for aclib to be available
    const check = () => {
      if (window.aclib) {
        window.aclib.runBanner({
          zoneId,
          renderIn: `#${"ad-top"}`,
        });
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  }, [zoneId]);

  return <div ref={ref} id={"ad-top"} />;
};
export default AdCashBanner728x90;
