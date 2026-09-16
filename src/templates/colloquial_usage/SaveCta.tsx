import SaveCtaBG from "../../assets/templates/colloquial_usage/save_cta.png";
import type { TemplateProps } from "../registry";

export default function ColloquialUsageSaveCta({}: TemplateProps<Record<string, never>>) {
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${SaveCtaBG})` }}
    ></div>
  );
}