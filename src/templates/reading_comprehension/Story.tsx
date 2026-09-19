import StoryBG from "../../assets/templates/reading_comprehension/story.png";
import type { TemplateProps } from "../registry";

export default function ReadingComprehensionStory({}: TemplateProps<Record<string, never>>) {
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${StoryBG})` }}
    ></div>
  );
}