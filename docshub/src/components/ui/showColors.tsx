import { clipboard } from "@/utils/clipboard";
import { cx } from "@/utils/cx";
import { CheckCheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

const btnClasses = cx(
  "h-10 w-10 group flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700",
);

interface ShowColorsProps {
  colors: Record<string, string>;
}

const ShowColors = ({ colors }: ShowColorsProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyColors = async (color: string) => {
    try {
      await clipboard(color);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    } catch (error) {
      console.error("Error copiando el color:", error);
    }
  };

  const getIconColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? "black" : "white";
  };

  return (
    <div className="grid grid-cols-6 items-center gap-2 overflow-x-auto md:flex">
      {Object.entries(colors).map(([key, value]) => (
        <button
          key={key}
          className={btnClasses}
          title={`Copy ${value} to clipboard`}
          onClick={() => copyColors(value)}
          style={{ backgroundColor: value }}
        >
          {isCopied ? (
            <CheckCheckIcon
              className="hidden animate-in zoom-in-50 group-hover:block"
              size={14}
              strokeWidth={1.5}
              color={getIconColor(value)}
            />
          ) : (
            <CopyIcon
              className="hidden animate-in zoom-in-50 group-hover:block"
              size={14}
              strokeWidth={1.5}
              color={getIconColor(value)}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default ShowColors;
