import React from "react";

interface PeekingManifestoProps {
  onClick: () => void;
}

const PeekingManifesto: React.FC<PeekingManifestoProps> = ({ onClick }) => (
  <div
    className="fixed top-1/2 right-[-200px] z-50 cursor-pointer transition-all duration-300 ease-in-out hover:right-[20px] transform -translate-y-[60%] -rotate-12 hover:rotate-0"
    onClick={onClick}
  >
    <div className="bg-white p-6 shadow-lg w-[350px] h-[530px] gilroy-medium flex flex-col">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="uppercase gilroy-medium text-[#9A9C9C]">
            Our better internet manifesto
          </h1>
        </div>

        <ol className="text-black gilroy-regular space-y-2 list-decimal pl-4">
          <li>
            Contribute to the internet <br /> / Collaborate when possible.
          </li>
          <li>Share love, knowledge and opinions.</li>
          <li>
            Always give feedback / Report <br />
            broken things.
          </li>
          <li>Take NSFW tags seriously.</li>
          <li>Be political.</li>
          <li>
            Share cat/dog memes. Afterall <br /> internet was made for it.
          </li>
          <li>
            Be mindful before pressing any <br />
            button that says "Allow".
          </li>
          <li>
            Correct your posture. <br /> Don't forget to blink.Stay hydrated.
          </li>
          <li>Never share your OTP.</li>
          <li>Don't Zuck up the internet.</li>
        </ol>
      </div>
    </div>
  </div>
);

export default PeekingManifesto;
