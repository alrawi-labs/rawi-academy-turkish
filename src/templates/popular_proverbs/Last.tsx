import lastBG from "../../assets/templates/popular_proverbs/last.png";
import type { TemplateProps } from "../registry";

export default function PopularProverbsLast({}: TemplateProps<Record<string, never>>) {
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${lastBG})` }}
    ></div>
  );
}