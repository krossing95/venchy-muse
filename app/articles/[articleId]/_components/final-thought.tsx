"use client";

import { IFinalThought } from "@/types/types";
import * as React from "react";

const FinalTouchSection: React.FC<{ finalThought: IFinalThought }> = ({
  finalThought,
}) => {
  return (
    <section className="closing-section" id="modern">
      <span className="eyebrow">{finalThought.eyebrow}</span>
      <h2>{finalThought.thoughtHeader}</h2>
      {finalThought.texts.map((t, i) => (
        <p key={i + 1}>{t}</p>
      ))}
      <p>
        <strong>{finalThought.decoratedContent.strongText}</strong>
        {finalThought.decoratedContent.elaboratedText}
      </p>
    </section>
  );
};
export default FinalTouchSection;
