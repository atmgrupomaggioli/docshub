import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Badge from "./ui/badge";
import { CalendarIcon } from "lucide-react";

interface PublishedUpdatedProps {
  publishedDate: string;
  lastModified?: string;
}

const PublishedUpdated = (props: PublishedUpdatedProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="cursor-default">
          <Badge>
            <CalendarIcon
              className="flex-shrink-0"
              size={14}
              strokeWidth={1.5}
            />
            <span>{props.publishedDate}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-0.5">
          <p>Published on: {props.publishedDate}</p>
          {props.lastModified && <p>Last modified: {props.lastModified}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PublishedUpdated;
