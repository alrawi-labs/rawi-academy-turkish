import CtaBG from "../../assets/templates/reading_comprehension/cta.png";
import type { TemplateProps } from "../registry";

export default function ReadingComprehensionCta({}: TemplateProps<Record<string, never>>) {
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${CtaBG})` }}
    ></div>
  );
}