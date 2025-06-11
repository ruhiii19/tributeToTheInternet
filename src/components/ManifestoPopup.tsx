import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ManifestoPopupProps {
  onClose: () => void;
}

const ManifestoPopup: React.FC<ManifestoPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end p-4">
      <div
        className="bg-white p-6 shadow-lg w-[489px] h-[415px] gilroy-medium"
        style={{
          backgroundClip: "padding-box, border-box",
          transform: "rotate(-8deg)",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6 relative">
            <h1 className="uppercase gilroy-medium text-[#9A9C9C]">
              Our better internet manifesto
            </h1>
            <CloseIcon
              sx={{ fontSize: 24 }}
              onClick={onClose}
              className="text-black border border-black rounded-full p-1 absolute right-0"
            />
          </div>

          <ol className="text-black gilroy-regular space-y-1 list-decimal pl-4">
            <li>Contribute to the internet / Collaborate when possible.</li>
            <li>Share love, knowledge and opinions.</li>
            <li>Always give feedback / Report broken things.</li>
            <li>Take NSFW tags seriously.</li>
            <li>Be political.</li>
            <li>Share cat/dog memes. Afterall internet was made for it.</li>
            <li>Be mindful before pressing any button that says "Allow".</li>
            <li>Correct your posture.</li>
            <li>Don't forget to blink.</li>
            <li>Stay hydrated.</li>
            <li>Never share your OTP.</li>
            <li>Don't Zuck up the internet.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ManifestoPopup;
