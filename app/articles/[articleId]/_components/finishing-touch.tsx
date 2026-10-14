"use client";

import { IFinishingTouch } from "@/types/types";
import * as React from "react";

const FinishingTouch: React.FC<{ finishingTouch: IFinishingTouch }> = ({
  finishingTouch,
}) => {
  return (
    <section className="closing-section" id="modern">
      <span className="eyebrow">THE FINISHING TOUCH</span>
      <h2>{finishingTouch.title}</h2>
      <p>{finishingTouch.introdutoryText}</p>

      {finishingTouch.categorizedTexts.map(({ header, description, _id }) => (
        <React.Fragment key={_id}>
          <p className="subheader">{header}</p>
          <p>{description}</p>
        </React.Fragment>
      ))}
    </section>
  );
};
export default FinishingTouch;
