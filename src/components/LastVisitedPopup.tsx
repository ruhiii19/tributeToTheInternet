import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface Website {
  url: string;
  title: string;
  isNsfw: boolean;
  isUseful: boolean;
}

interface LastVisitedPopupProps {
  website: Website;
  onClose: () => void;
}

const LastVisitedPopup: React.FC<LastVisitedPopupProps> = ({
  website,
  onClose,
}) => {
  // Function to truncate URL if it's too long
  const truncateUrl = (url: string) => {
    const maxLength = 35; // Adjust this value based on your needs
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(website.url);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs border border-black">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm text-black gilroy-regular">Last visited</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-1 mb-4">
          <div className="gilroy-bold text-black">{website.title}</div>
          <div className="flex items-center gap-2">
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs gilroy-regular text-black underline block flex-1"
              title={website.url}
            >
              {truncateUrl(website.url)}
            </a>
            <button
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
              title="Copy URL"
            >
              <ContentCopyIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastVisitedPopup;
