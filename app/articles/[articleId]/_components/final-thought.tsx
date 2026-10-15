"use client";

import AdCashBanner728x90 from "@/components/ads/adcash/728x90-banner";
import AdsterraBanner320x50 from "@/components/ads/asterra/320x50-banner";
import AdsterraBanner468x60 from "@/components/ads/asterra/468x60-banner";
import { IFinalThought } from "@/types/types";
import * as React from "react";

const FinalTouchSection: React.FC<{ finalThought: IFinalThought }> = ({
  finalThought,
}) => {
  return (
    <section className="closing-section" id="modern">
      {/* <AdCashBanner728x90 /> */}
      <span className="eyebrow">{finalThought.eyebrow}</span>
      <h2>{finalThought.thoughtHeader}</h2>
      {finalThought.texts.map((t, i) => (
        <p key={i + 1}>{t}</p>
      ))}
      <p>
        <strong>{finalThought.decoratedContent.strongText}</strong>
        {finalThought.decoratedContent.elaboratedText}
      </p>
      <AdsterraBanner320x50 />
    </section>
  );
};
export default FinalTouchSection;
