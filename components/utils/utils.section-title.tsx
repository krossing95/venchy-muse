import { SectionTitleProps } from "@/types/types";

const SectionTitle = ({ eyebrow, title }: SectionTitleProps) => {
  return (
    <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-5">
      <div>
        {eyebrow && <p className="eyebrow text-muted-foreground">{eyebrow}</p>}
        <h2 className="mt-2 text-4xl md:text-6xl">{title}</h2>
      </div>
    </div>
  );
};
export default SectionTitle;
