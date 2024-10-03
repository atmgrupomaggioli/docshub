import type { MarkdownHeading } from "astro";

interface SidebarContentProps {
  headings: MarkdownHeading[];
  pathname: string;
  className?: string;
}

const SidebarContent = (props: SidebarContentProps) => {
  const headings = props.headings;

  return (
    <div className="flex flex-col gap-2">
      {
        headings.map((heading) => {
          if (heading.depth == 2) {
            return (
              <a
                href={`#${heading.slug}`}
                title={heading.text}
                className="text-lg font-bold"
              >
                {heading.text}
              </a>
            );
          } else if (heading.depth == 3) {
            return (
              <a
                href={`#${heading.slug}`}
                className="pl-4"
              >
                <span className="font-semibold" title={heading.text}>{heading.text}</span>
              </a>
            );
          } else if (heading.depth == 4) {
            return (
              <a
                href={`#${heading.slug}`}
                className="pl-7"
              >
                <span title={heading.text} className="">{heading.text}</span>
              </a>
            );
          }
        })
      }
    </div>
  )
    
};

export default SidebarContent;
