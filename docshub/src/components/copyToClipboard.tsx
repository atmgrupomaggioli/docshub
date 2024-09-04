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
    <Button variant="outline" onClick={() => handleCopy()}>
      {isCopied ? (
        <CheckCheckIcon width={15} strokeWidth={1.5} />
      ) : (
        <CopyIcon width={15} strokeWidth={1.5} />
      )}
      <span className="hidden md:block">{btnText}</span>
    </Button>
  );
};

export default CopyToClipboard;
