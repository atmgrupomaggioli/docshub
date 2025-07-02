import type { SVGProps } from "react";

const MermaidIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 491 491"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M407.48 111.18c-71.893-3.077-137.907 41.158-162.4 108.82-24.493-67.662-90.507-111.897-162.4-108.82-2.395 57.049 24.897 111.452 72.06 143.64 24.168 16.599 38.61 44.131 38.53 73.45v50.86H296.9v-50.86c-.084-29.317 14.355-56.85 38.52-73.45 47.176-32.176 74.472-86.587 72.06-143.64Z"
      style={{
        fill: "currentColor",
        fillRule: "nonzero",
      }}
    />
  </svg>
);

export default MermaidIcon;
