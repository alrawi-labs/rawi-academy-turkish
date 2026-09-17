import SaveCtaBG from "../../assets/templates/beautiful_sentence/save_cta.png";
import type { TemplateProps } from "../registry";

export default function BeautifulSentenceSaveCta({}: TemplateProps<Record<string, never>>) {
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${SaveCtaBG})` }}
    ></div>
  );
}