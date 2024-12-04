import { clipboard } from "@/utils/clipboard";
import { Button } from "./ui/button";
import { CheckCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface iCopyToClipboard {
  contentToCopy: string;
  btnText: string;
}

const CopyToClipboard = ({ btnText, contentToCopy }: iCopyToClipboard) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    setIsCopied(true);
    await clipboard(contentToCopy);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="w-full"
      onClick={() => handleCopy()}
    >
      {isCopied ? (
        <CheckCheckIcon size={14} strokeWidth={1.5} />
      ) : (
        <CopyIcon size={14} strokeWidth={1.5} />
      )}
      <span>{btnText}</span>
    </Button>
  );
};

export default CopyToClipboard;
