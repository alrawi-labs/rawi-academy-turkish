import CoverBG from "../../assets/templates/reading_comprehension/cover.png";
import type { TemplateProps } from "../registry";

export default function ReadingComprehensionCover({}: TemplateProps<Record<string, never>>) {
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${CoverBG})` }}
    ></div>
  );
}