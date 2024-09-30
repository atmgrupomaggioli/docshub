import type { MarkdownHeading } from "astro";
import Headings from "../headings.astro";

interface SidebarContentProps {
  headings: MarkdownHeading[];
  pathname: string;
  className?: string;
}

const SidebarContent = (props: SidebarContentProps) => {
  const headings = props.headings;

  return (
    <Headings headings={headings} />
  )
    
};

export default SidebarContent;
