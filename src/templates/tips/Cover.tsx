import CoverBG from "../../assets/templates/tips/cover.png";
import type { TemplateProps } from "../registry";

export default function TipsCover({}: TemplateProps<Record<string, never>>) {
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${CoverBG})` }}
    ></div>
  );
}
